import { Button, Select, TextInput } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { craftTypes } from '../util/craftTypes';
import { materials } from '../util/materials';
import { places } from '../util/places';
import { techniques } from '../util/techniques';
import { SearchValuesObject } from './renderDetailledSearchResults';

type DetailedSearchProps = {
  formMethods: UseFormReturn<SearchValuesObject>;
  onValid?: (values: SearchValuesObject) => void;
  onError?: () => void;
};

export function DetailedSearch({
  formMethods,
  onValid,
  onError,
}: DetailedSearchProps) {
  const { register, handleSubmit } = formMethods;

  const [_, setSearchParams] = useSearchParams();

  const matertialSelect = useMemo(() => materials.map((item) => item.name), []);
  const typeSelect = useMemo(() => craftTypes.map((item) => item.name), []);
  const placeSelect = useMemo(() => places.map((item) => item.name), []);

  const techniqueSelect = useMemo(
    () => techniques.map((item) => item.name),
    [],
  );

  const onValidInternal: SubmitHandler<SearchValuesObject> = useCallback(
    (search) => {
      const cleanedSearchValues = Object.entries(search).reduce(
        (cleaned, [key, value]) => {
          if (value) {
            return { ...cleaned, [key]: value };
          }
          return cleaned;
        },
        {},
      );
      setSearchParams(cleanedSearchValues);
      if (onValid) {
        onValid(cleanedSearchValues);
      }
    },
    [onValid, setSearchParams],
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValidInternal, onError)}>
          <TextInput label="SearchTerm" {...register('searchTerm')} />
          <TextInput label="Artist" {...register('involvedMaker')} />

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
