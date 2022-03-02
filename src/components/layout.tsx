import React from "react";
import { Box, Grommet, Header, Heading, Text } from "grommet";

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
    colors: {
      brand: '#002f8e'
    }
  },
};

function Layout({ children } : any) {
  return (
    <Grommet theme={theme}>
      <main >
        <Header background="brand">
          <Heading alignSelf="start" level="2" margin="small">Javascript Regular Expression Exerciser</Heading>
        </Header>
        <Box
          tag="div"
          direction="column"
          align="center"
          justify="between"
          background="light-2" 
          pad={{ vertical: 'small', horizontal: 'medium' }}
          elevation="medium"
        >
          {children}
        </Box>
        <Box
          tag="footer"
          direction="row"
          align="center"
          alignSelf="center"
          pad={{ vertical: 'large', horizontal: 'medium' }}
          elevation="medium"
        >
          <Text>Powered by <a href="https://reactjs.org/" title="React">React</a>, <a href="https://www.gatsbyjs.com/" title="Gatsby">Gatsby</a> and <a href="https://grommet.io" title="Grommet">Grommet</a></Text>
        </Box>
      </main>
    </Grommet>
  )
}

export default Layout;