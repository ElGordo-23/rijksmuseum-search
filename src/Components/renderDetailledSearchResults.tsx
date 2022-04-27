import {
  Button,
  Card,
  CardSection,
  Image,
  Loader,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDetailledSearch } from '../API/detailledSearch';

export type SearchValuesObject = Partial<{
  type: string;
  material: string;
  place: string;
  technique: string;
  involvedMaker: string;
  searchTerm: string;
}>;
export type SearchValues = {
  searchQuery: SearchValuesObject;
};

export function DetailledSearchResults({ searchQuery }: SearchValues) {
  const [page, setPage] = useState(1);

  const { data: detailledSearchResults, isLoading } = useGetDetailledSearch({
    searchQuery,
    page,
  });

  return (
    <>
      <SimpleGrid cols={3}>
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button onClick={() => setPage((old) => old + 1)}>Next</Button>
        <br />
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
              {!isLoading ? (
                <Image
                  src={item.webImage?.url}
                  alt="artwork"
                  radius="sm"
                  fit="contain"
                />
              ) : (
                <Loader size="xs" />
              )}
            </CardSection>
            <Text>{item.longTitle}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
