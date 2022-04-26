import { Button, Select } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useParams } from 'react-router';
import { useGetSearchRequest } from '../API/detailledSearch';
import { craftTypes } from '../util/craftTypes';
import { materials } from '../util/materials';
import { places } from '../util/places';
import { techniques } from '../util/techniques';

type SearchValues = {
  involvedMaker: string;
  type: string;
  material: string;
  place: string;
  technique: string;
};

export function DetailedSearch() {
  const formMethods = useForm<SearchValues>();
  const { handleSubmit } = formMethods;

  const [searchQuery, setSearchQuery] = useState<SearchValues>();

  const { searchTerm: involvedMaker } = useParams();

  const { data: detailledSearchResults } = useGetSearchRequest(
    { searchQuery },
    involvedMaker,
  );

  console.log(detailledSearchResults);

  const matertialSelect = useMemo(() => materials.map((item) => item.name), []);
  const typeSelect = useMemo(() => craftTypes.map((item) => item.name), []);
  const placeSelect = useMemo(() => places.map((item) => item.name), []);

  const techniqueSelect = useMemo(
    () => techniques.map((item) => item.name),
    [],
  );

  const onValid: SubmitHandler<SearchValues> = useCallback((data) => {
    setSearchQuery(data);
  }, []);

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValid)}>
          <Controller
            name="type"
            render={({ field }) => (
              <Select
                placeholder="Type of Object"
                label="Type"
                searchable
                data={typeSelect}
                {...field}
              />
            )}
          />
          <Controller
            name="material"
            render={({ field }) => (
              <Select
                placeholder="Material of Object"
                label="Material"
                searchable
                data={matertialSelect}
                {...field}
              />
            )}
          />
          <Controller
            name="technique"
            render={({ field }) => (
              <Select
                placeholder="Technique used"
                label="Technique"
                searchable
                data={techniqueSelect}
                {...field}
              />
            )}
          />
          <Controller
            name="place"
            render={({ field }) => (
              <Select
                placeholder="Location of Creation"
                label="Location"
                searchable
                data={placeSelect}
                {...field}
              />
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </FormProvider>
    </>
  );
}
