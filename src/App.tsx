import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Test } from './Pages/SearchPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Test />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
