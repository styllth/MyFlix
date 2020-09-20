/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';

import { NextRouter, withRouter } from 'next/router';

import useFormVideo from 'hooks/useFormVideo';

import FormField from 'components/FormField';
import {
  CustomForm,
  ButtonForm,
  BoxForm,
  List,
  ContainerCenter,
} from 'components/Forms';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import VideoCard from 'components/VideoCard';

import { CategoryProps, VideoProps } from 'interfaces';

import categoriesRepository from 'repositories/categories';
import videosRepository from 'repositories/videos';

const initialValues: VideoProps = {
  id: 0,
  title: '',
  url: '',
};

type RegisterVideoProps = {
  router: NextRouter;
};

type SuggestionProps = {
  category: string[];
};

const RegisterVideo: React.FC<RegisterVideoProps> = ({ router }) => {
  const [loadingcategories, setLoadingCategories] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionProps>({
    category: [],
  });

  const formVideo = useFormVideo(initialValues, suggestions);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectCategory = categories.find(category => {
      return category.title === formVideo.values.category;
    });

    if (selectCategory) {
      videosRepository
        .create({
          id: formVideo.values.id,
          title: formVideo.values.title,
          url: formVideo.values.url,
          categoryId: selectCategory.id,
        })
        .then(() => {
          router.push(`/?newvideo=${selectCategory.id}`);
        });
    }
  };

  useEffect(() => {
    setLoadingCategories(true);
    categoriesRepository
      .getAll()
      .then(categoriesFromServer => {
        setCategories(categoriesFromServer);
        setSuggestions({
          category: categoriesFromServer.map(
            ({ title }: CategoryProps) => title || '',
          ),
        });
        setLoadingCategories(false);
      })
      .catch(() => {
        setLoadingCategories(false);
      });
  }, []);

  return (
    <Layout>
      <h1>Cadastro de Vídeo</h1>
      {loadingcategories && <Loading />}
      <BoxForm>
        <CustomForm onSubmit={handleSubmit}>
          <FormField
            label="Url do Vídeo"
            type="text"
            name="url"
            value={formVideo.values.url}
            error={formVideo.errors.url}
            onBlur={formVideo.handleBlur}
            onChange={formVideo.handleChange}
          />
          <FormField
            label="Título do Vídeo"
            type="text"
            name="title"
            value={formVideo.values.title}
            error={formVideo.errors.title}
            onBlur={formVideo.handleBlur}
            onChange={formVideo.handleChange}
          />
          <FormField
            label="Categoria do Vídeo"
            type="text"
            name="category"
            value={formVideo.values.category}
            error={formVideo.errors.category}
            onBlur={formVideo.handleBlur}
            onChange={formVideo.handleChange}
            suggestions={suggestions.category}
          />
          <div>
            <ButtonForm disabled={!formVideo.submittable}>Cadastrar</ButtonForm>
          </div>
        </CustomForm>

        <List>
          <ContainerCenter>
            {formVideo.values.url && (
              <VideoCard
                preview
                videoTitle={formVideo.values.title || ''}
                videoURL={formVideo.values.url}
              />
            )}
          </ContainerCenter>
        </List>
      </BoxForm>
    </Layout>
  );
};

export default withRouter(RegisterVideo);
