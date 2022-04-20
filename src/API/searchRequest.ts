import axios from 'axios';
import { useQuery } from 'react-query';

const API_KEY = process.env.REACT_APP_API_KEY;

type QueryTypes = {
  searchQuery:
    | {
        involvedMaker: string | undefined;
        type: string | undefined;
        material: string | undefined;
        technique: string | undefined;
        toppieces: boolean | undefined;
      }
    | undefined;
};

export const getSearchRequest = async ({ searchQuery }: QueryTypes) => {
  try {
    const response = await axios.get(
      `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}`,
      {
        params: {
          culture: 'en',
          p: 0,
          ps: 20,
          // involvedMaker: searchQuery?.involvedMaker,
          type: searchQuery?.type,
          // material: searchQuery?.material,
          // technique: searchQuery?.technique,
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export function useGetSearchRequest({ searchQuery }: QueryTypes) {
  return useQuery(['searchRequest', searchQuery], () =>
    getSearchRequest({ searchQuery }),
  );
}
