import {
  Button,
  Card,
  CardSection,
  Collapse,
  Image,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGeneralSearch } from '../API/generalSearch';
import { DetailedSearch } from '../Components/detailedSearch';

export function Results() {
  const { searchTerm } = useParams();
  const [opened, setOpen] = useState(false);
  const { data: searchResult } = useGeneralSearch(searchTerm);

  const regex = new RegExp(
    "^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)",
  );

  return (
    <div>
      <h2>{searchTerm}</h2>
      {(searchTerm ? regex.test(searchTerm) : null) ? (
        <Button onClick={() => setOpen((o) => !o)}>
          Detailled Search for {searchTerm}
        </Button>
      ) : null}
      <Collapse in={opened}>{<DetailedSearch />}</Collapse>
      <SimpleGrid cols={3}>
        {searchResult?.artObjects.map((item) => (
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
    </div>
  );
}
