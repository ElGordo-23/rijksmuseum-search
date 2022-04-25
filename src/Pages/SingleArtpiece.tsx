import { useParams } from 'react-router';
import { useSingleArtpiece } from '../API/getSingleArtpiece';

export function SingleArtpiece() {
  const { objectNumber } = useParams();

  console.log(objectNumber);

  const { data } = useSingleArtpiece(objectNumber);

  console.log(data);

  return <div>Artpiece</div>;
}
