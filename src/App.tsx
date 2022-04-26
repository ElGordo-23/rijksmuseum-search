import './App.css';
import { Container, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Results } from './Pages/Results';
import { SearchPage } from './Pages/SearchPage';
import { SingleArtpiece } from './Pages/SingleArtpiece';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{ fontFamily: 'Helvetica' }}
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
      >
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/results" element={<Results />} />
              <Route
                path="/artPiece/:objectNumber"
                element={<SingleArtpiece />}
              />
            </Routes>
          </Router>
        </Container>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
