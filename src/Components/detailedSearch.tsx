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
import { useParams } from 'react-router';
import { useGetSearchRequest } from '../API/detailledSearch';
import * as materials from '../util/materials.json';

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

  const { involvedMaker } = useParams();

  const { data: searchResult } = useGetSearchRequest(
    { searchQuery },
    involvedMaker,
  );

  // const material = materials?.map((item) => item.name);

  console.log(materials);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <TextInput
          placeholder="Type of Object"
          label="Type"
          {...register('type')}
        />
        <Select
          placeholder="Material of Object"
          label="Material"
          searchable
          data={[]}
        />{' '}
        <TextInput
          placeholder="Location of Creation"
          label="Place"
          {...register('place')}
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
