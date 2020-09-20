/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { NextRouter, withRouter } from 'next/router';

import Button from 'components/Button';
import Search from 'components/Search';

import LogoImg from '../../../static/logo.png';
import { Nav, Logo, Commands, Astro } from './styles';

type MenuProps = {
  router: NextRouter;
  result: boolean;
};

const Menu: React.FC<MenuProps> = ({ router, result }) => {
  const [theme, setTheme] = useState<string>('');
  const [viewForehead, setViewForehead] = useState<boolean>(true);

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    setTheme(window.__theme);
    window.__onThemeChange = () => setTheme(window.__theme);
  }, []);

  useEffect(() => {
    if (router.route === '/') {
      const handleScroll = () => {
        const element = document.getElementById('logo_forehead');
        if (element) {
          const bounding = element.getBoundingClientRect();
          const isViewpoort =
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <=
              (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <=
              (window.innerHeight || document.documentElement.clientHeight);

          setViewForehead(isViewpoort);
        }
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
    setViewForehead(false);
  }, [router.route]);

  const handleTheme = () =>
    window.__setPreferredTheme(isDarkMode ? 'light' : 'dark');

  return (
    <Nav>
      <Link href="/">
        <Logo
          className="Logo"
          src={LogoImg}
          viewForehead={result ? false : viewForehead}
        />
      </Link>
      <Commands>
        <Search />
        {router.route !== '/cadastro/video' && (
          <Link href="/cadastro/video">
            <Button as="a">Novo Vídeo</Button>
          </Link>
        )}
        {router.route === '/cadastro/video' && (
          <Link href="/cadastro/categoria">
            <Button as="a">Nova Categoria</Button>
          </Link>
        )}
        <Astro onClick={handleTheme} />
      </Commands>
    </Nav>
  );
};

export default withRouter(Menu);
