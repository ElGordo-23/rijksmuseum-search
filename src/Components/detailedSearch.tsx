import { Button, Checkbox, NumberInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSearchRequest } from '../API/searchRequest';

type SearchValues = {
  involvedMaker: string;
  type: string;
  material: string;
  technique: string;
  toppieces: boolean;
};

export function DetailedSearch() {
  const { register, handleSubmit } = useForm<SearchValues>();

  const [searchQuery, setSearchQuery] = useState<SearchValues>();

  const { data: searchResult } = useGetSearchRequest({ searchQuery });

  console.log(searchResult);

  return (
    <>
      <h2>Detailled Search</h2>
      <form
        onSubmit={handleSubmit((data) => {
          setSearchQuery(data);
        })}
      >
        <TextInput
          placeholder="Look up works by Artist"
          label="Artist"
          {...register('involvedMaker')}
        />
        <TextInput
          placeholder="Type of Object"
          label="Type"
          {...register('type')}
        />
        <TextInput
          placeholder="Material of Object"
          label="Material"
          {...register('material')}
        />
        <TextInput
          placeholder="Technique used"
          label="Technique"
          {...register('technique')}
        />
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}
