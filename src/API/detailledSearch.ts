import axios from 'axios';
import { useQuery } from 'react-query';
import { GeneralSearchResponse } from './generalSearch';

const API_KEY = process.env.REACT_APP_API_KEY;

type QueryTypes = {
  searchQuery:
    | {
        type: string | undefined;
        material: string | undefined;
        technique: string | undefined;
        place: string | undefined;
        involvedMaker: string | null;
      }
    | undefined;
};

export const getDetailledSearch = async ({ searchQuery }: QueryTypes) => {
  try {
    const response = await axios.get<GeneralSearchResponse>(
      `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}`,
      {
        params: {
          p: 0,
          ps: 20,
          involvedMaker: searchQuery?.involvedMaker,
          type: searchQuery?.type,
          place: searchQuery?.place,
          material: searchQuery?.material,
          technique: searchQuery?.technique,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useGetDetailledSearch({ searchQuery }: QueryTypes) {
  return useQuery(['detailledSearch', searchQuery], () =>
    getDetailledSearch({ searchQuery }),
  );
}
