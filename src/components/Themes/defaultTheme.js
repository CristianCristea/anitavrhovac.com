import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#08a045'
    },
    secondary: {
      main: '#E8B40C'
    },
    error: {
      main: '#FF0000'
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {}
});

export default theme;
