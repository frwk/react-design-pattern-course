import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import Home from './pages/Home';
import Header from './components/layout/Header';
import UserProvider from './components/providers/UserProvider';

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <UserProvider>
          <Header/>
          <Home />
        </UserProvider>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App;