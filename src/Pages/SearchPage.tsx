import { Container } from '@mantine/core';
import { DetailedSearch } from '../Components/detailedSearch';
import { GeneralSearch } from '../Components/generalSearch';

export function SearchPage() {
  return (
    <Container size={400} px={0}>
      <GeneralSearch />
      {/* <DetailedSearch /> */}
    </Container>
  );
}
