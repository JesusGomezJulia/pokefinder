export function getBrightness(color: string) {
  const [r, g, b] = getComponents(color);
  return (r + g + b) / 256 / 3;
}

function getComponents(color: string) {
  if (color[0] === '#') color = color.substring(1);
  switch (color.length) {
    case 3:
      return [
        parseInt(color[0], 16) * 17,
        parseInt(color[1], 16) * 17,
        parseInt(color[2], 16) * 17,
      ];
    case 4:
      return [
        parseInt(color[0], 16) * 17,
        parseInt(color[1], 16) * 17,
        parseInt(color[2], 16) * 17,
        parseInt(color[3], 16) * 17,
      ];
    case 6:
      return [
        parseInt(color.substring(0, 2), 16),
        parseInt(color.substring(2, 4), 16),
        parseInt(color.substring(4, 6), 16),
      ];
    case 8:
      return [
        parseInt(color.substring(0, 2), 16),
        parseInt(color.substring(2, 4), 16),
        parseInt(color.substring(4, 6), 16),
        parseInt(color.substring(6, 8), 16),
      ];
    default:
      throw new Error(`Invalid color ${color}`);
  }
}
