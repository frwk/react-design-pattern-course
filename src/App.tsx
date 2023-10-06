import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import Home from './pages/Home';

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
        <Home />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App;
