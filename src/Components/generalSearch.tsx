import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ArtistNameSelectField } from './artistNameField';

type SearchValues = {
  searchTerm: string;
  artistName: string;
};

export function GeneralSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const formMethods = useForm<SearchValues>();
  const { register, handleSubmit } = formMethods;

  const navigate = useNavigate();

  return (
    <>
      <h2>General Search</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit((data) => setSearchTerm(data.searchTerm))}>
          <TextInput
            {...register('searchTerm')}
            placeholder="Search"
            label="Search for an arbitrary Term "
          />
          <ArtistNameSelectField />
          <Button
            type="submit"
            onClick={() => {
              navigate(`/results/${searchTerm}`);
            }}
          >
            Search
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
