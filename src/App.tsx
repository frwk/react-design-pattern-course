import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import Home from './pages/Home';
import User from './types/User/User';
import { createContext, useEffect, useState } from 'react';
import Header from './components/layout/Header';
import { useFetch } from './hooks/useFetch';

export const UserContext = createContext<User | null>(null);

function App() {

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'dark' ? {
        background: {
          default: '#111827',
        },
      } : {}),
    },
  });

  const theme = createTheme(getDesignTokens('dark'));

  const [user, setUser] = useState<User | null>(null);
  const { data, error }: {data: User | null, error: any} = useFetch({ endpoint: 'users/1' });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error) {
      console.error(error);
    }
    return () => {
      setUser(null);
    }
  }, [data, error]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <UserContext.Provider value={user}>
          <Header user={user}/>
          <Home />
        </UserContext.Provider>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App;