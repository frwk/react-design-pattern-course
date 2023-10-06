import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Home from './pages/Home';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#111827',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Home />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
