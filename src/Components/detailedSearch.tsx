import { Button, Select, TextInput } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useArtistOptions } from '../API/artistOptions';
import { useDataSuggestions } from '../util/suggestionsHelper';
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
  const { register, handleSubmit, getValues } = formMethods;

  const [_, setSearchParams] = useSearchParams();

  const [detailledArtistSearchInput, setDetailledArtistSearchInput] = useState(
    getValues('involvedMaker'),
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
  const { matertialSelect, typeSelect, techniqueSelect, placeSelect } =
    useDataSuggestions();

  const { data: artistNameSuggenstions } = useArtistOptions(
    detailledArtistSearchInput,
  );

  const artistSuggestions = useMemo(
    () => Array.from(new Set(artistNameSuggenstions)),
    [artistNameSuggenstions],
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValidInternal, onError)}>
          <TextInput label="SearchTerm" {...register('searchTerm')} />

          <Controller
            name="involvedMaker"
            render={({ field }) => (
              <Select
                placeholder="Type of Object"
                label="Artist"
                searchable
                nothingFound="No options"
                data={artistSuggestions}
                {...field}
                onSearchChange={setDetailledArtistSearchInput}
              />
            )}
          />

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
