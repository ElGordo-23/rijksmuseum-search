import { Box } from '@mantine/core';
import { Artpiece } from '../API/getSingleArtpiece';

export function ColorSpread({ artObject }: Artpiece) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          backgroundColor: `${artObject?.normalizedColors[0]?.hex}`,
          width: '16.6%',
          color: `${artObject?.normalizedColors[0]?.hex}`,
        }}
      >
        h
      </Box>
      <Box
        sx={{
          backgroundColor: `${artObject?.normalizedColors[1]?.hex}`,
          width: '16.6%',
          color: `${artObject?.normalizedColors[1]?.hex}`,
        }}
      >
        h
      </Box>
      <Box
        sx={{
          backgroundColor: `${artObject?.normalizedColors[2]?.hex}`,
          width: '16.6%',
          color: `${artObject?.normalizedColors[2]?.hex}`,
        }}
      >
        h
      </Box>
      <Box
        sx={{
          backgroundColor: `${artObject?.normalizedColors[3]?.hex}`,
          width: '16.6%',
          color: `${artObject?.normalizedColors[3]?.hex}`,
        }}
      >
        h
      </Box>
      <Box
        sx={{
          backgroundColor: `${artObject?.normalizedColors[4]?.hex}`,
          width: '16.6%',
          color: `${artObject?.normalizedColors[4]?.hex}`,
        }}
      >
        h
      </Box>
      <Box
        sx={{
          backgroundColor: `${artObject?.normalizedColors[5]?.hex}`,
          width: '16.6%',
          color: `${artObject?.normalizedColors[5]?.hex}`,
        }}
      >
        h
      </Box>
    </Box>
  );
}
