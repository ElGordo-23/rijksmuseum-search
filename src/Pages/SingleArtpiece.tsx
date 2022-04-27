import { Box, ColorSwatch, Group, Image, Text } from '@mantine/core';
import { useParams } from 'react-router';
import { useSingleArtpiece } from '../API/getSingleArtpiece';
import { ColorSpread } from '../Components/ColorSpread';

export function SingleArtpiece() {
  const { objectNumber } = useParams();

  const { data: artPiece } = useSingleArtpiece(objectNumber);

  const swatches = artPiece?.normalizedColors.map((color) => (
    <ColorSwatch color={color.hex} />
  ));

  return (
    <Box sx={{ marginTop: 24, marginBottom: 45 }}>
      <Image src={artPiece?.webImage?.url} alt={`${artPiece?.title}`} />
      <Text
        size="lg"
        weight="semibold"
        sx={{ marginTop: 10, marginBottom: 25 }}
      >
        {artPiece?.scLabelLine}
      </Text>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <div>
          <Text
            size="md"
            weight="semibold"
            sx={{ marginTop: 10, marginBottom: 10 }}
          >
            {artPiece?.title}
          </Text>
          <Text sx={{ marginTop: 10, marginBottom: 10 }}>
            {artPiece?.description}
          </Text>
        </div>
      </Box>{' '}
      <Group position="center" spacing="xs">
        {swatches}
      </Group>
    </Box>
  );
}
