import axios from 'axios';
import { useQuery } from 'react-query';

const API_KEY = process.env.REACT_APP_API_KEY;

type Artpiece = {
  artObject: {
    acquisition: { method: string; date: Date; creditLine: string };
    colors: { percentage: number; hex: string }[];
    dating: {
      period: number;
      presentingDate: string;
      yearEarly: number;
      yearLate: number;
    };
    description: string;
    dimensions: { unit: string; type: string; value: string }[];
    documentations: string[];
    exhibitions: string[];
    hasImage: boolean;
    id: string;
    inscriptions: string[];
    historicalPersons: string[];
    label: { title: string; makerLine: string; description: string };
    longTitle: string;
    location: string;
    makers: string[];
    materials: string[];
    objectTypes: string[];
    physicalMedium: string;
    plaqueDescriptionEnglish: string;
    principalMaker: string;
    principalMakers: {
      biography: string;
      dateOfBirth: string;
      dateOfDeath: string;
      labelDesc: string;
      name: string;
      nationality: string;
      occupation: string[];
      placeOfBirth: string;
      placeOfDeath: string;
      productionPlaces: string[];
      roles: string[];
      unFixedName: string;
    };
    productionPlaces: string[];
    scLabelLine: string;
    techniques: string[];
    title: string;
    titles: string[];
    webImage: {
      url: string;
    };
  };
};

export const getSingleArtpiece = async (objectNumber: string | undefined) => {
  try {
    const response = await axios.get<Artpiece>(
      `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useSingleArtpiece(objectNumber: string | undefined) {
  return useQuery(['generalSearch', objectNumber], () =>
    getSingleArtpiece(objectNumber),
  );
}
