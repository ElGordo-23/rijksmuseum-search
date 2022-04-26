import { Card, CardSection, Image, SimpleGrid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useGeneralSearch } from '../API/generalSearch';

type PropTypes = {
  searchTerm: string | null;
  artistName: string | null;
};

export function GeneralSearchResults({ searchTerm, artistName }: PropTypes) {
  const { data: generalSearchResult } = useGeneralSearch(
    searchTerm,
    artistName,
  );

  return (
    <>
      <SimpleGrid cols={3}>
        {generalSearchResult?.artObjects?.map((item) => (
          <Card<typeof Link>
            component={Link}
            to={`/artPiece/${item.objectNumber}`}
            key={item.id}
            withBorder
            sx={{
              backgroundColor: '#faf8e6',
              maxHeight: 500,
              maxWidth: 350,
              padding: 10,
            }}
          >
            <CardSection>
              <Image
                src={item.webImage?.url}
                alt="artwork"
                radius="sm"
                fit="contain"
              />
            </CardSection>
            <Text>{item.longTitle}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
