import {
  Box,
  ColorSwatch,
  Divider,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router';
import { useSingleArtpiece } from '../API/getSingleArtpiece';

export function SingleArtpiece() {
  const { objectNumber } = useParams();

  const { data: artPiece } = useSingleArtpiece(objectNumber);

  const swatches = artPiece?.normalizedColors.map((color) => (
    <ColorSwatch color={color.hex} key={color.hex} />
  ));

  return (
    <Box sx={{ marginTop: 24, marginBottom: 90 }}>
      <Image src={artPiece?.webImage?.url} alt={`${artPiece?.title}`} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}
      >
        <Title order={2} sx={{ marginTop: 10 }}>
          {artPiece?.title}
        </Title>
        <Divider my="sm" variant="dotted" />
        <Title order={3} sx={{ marginTop: 10, marginBottom: 10 }}>
          {artPiece?.scLabelLine}
        </Title>
        <Text sx={{ marginTop: 10, marginBottom: 15 }}>
          {artPiece?.description}
        </Text>
      </Box>
      <Group position="center" spacing="xs" sx={{ marginBottom: 25 }}>
        {swatches}
      </Group>{' '}
      <Divider my="sm" variant="dotted" />
    </Box>
  );
}
