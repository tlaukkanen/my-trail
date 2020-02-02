import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#F7F9FF'
      },
      secondary: {
        main: '#B3B3B3',
        dark: '#525252'
      },
      canvas: {
        main: '#9CFFD9',
        dark: '#508C75'
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </ThemeProvider>,
    rootElement);
  

// Color theme
// #F7F9FF,#B3B3B3,#525252,#9CFFD9,#508C75

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
