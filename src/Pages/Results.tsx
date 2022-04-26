import { Button, Collapse } from '@mantine/core';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DetailedSearch } from '../Components/detailedSearch';
import { DetailledSearchResults } from '../Components/renderDetailledSearchResults';
import { GeneralSearchResults } from '../Components/renderGeneralSearchResults';

export function Results() {
  const [searchParams] = useSearchParams();

  const searchParamsArray = [...searchParams];

  const searchParamsObject = Object.fromEntries(searchParamsArray);

  console.log(searchParamsObject);

  // const toObject = (searchParamsArray: []) => {
  //   return Array.from(searchParamsArray).reduce(
  //     (acc, [key, value]) => Object.assign(acc, { [key]: value }),
  //     {},
  //   );
  // };

  // const searchParamsObject =

  const searchTerm = searchParams.get('searchTerm');

  const involvedMaker = searchParams.get('artistName');

  const [opened, setOpen] = useState(false);

  return (
    <div>
      <h2>Your search:</h2>
      <div>{searchTerm}</div>
      {involvedMaker ? <div>{involvedMaker}</div> : null}
      <br />

      <Button onClick={() => setOpen((o) => !o)}>Detailled Search</Button>
      <Collapse in={opened}>
        <DetailedSearch involvedMaker={involvedMaker} />
      </Collapse>
      <br />

      {[...searchParams].length === 2 ? (
        <GeneralSearchResults
          searchTerm={searchTerm}
          artistName={involvedMaker}
        />
      ) : (
        <DetailledSearchResults searchQuery={searchParamsObject} />
      )}
    </div>
  );
}
