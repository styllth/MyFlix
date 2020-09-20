/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';

import useFormCategoria from 'hooks/useFormCategoria';
import IconTrash from 'icons/IconTrash';

import FormField from 'components/FormField';
import {
  CustomForm,
  ButtonForm,
  BoxForm,
  List,
  ListItem,
  ListLine,
  ListActions,
  Color,
  ButtonRemove,
} from 'components/Forms';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

import { CategoryProps } from 'interfaces';

import categoriesRepository from 'repositories/categories';

const initialValues: CategoryProps = {
  id: 0,
  title: '',
  color: '#000000',
  link_extra: {
    text: '',
    url: '',
  },
};

const RegisterCategoria: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [categories, setcategories] = useState<Array<CategoryProps>>([]);

  const formCategoria = useFormCategoria(initialValues);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(false);

    categoriesRepository
      .create({
        ...formCategoria.values,
      })
      .then(categoria => {
        setSaving(false);
        setcategories([...categories, categoria]);
        formCategoria.clearForm();
      })
      .catch(() => {
        setSaving(false);
      });
  };

  const removeCategory = (categoriaId: number) => {
    categoriesRepository
      .remove(categoriaId)
      .then(() => {
        setcategories(
          categories
            .filter(categoria => categoria.id !== categoriaId)
            .map(c => c),
        );
        formCategoria.clearForm();
        setSaving(false);
      })
      .catch(() => {
        setSaving(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    categoriesRepository
      .getAll()
      .then(categoriesFromServer => {
        setcategories(categoriesFromServer);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h1>Cadastro de Categoria</h1>
      <BoxForm>
        {saving && <Loading />}
        <CustomForm onSubmit={handleSubmit}>
          <FormField
            label="Título da Categoria"
            type="text"
            name="title"
            value={formCategoria.values.title}
            error={formCategoria.errors.title}
            onBlur={formCategoria.handleBlur}
            onChange={formCategoria.handleChange}
          />
          <FormField
            label="Link Extra (Título)"
            type="text"
            name="link_extra.text"
            value={formCategoria.values.link_extra.text}
            error={formCategoria.errors['link_extra.text']}
            onBlur={formCategoria.handleBlur}
            onChange={formCategoria.handleChange}
          />
          <FormField
            label="Link Extra (Url)"
            type="text"
            name="link_extra.url"
            value={formCategoria.values.link_extra.url}
            error={formCategoria.errors['link_extra.url']}
            onBlur={formCategoria.handleBlur}
            onChange={formCategoria.handleChange}
          />
          <FormField
            label="Selecione uma cor"
            type="color"
            name="color"
            value={formCategoria.values.color}
            onBlur={formCategoria.handleBlur}
            onChange={formCategoria.handleChange}
          />
          <div>
            <ButtonForm disabled={!formCategoria.submittable}>
              Cadastrar
            </ButtonForm>
          </div>
        </CustomForm>

        {loading && <Loading />}
        <List>
          {categories.map(category => (
            <>
              <ListItem key={category.id}>
                <ListLine>
                  <Color color={category.color} />
                  <span>{category.title}</span>{' '}
                  {category.link_extra ? category.link_extra.text : ''}
                </ListLine>
                <ListActions>
                  <ButtonRemove
                    onClick={() => removeCategory(category.id || 0)}
                  >
                    <IconTrash />
                  </ButtonRemove>
                </ListActions>
              </ListItem>
              <hr />
            </>
          ))}
        </List>
      </BoxForm>
    </Layout>
  );
};

export default RegisterCategoria;
