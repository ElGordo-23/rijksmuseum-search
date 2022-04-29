import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextInput } from '@mantine/core';
import { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { object, string } from 'yup';
import { ArtistNameSelectField } from './artistNameField';
import { SearchValuesObject } from './renderDetailledSearchResults';

type SearchValues = Pick<SearchValuesObject, 'involvedMaker' | 'searchTerm'>;

export function GeneralSearch() {
  const schema = object({
    searchTerm: string(),
  });

  const formMethods = useForm<SearchValues>({ resolver: yupResolver(schema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => setSearchParams({}), [setSearchParams]);

  const onValid: SubmitHandler<SearchValues> = useCallback(
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

      navigate({
        pathname: '/results',
        search: createSearchParams(cleanedSearchValues).toString(),
      });
    },
    [setSearchParams, navigate],
  );

  return (
    <>
      <h2>Search the Rijksmuseum Catalog</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValid)} data-testid="generalSearchForm">
          <TextInput
            {...register('searchTerm')}
            placeholder="Search"
            label="Search for an arbitrary Term "
          />
          <Box>{errors.searchTerm?.message}</Box>
          <ArtistNameSelectField />
          <Button type="submit">Search</Button>
        </form>
      </FormProvider>
    </>
  );
}
