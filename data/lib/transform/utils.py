from contracts import GenderRatioContract

COLOR_MAP = {
  1: "Black",
  2: "Blue",
  3: "Brown",
  4: "Gray",
  5: "Green",
  6: "Pink",
  7: "Purple",
  8: "Red",
  9: "White",
  10: "Yellow"
}

HABITAT_MAP = {
  1: "Cave",
  2: "Forest",
  3: "Grassland",
  4: "Mountain",
  5: "Rare",
  6: "Rough Terrain",
  7: "Sea",
  8: "Urban",
  9: "Water's Edge"
}

def map_gender_ratio(numeric_ratio: int | None):
  if numeric_ratio is None or numeric_ratio < 0:
    return GenderRatioContract(
      male = 0,
      female = 0,
      genderless = 1
    )
  
  female_chance = numeric_ratio / 8
  return GenderRatioContract(
    male = 1 - female_chance,
    female = female_chance,
    genderless = 0
  )
