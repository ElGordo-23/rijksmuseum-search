import { Button, Collapse } from '@mantine/core';
import { useState } from 'react';
import { useParams } from 'react-router';
import { DetailedSearch } from '../Components/detailedSearch';
import { GeneralSearchResults } from '../Components/renderGeneralSearchResults';

export function Results() {
  const { searchTerm } = useParams();
  const [opened, setOpen] = useState(false);

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
      <Collapse in={opened}>
        <DetailedSearch />
      </Collapse>
      <GeneralSearchResults searchTerm={searchTerm} />
    </div>
  );
}
