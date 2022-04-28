import {
  Badge,
  Box,
  ColorSwatch,
  Divider,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSingleArtpiece } from '../API/getSingleArtpiece';

export function SingleArtpiece() {
  const { objectNumber } = useParams();

  const { data: artPiece } = useSingleArtpiece(objectNumber);

  const swatches = artPiece?.normalizedColors.map((color) => (
    <ColorSwatch color={color.hex} key={color.hex} />
  ));

  console.log(artPiece);

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
          {artPiece?.label.title}
        </Title>
        <Divider my="sm" variant="dotted" />
        <Title order={4} sx={{ marginTop: 10, marginBottom: 10 }}>
          {artPiece?.label.makerLine || artPiece?.scLabelLine}
          <Badge sx={{ cursor: 'pointer' }}>{artPiece?.principalMaker}</Badge>
        </Title>
        <Text sx={{ marginTop: 10, marginBottom: 15 }}>
          {artPiece?.label.description || artPiece?.description}
        </Text>
      </Box>
      <Group position="center" spacing="xs" sx={{ marginBottom: 25 }}>
        {swatches}
      </Group>{' '}
      <Divider my="sm" variant="dotted" />
    </Box>
  );
}
