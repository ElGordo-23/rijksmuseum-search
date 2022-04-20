import axios from 'axios';
import { useQuery } from 'react-query';

const API_KEY = process.env.REACT_APP_API_KEY;

type GeneralSearchResponse = {
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
  };
};

export const getGeneralSearch = async (searchTerm: string) => {
  try {
    const response = await axios.get<GeneralSearchResponse>(
      `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}`,
      {
        params: {
          culture: 'en',
          ps: 30,
          q: searchTerm,
        },
      },
    );

    return response.data.artObjects;
  } catch (error) {
    console.log(error);
  }
};

export function useGeneralStearch(searchTerm: string) {
  return useQuery(['generalSearch', searchTerm], () =>
    getGeneralSearch(searchTerm),
  );
}
