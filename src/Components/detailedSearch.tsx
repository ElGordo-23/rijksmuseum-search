import { ThemeContext } from '@emotion/react';
import {
  Button,
  Checkbox,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSearchRequest } from '../API/detailledSearch';
import { useGetSearchSuggestions } from '../API/getSearchSuggestions';

type SearchValues = {
  involvedMaker: string;
  type: string;
  material: string;
  place: string;
  technique: string;
  toppieces: boolean;
};

export function DetailedSearch() {
  const { register, handleSubmit } = useForm<SearchValues>();

  const [searchQuery, setSearchQuery] = useState<SearchValues>();

  const [artistSearch, setArtistSearch] = useState<string | null>(null);

  const { data: searchResult } = useGetSearchRequest({ searchQuery });

  // function uniq() {
  //   const oldArray: {}[] = allArtists.artists;
  //   return Array.from(new Set(oldArray));
  // }

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
        />{' '}
        <TextInput
          placeholder="Location of"
          label="Place"
          {...register('place')}
        />
        <TextInput
          placeholder="Technique used"
          label="Technique"
          {...register('technique')}
        />
        <Select
          label="Artist"
          placeholder="Artist"
          searchable
          nothingFound="No options"
          data={[]}
          onChange={(value) => setArtistSearch(value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}
