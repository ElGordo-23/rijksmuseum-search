import { useMemo } from 'react';
import { craftTypes } from '../util/craftTypes';
import { materials } from '../util/materials';
import { places } from '../util/places';
import { techniques } from '../util/techniques';

export const useDataSuggestions = () => {
  const matertialSelect = useMemo(() => materials.map((item) => item.name), []);
  const typeSelect = useMemo(() => craftTypes.map((item) => item.name), []);
  const placeSelect = useMemo(() => places.map((item) => item.name), []);

  const techniqueSelect = useMemo(
    () => techniques.map((item) => item.name),
    [],
  );
  return { matertialSelect, typeSelect, placeSelect, techniqueSelect };
};
