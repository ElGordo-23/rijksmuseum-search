import { Button, Select, TextInput } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { craftTypes } from '../util/craftTypes';
import { materials } from '../util/materials';
import { places } from '../util/places';
import { techniques } from '../util/techniques';

export type SearchValues = {
  involvedMaker: string | null;
  type: string;
  material: string;
  place: string;
  technique: string;
};

type PropType = {
  involvedMaker: string | null;
};

export function DetailedSearch({ involvedMaker }: PropType) {
  const formMethods = useForm<SearchValues>();
  const { register, handleSubmit } = formMethods;

  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();

  const matertialSelect = useMemo(() => materials.map((item) => item.name), []);
  const typeSelect = useMemo(() => craftTypes.map((item) => item.name), []);
  const placeSelect = useMemo(() => places.map((item) => item.name), []);

  const techniqueSelect = useMemo(
    () => techniques.map((item) => item.name),
    [],
  );

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
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onValid)}>
          {involvedMaker ? (
            <TextInput
              defaultValue={involvedMaker}
              label="Artist"
              {...register('involvedMaker')}
            />
          ) : null}
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
