import { Card, CardSection, Image, SimpleGrid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useGeneralSearch } from '../API/generalSearch';

type PropTypes = {
  searchTerm: string | undefined;
};

export function GeneralSearchResults({ searchTerm }: PropTypes) {
  const { data: generalSearchResult } = useGeneralSearch(searchTerm);

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
