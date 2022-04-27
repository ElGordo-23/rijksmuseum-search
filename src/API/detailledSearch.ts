import axios from 'axios';
import { useQuery } from 'react-query';
import { SearchValuesObject } from '../Components/renderDetailledSearchResults';
import { GeneralSearchResponse } from './generalSearch';

const API_KEY = process.env.REACT_APP_API_KEY;

type QueryTypes = {
  searchQuery: SearchValuesObject | undefined;
  page: number;
};

export const getDetailledSearch = async ({ searchQuery, page }: QueryTypes) => {
  try {
    const response = await axios.get<GeneralSearchResponse>(
      `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}`,
      {
        params: {
          p: 0,
          ps: 20,
          ...searchQuery,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useGetDetailledSearch({ searchQuery, page }: QueryTypes) {
  return useQuery(['detailledSearch', searchQuery, page], () =>
    getDetailledSearch({ searchQuery, page }),
  );
}
