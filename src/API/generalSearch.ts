import axios from 'axios';
import { useQuery } from 'react-query';

const API_KEY = process.env.REACT_APP_API_KEY;

export type GeneralSearchResponse = {
  artObjects: {
    hasImge: boolean;
    headerImage: { url: string; height: number; width: number };
    id: string;
    links: { self: string; web: string };
    longTitle: string;
    objectNumber: string;
    permitDownload: boolean;
    principalOrFirstMaker: string;
    productionPlaces: string[];
    showImage: boolean;
    title: string;
    webImage: { url: string; height: number; width: number };
  }[];
};

export const getGeneralSearch = async (
  searchTerm: string | null,
  artistName: string | null,
  page: number | null,
) => {
  try {
    const response = await axios.get<GeneralSearchResponse>(
      `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}`,
      {
        params: {
          p: page,
          ps: 30,
          q: searchTerm,
          involvedMaker: artistName,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useGeneralSearch(
  searchTerm: string | null,
  artistName: string | null,
  page: number | null,
) {
  return useQuery(
    ['generalSearch', searchTerm, artistName, page],
    () => getGeneralSearch(searchTerm, artistName, page),
    { keepPreviousData: true },
  );
}
