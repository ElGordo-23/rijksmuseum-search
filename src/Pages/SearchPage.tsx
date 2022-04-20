import { Container } from '@mantine/core';
import { DetailedSearch } from '../Components/detailedSearch';
import { GeneralSearch } from '../Components/generalSearch';

export function Test() {
  return (
    <Container>
      <GeneralSearch />
      <DetailedSearch />
    </Container>
  );
}
