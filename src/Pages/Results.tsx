import { Avatar, Badge, Button, Collapse } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { DetailedSearch } from '../Components/detailedSearch';
import {
  DetailledSearchResults,
  SearchValuesObject,
} from '../Components/renderDetailledSearchResults';
import { GeneralSearchResults } from '../Components/renderGeneralSearchResults';

export function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<SearchValuesObject>();

  const searchParamsObject = Object.fromEntries(
    searchParams.entries(),
  ) as SearchValuesObject;

  const formMethods = useForm<SearchValuesObject>({
    defaultValues: searchParamsObject,
  });

  useEffect(() => {}, [searchParamsObject]);

  const searchTerm = searchParams.get('searchTerm');

  const involvedMaker = searchParams.get('involvedMaker');

  const [opened, setOpen] = useState(false);

  const showGeneralResults = !searchQuery && (searchTerm || involvedMaker);

  const avatar = <Avatar alt="Avatar for badge" size={24} mr={5} src={null} />;

  return (
    <div>
      <h2>Your search:</h2>
      {searchTerm ? (
        <Badge sx={{ marginBottom: 10 }}>{searchTerm}</Badge>
      ) : null}
      <br />
      {involvedMaker ? (
        <Badge size="lg" leftSection={avatar}>
          {involvedMaker}
        </Badge>
      ) : null}
      <br />
      <br />
      <Button onClick={() => navigate('/')}>Home</Button>
      <br />
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
