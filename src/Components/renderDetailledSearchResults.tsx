import { Card, CardSection, Image, SimpleGrid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useGetDetailledSearch } from '../API/detailledSearch';

type SearchValues = {
  searchQuery: {
    type: string;
    material: string;
    place: string;
    technique: string;
    involvedMaker: string | null;
  };
};

export function DetailledSearchResults({ searchQuery }: SearchValues) {
  const { data: detailledSearchResults } = useGetDetailledSearch({
    searchQuery,
  });

  return (
    <>
      <SimpleGrid cols={3}>
        {detailledSearchResults?.artObjects?.map((item) => (
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
