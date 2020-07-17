import React, { useState } from 'react';

import { Box, Image, ResponsiveContext } from 'grommet';
import { NavBar } from '@centrifuge/axis-nav-bar';
import {
  Menu as MenuIcon,
  User as UserIcon,
  Close as CloseIcon
} from 'grommet-icons';
import Search from '../Search';
import styled from 'styled-components';
import { navigate } from 'gatsby';
const wordmark = String(
  require('../../images/centrifuge-developer-wordmark.svg')
);

const Logo = styled(Image)`
  vertical-align: middle;
  height: 32px;
  margin: 16px 0;
`;

const Nav = ({ enableSearch, menuItems }) => {
  const [selectedRoute, setSelectedRoute] = useState('/');
  const [searchOpen, setSearchOpen] = React.useState(false);

  const onRouteClick = (route) => {
    setSelectedRoute(route);
    if (route.startsWith('/')) {
      navigate(route);
    } else {
      window.open(route);
    }
  };
  const theme = {
    navBar: {
      icons: {
        menu: MenuIcon,
        close: CloseIcon,
        user: UserIcon
      }
    }
  };

  return (
    <ResponsiveContext.Consumer>
      {(size) =>
        size === 'large' ? (
          <Box
            direction='row'
            fill='horizontal'
            align='stretch'
            width='xxlarge'
          >
            <NavBar
              logo={
                <Logo
                  src={wordmark}
                  onClick={() => {
                    onRouteClick('/');
                  }}
                />
              }
              mainMenuAlignment='right'
              border={false}
              menuItems={menuItems}
              theme={theme}
              itemGap='small'
              selectedRoute={selectedRoute}
              onRouteClick={(item: MenuItem) => {
                onRouteClick(item.route);
              }}
              overlayWidth='100vw'
            >
              {enableSearch && (
                <Search
                  open={searchOpen}
                  setOpen={(value) => setSearchOpen(value)}
                />
              )}
            </NavBar>
          </Box>
        ) : (
          <Box direction='row' fill='horizontal' align='stretch'>
            <Box margin={{ left: 'medium' }} fill={true}>
              <Logo
                src={wordmark}
                onClick={() => {
                  onRouteClick('/');
                }}
              />
            </Box>
            <Box
              style={{ minHeight: '48px', padding: '12px' }}
              flex={'grow'}
              alignContent='end'
            >
              {enableSearch && (
                <Search
                  open={searchOpen}
                  setOpen={(value) => setSearchOpen(value)}
                />
              )}
            </Box>
            <NavBar
              mainMenuAlignment='right'
              border={false}
              menuItems={menuItems}
              theme={theme}
              selectedRoute={selectedRoute}
              onRouteClick={(item: MenuItem) => {
                onRouteClick(item.route);
              }}
              overlayWidth='100vw'
            />
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  );
};

Nav.defaultProps = {
  enableSearch: false,
  menuItems: []
};

export default Nav;
