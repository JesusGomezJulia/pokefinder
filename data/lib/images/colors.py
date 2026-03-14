from PIL import ImageColor
import numpy as np

from lib.schema import NamedColor

def parse(color: str):
  (r, g, b, *_) = ImageColor.getrgb(color)
  return (r, g, b)
 
BLACK = parse("#000000")
BLUE = parse("#4444ff")
CYAN = parse("#44ffff")
BROWN = parse("#884400")
GRAY = parse("#888888")
LIME = parse("#bbff00")
GREEN = parse("#00dd00")
PINK = parse("#ffaaaa")
PURPLE = parse("#aa00ff")
RED = parse("#ff0000")
WHITE = parse("#ffffff")
YELLOW = parse("#fff000")

COLORS = [
  NamedColor(name="Black", rgb=BLACK),
  NamedColor(name="Blue", rgb=BLUE),
  NamedColor(name="Cyan", rgb=CYAN),
  NamedColor(name="Brown", rgb=BROWN),
  NamedColor(name="Gray", rgb=GRAY),
  NamedColor(name="Lime", rgb=LIME),
  NamedColor(name="Green", rgb=GREEN),
  NamedColor(name="Pink", rgb=PINK),
  NamedColor(name="Purple", rgb=PURPLE),
  NamedColor(name="Red", rgb=RED),
  NamedColor(name="White", rgb=WHITE),
  NamedColor(name="Yellow", rgb=YELLOW),
]
COLOR_MAP = { c.name: c for c in COLORS }

# CIELAB Perceptive Color Space
def rgb_to_lab(rgb: np.ndarray):
  rgb = rgb / 255.0

  mask = rgb > 0.04045
  rgb = np.where(mask, ((rgb + 0.055) / 1.055) ** 2.4, rgb / 12.92)

  r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]

  X = r * 0.4124 + g * 0.3576 + b * 0.1805
  Y = r * 0.2126 + g * 0.7152 + b * 0.0722
  Z = r * 0.0193 + g * 0.1192 + b * 0.9505

  X /= 0.95047
  Z /= 1.08883

  def f(t):
    return np.where(t > 0.008856, t ** (1/3), 7.787 * t + 16/116)

  fx = f(X)
  fy = f(Y)
  fz = f(Z)

  L = 116 * fy - 16
  a = 500 * (fx - fy)
  b = 200 * (fy - fz)

  return np.stack([L, a, b], axis=-1)

def rgb_to_hsv(rgb: np.ndarray):
  rgb = rgb / 255.0
  r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]

  cmax = np.max(rgb, axis=-1)
  cmin = np.min(rgb, axis=-1)
  delta = cmax - cmin

  h = np.zeros_like(cmax)

  mask = delta != 0

  rmask = (cmax == r) & mask
  gmask = (cmax == g) & mask
  bmask = (cmax == b) & mask

  h[rmask] = ((g - b)[rmask] / delta[rmask]) % 6
  h[gmask] = (b - r)[gmask] / delta[gmask] + 2
  h[bmask] = (r - g)[bmask] / delta[bmask] + 4

  h /= 6

  s = np.zeros_like(cmax)
  s[cmax != 0] = delta[cmax != 0] / cmax[cmax != 0]

  v = cmax

  return np.stack([h, s, v], axis=-1)