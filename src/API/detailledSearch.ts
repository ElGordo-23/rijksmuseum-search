import axios from 'axios';
import { useQuery } from 'react-query';

const API_KEY = process.env.REACT_APP_API_KEY;

type QueryTypes = {
  searchQuery:
    | {
        type: string | undefined;
        material: string | undefined;
        technique: string | undefined;
        place: string | undefined;
      }
    | undefined;
};

export const getSearchRequest = async (
  { searchQuery }: QueryTypes,
  involvedMaker: string | undefined,
) => {
  try {
    const response = await axios.get(
      `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}`,
      {
        params: {
          p: 0,
          ps: 20,
          involvedMaker: involvedMaker,
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

export function useGetSearchRequest(
  { searchQuery }: QueryTypes,
  involvedMaker: string | undefined,
) {
  return useQuery(['detailledSearch', searchQuery, involvedMaker], () =>
    getSearchRequest({ searchQuery }, involvedMaker),
  );
}
