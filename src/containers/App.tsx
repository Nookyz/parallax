import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { normalize } from 'styled-normalize';

import store from '@/store';

import Navigation from '@components/Navigation';
import Box, { Content, Color } from '@/components/Section';

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
  }

  body {
    background: #ffeeee;
  }
`;

const App: FC = () => {
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle />
        <div className="div1">
          <Navigation />
        </div>
        <Box bg="white" content={Content.Right} image="../assets/rocket.png" />
        <Box bg="white" content={Content.Right} image="../assets/camera.png" />
        <Box bg="#F6F9FC" content={Content.Right} image="../assets/cloud.png" />
        <Box bg="#001729" content={Content.Right} image="../assets/cube.png" color={Color.White} />
        <div className="div1" />
      </Provider>
    </BrowserRouter>
  );
};
export default App;
