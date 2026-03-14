
from typing import Callable

import numpy as np

from lib.images.colors import rgb_to_hsv, rgb_to_lab


def manhattan_rgb_distance(rgb: np.ndarray, bucket_rgb: np.ndarray):
  diff = np.abs(rgb[..., None, :] - bucket_rgb[None, None, :, :])
  return diff.sum(axis=-1) / (256 * 3)

def perceptual_distance(rgb: np.ndarray, bucket_rgb: np.ndarray):
  lab_img = rgb_to_lab(rgb)
  lab_bucket = rgb_to_lab(bucket_rgb)

  diff = lab_img[..., None, :] - lab_bucket[None, None, :, :]
  return np.linalg.norm(diff, axis=-1)

def adaptive_distance(rgb, bucket_rgb):
  lab_img = rgb_to_lab(rgb)
  lab_bucket = rgb_to_lab(bucket_rgb)

  L1,a1,b1 = np.moveaxis(lab_img, -1, 0)
  L2,a2,b2 = np.moveaxis(lab_bucket, -1, 0)

  C1 = np.sqrt(a1*a1 + b1*b1)
  C2 = np.sqrt(a2*a2 + b2*b2)

  h1 = np.arctan2(b1, a1)
  h2 = np.arctan2(b2, a2)

  dL = np.abs(L1[...,None] - L2)
  dC = np.abs(C1[...,None] - C2)

  dh = np.abs(h1[...,None] - h2)
  dh = np.minimum(dh, 2*np.pi - dh)

  sat = np.clip(C2 / 100, 0, 1)

  wH = 3.0 * sat
  wC = 1.2 + 0.8 * (1-sat)
  wL = 0.3 + 2.5 * (1-sat)

  distance = wL*dL + wC*dC + wH*dh
  return distance

def hue_weighted_distance(rgb: np.ndarray, bucket_rgb: np.ndarray):
  hsv_img = rgb_to_hsv(rgb)
  hsv_bucket = rgb_to_hsv(bucket_rgb)

  h_img, s_img, v_img = np.moveaxis(hsv_img, -1, 0)
  h_b, s_b, v_b = np.moveaxis(hsv_bucket, -1, 0)

  # Expand dimensions
  h_img = h_img[..., None]
  s_img = s_img[..., None]
  v_img = v_img[..., None]

  h_b = h_b[None, None, :]
  s_b = s_b[None, None, :]
  v_b = v_b[None, None, :]

  # circular hue distance
  dh = np.abs(h_img - h_b)
  dh = np.minimum(dh, 1 - dh)

  ds = np.abs(s_img - s_b)
  dv = np.abs(v_img - v_b)

  # Reduce hue importance if saturation is low
  hue_weight = s_img * s_b

  distance = (
    3.0 * dh * hue_weight +   # strong hue weight
    2.0 * ds +                # moderate saturation weight
    1.5 * dv                  # weak value weight
  )

  return distance

def ciede2000_distance(rgb: np.ndarray, bucket_rgb: np.ndarray):
  lab1 = rgb_to_lab(rgb)
  lab2 = rgb_to_lab(bucket_rgb)

  L1, a1, b1 = np.moveaxis(lab1, -1, 0)
  L2, a2, b2 = np.moveaxis(lab2, -1, 0)

  L1 = L1[..., None]
  a1 = a1[..., None]
  b1 = b1[..., None]

  L2 = L2[None, None, :]
  a2 = a2[None, None, :]
  b2 = b2[None, None, :]

  C1 = np.sqrt(a1*a1 + b1*b1)
  C2 = np.sqrt(a2*a2 + b2*b2)

  C_bar = (C1 + C2) / 2

  G = 0.5 * (1 - np.sqrt((C_bar**7) / (C_bar**7 + 25**7)))

  a1p = (1 + G) * a1
  a2p = (1 + G) * a2

  C1p = np.sqrt(a1p*a1p + b1*b1)
  C2p = np.sqrt(a2p*a2p + b2*b2)

  h1p = np.degrees(np.arctan2(b1, a1p)) % 360
  h2p = np.degrees(np.arctan2(b2, a2p)) % 360

  dLp = L2 - L1
  dCp = C2p - C1p

  dhp = h2p - h1p
  dhp = np.where(dhp > 180, dhp - 360, dhp)
  dhp = np.where(dhp < -180, dhp + 360, dhp)

  dHp = 2 * np.sqrt(C1p*C2p) * np.sin(np.radians(dhp)/2)

  L_bar = (L1 + L2) / 2
  Cp_bar = (C1p + C2p) / 2

  h_sum = h1p + h2p
  h_diff = np.abs(h1p - h2p)

  hp_bar = np.where(
    (C1p*C2p) == 0,
    h_sum,
    np.where(
      h_diff <= 180,
      h_sum / 2,
      np.where(h_sum < 360, (h_sum + 360)/2, (h_sum - 360)/2)
    )
  )

  T = (
    1
    - 0.17*np.cos(np.radians(hp_bar - 30))
    + 0.24*np.cos(np.radians(2*hp_bar))
    + 0.32*np.cos(np.radians(3*hp_bar + 6))
    - 0.20*np.cos(np.radians(4*hp_bar - 63))
  )

  d_ro = 30 * np.exp(-((hp_bar - 275)/25)**2)
  RC = np.sqrt((Cp_bar**7) / (Cp_bar**7 + 25**7))

  SL = 1 + ((0.015*(L_bar - 50)**2) / np.sqrt(20 + (L_bar - 50)**2))
  SC = 1 + 0.045*Cp_bar
  SH = 1 + 0.015*Cp_bar*T

  RT = -2 * RC * np.sin(np.radians(2*d_ro))

  dE = np.sqrt(
    (dLp/SL)**2 +
    (dCp/SC)**2 +
    (dHp/SH)**2 +
    RT*(dCp/SC)*(dHp/SH)
  )

  return dE

DistanceFunc = Callable[[np.ndarray, np.ndarray], np.ndarray]