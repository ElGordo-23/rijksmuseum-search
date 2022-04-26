import { Select } from '@mantine/core';
import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useArtistOptions } from '../API/artistOptions';

export const ArtistNameSelectField = () => {
  const [searchArtist, setSearchArtist] = useState('');
  const { data: artistNames } = useArtistOptions(searchArtist);

  const artistSuggestions = useMemo(
    () => Array.from(new Set(artistNames)),
    [artistNames],
  );

  return (
    <Controller
      name="artistName"
      render={({ field }) => (
        <Select
          label="Artist"
          placeholder="Artist"
          description="Search for Works by an Artist"
          searchable
          nothingFound="No options"
          data={artistSuggestions}
          {...field}
          onSearchChange={setSearchArtist}
        />
      )}
    />
  );
};
