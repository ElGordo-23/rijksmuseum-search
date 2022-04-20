import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGeneralStearch } from '../API/generalSearch';

type SearchValues = {
  searchTerm: string;
};

export function GeneralSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { register, handleSubmit } = useForm<SearchValues>();

  const { data: searchResult } = useGeneralStearch(searchTerm);

  // console.log(searchResult);

  return (
    <>
      <h2>General Search</h2>
      <form
        onSubmit={handleSubmit((data) => {
          setSearchTerm(data.searchTerm);
        })}
      >
        <TextInput
          {...register('searchTerm')}
          placeholder="Search"
          label="Search for an arbitrary Term "
        />
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}
