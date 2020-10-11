import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

import Header from 'components/Header';
import IngredientsPanel from 'components/IngredientsPanel';
import SandwichesPanel from 'components/SandwichesPanel';
import { FoodProvider } from 'food';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[700],
    },
  },
});

const App = () => {
  return (
    <FoodProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '100px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <IngredientsPanel />
            <SandwichesPanel />
          </div>
        </div>
      </ThemeProvider>
    </FoodProvider>
  );
};

export default App;
