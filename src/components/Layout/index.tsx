import useQueryVideos from 'hooks/useQueryVideos';

import Footer from 'components/Footer';
import Menu from 'components/Menu';

import ResultSearch from './components/ResultSearch';
import { LayoutWrapper, Main } from './styles';

type LayoutProps = {
  suppressPadding?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, suppressPadding }) => {
  const [loading, result, videos] = useQueryVideos();

  return (
    <LayoutWrapper>
      <Menu result={result} />
      <Main suppressPadding={suppressPadding}>{children}</Main>
      <ResultSearch result={result} loading={loading} videos={videos} />
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
