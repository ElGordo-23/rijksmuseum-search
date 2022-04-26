import { Button, TextInput } from '@mantine/core';
import { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { ArtistNameSelectField } from './artistNameField';

type SearchValues = {
  searchTerm: string | undefined;
  artistName: string | undefined;
};

export function GeneralSearch() {
  const formMethods = useForm<SearchValues>();

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
      <h2>General Search</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValid)}>
          <TextInput
            {...register('searchTerm', {
              required: 'Please enter a Search Term',
            })}
            {...(errors.searchTerm && <p>{errors.searchTerm.message}</p>)}
            placeholder="Search"
            label="Search for an arbitrary Term "
          />
          <ArtistNameSelectField />
          <Button type="submit">Search</Button>
        </form>
      </FormProvider>
    </>
  );
}
