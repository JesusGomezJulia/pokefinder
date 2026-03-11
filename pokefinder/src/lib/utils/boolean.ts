export function cycleTristate(current: boolean | null) {
  switch (current) {
    case null:
      return true;
    case true:
      return false;
    case false:
      return null;
  }
}
