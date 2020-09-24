import { useState } from 'react';

import { useFetchSWR } from 'hooks/useFetch';

import Banner from 'components/Banner';
import Carousel from 'components/Carousel';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

import { CategoryProps } from 'interfaces';

const Home: React.FC = () => {
  const { data } = useFetchSWR<CategoryProps[]>(
    `${
      process.env.URL_BACKEND || 'http://localhost:8080'
    }/categories?_embed=videos`,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [highlight, setHighlight] = useState<number>(-1);

  if (!data) return <Loading />;

  return (
    <Layout suppressPadding>
      <Banner />

      {data
        .filter(
          (category: CategoryProps) =>
            category.title && category.videos && category.videos.length,
        )
        .map((category: CategoryProps) => (
          <Carousel
            key={category.id}
            category={category}
            highlight={category.id === highlight}
          />
        ))}
    </Layout>
  );
};

export default Home;
