import { Button, Collapse } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { DetailedSearch } from '../Components/detailedSearch';
import {
  DetailledSearchResults,
  SearchValuesObject,
} from '../Components/renderDetailledSearchResults';
import { GeneralSearchResults } from '../Components/renderGeneralSearchResults';

export function Results() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchValuesObject>();

  const searchParamsObject = Object.fromEntries(
    searchParams.entries(),
  ) as SearchValuesObject;

  const formMethods = useForm<SearchValuesObject>({
    defaultValues: searchParamsObject,
  });

  useEffect(() => {
    console.log(searchParamsObject);
  }, [searchParamsObject]);

  const searchTerm = searchParams.get('searchTerm');

  const involvedMaker = searchParams.get('involvedMaker');

  const [opened, setOpen] = useState(false);
  const showGeneralResults = !searchQuery && (searchTerm || involvedMaker);

  return (
    <div>
      <h2>Your search:</h2>
      <div>{searchTerm}</div>
      {involvedMaker ? <div>{involvedMaker}</div> : null}
      <br />

      <Button onClick={() => setOpen((o) => !o)}>Detailled Search</Button>
      <Collapse in={opened}>
        <DetailedSearch formMethods={formMethods} onValid={setSearchQuery} />
      </Collapse>
      <br />

      {showGeneralResults ? (
        <GeneralSearchResults
          searchTerm={searchTerm}
          involvedMaker={involvedMaker}
        />
      ) : null}

      {!showGeneralResults && searchQuery ? (
        <DetailledSearchResults searchQuery={searchQuery} />
      ) : null}
    </div>
  );
}
