import { Button, TextInput } from '@mantine/core';
import { useCallback } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ArtistNameSelectField } from './artistNameField';

type SearchValues = {
  searchTerm: string;
  artistName: string;
};

export function GeneralSearch() {
  const formMethods = useForm<SearchValues>();

  const { register, handleSubmit } = formMethods;

  const navigate = useNavigate();

  const onValid: SubmitHandler<SearchValues> = useCallback(
    ({ searchTerm, artistName }) => {
      if (searchTerm) {
        navigate(`/results/${searchTerm}`);
      } else if (artistName) {
        navigate(`/results/${artistName}`);
      }
    },
    [navigate],
  );

  return (
    <>
      <h2>General Search</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValid)}>
          <TextInput
            {...register('searchTerm')}
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
