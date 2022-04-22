import axios from 'axios';
import { useQuery } from 'react-query';

export const getSearchSuggestions = async () => {
  try {
    const response = await axios.get(
      `https://www.rijksmuseum.nl/en/search/advanced/terms?field=involvedMaker&q=verm`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useGetSearchSuggestions() {
  return useQuery(['artistSuggestions'], () => getSearchSuggestions());
}
