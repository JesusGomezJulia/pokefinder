import { Grid } from '@mui/material';

import { cycleTristate } from '@/lib/utils/boolean';

import { MegaIcon } from '../constants';
import { TriStateButton } from '../generic/TriStateButton';

import { useFilters } from './useFilters';

export function FlagFilters() {
  const {
    isMega,
    setIsMega,
    isGmax,
    setIsGmax,
    isTera,
    setIsTera,
    isTotem,
    setIsTotem,
    isMythical,
    setIsMythical,
    isLegendary,
    setIsLegendary,
    isUltrabeast,
    setIsUltrabeast,
    isParadox,
    setIsParadox,
    isBaby,
    setIsBaby,
  } = useFilters();

  return (
    <Grid container spacing={1} alignSelf="flex-start" width={500}>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isLegendary}
          onClick={() => setIsLegendary(cycleTristate)}
          label="Legendary"
          Icon={MegaIcon}
          color="#fbc02d"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isMythical}
          onClick={() => setIsMythical(cycleTristate)}
          label="Mythical"
          Icon={MegaIcon}
          color="#9c27b0"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isUltrabeast}
          onClick={() => setIsUltrabeast(cycleTristate)}
          label="Ultrabeast"
          Icon={MegaIcon}
          color="#ffffff"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isMega}
          onClick={() => setIsMega(cycleTristate)}
          label="Megaevolved"
          Icon={MegaIcon}
          color="#5eb53f"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isGmax}
          onClick={() => setIsGmax(cycleTristate)}
          label="Gigantamax"
          Icon={MegaIcon}
          color="#e91e63"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isTera}
          onClick={() => setIsTera(cycleTristate)}
          label="Terastallized"
          Icon={MegaIcon}
          color="#00bcd4"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isParadox}
          onClick={() => setIsParadox(cycleTristate)}
          label="Paradox"
          Icon={MegaIcon}
          color="#ff5722"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isBaby}
          onClick={() => setIsBaby(cycleTristate)}
          label="Baby"
          Icon={MegaIcon}
          color="#eb7bb3"
        />
      </Grid>
      <Grid size={4}>
        <TriStateButton
          fullWidth
          state={isTotem}
          onClick={() => setIsTotem(cycleTristate)}
          label="Totem"
          Icon={MegaIcon}
          color="#f04848"
        />
      </Grid>
    </Grid>
  );
}
