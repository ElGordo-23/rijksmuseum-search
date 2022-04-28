import {
  Button,
  Card,
  CardSection,
  Image,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGeneralSearch } from '../API/generalSearch';

type PropTypes = {
  searchTerm: string | null;
  involvedMaker: string | null;
};

export function GeneralSearchResults({ searchTerm, involvedMaker }: PropTypes) {
  const [page, setPage] = useState(1);

  const { data: generalSearchResult } = useGeneralSearch(
    searchTerm,
    involvedMaker,
    page,
  );

  return (
    <>
      {generalSearchResult?.artObjects.length === 0 ? (
        <div>No entries found</div>
      ) : (
        <SimpleGrid
          breakpoints={[
            { minWidth: 'sm', cols: 1 },
            { minWidth: 'md', cols: 2 },
            { minWidth: 1200, cols: 3 },
          ]}
        >
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button onClick={() => setPage((old) => old + 1)}>Next</Button>
          <br />
          {generalSearchResult?.artObjects?.map((item) => (
            <Card<typeof Link>
              component={Link}
              to={`/artPiece/${item.objectNumber}`}
              key={item.id}
              withBorder
              sx={{
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
      )}
    </>
  );
}
