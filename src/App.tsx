import './App.css';
import { Container, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Results } from './Pages/Results';
import { SearchPage } from './Pages/SearchPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        defaultProps={{
          Container: {
            sizes: {
              xs: 540,
              sm: 720,
              md: 960,
              lg: 1140,
              xl: 1320,
            },
          },
        }}
        theme={{
          spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        }}
      >
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/results/:searchTerm" element={<Results />} />
            </Routes>
          </Router>
        </Container>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
