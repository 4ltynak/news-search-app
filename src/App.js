import './App.css';
import Home from './components/Home/Home';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


const theme = createTheme({

    palette: {
      primary: {main: "#3366ff"},
      secondary: {main: "#E67E22"}
    }

})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
    

  );
}

export default App;
