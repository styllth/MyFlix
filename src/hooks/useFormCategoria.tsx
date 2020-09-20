/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { CategoryProps } from 'interfaces';

const index = (obj: any, is: Array<string> | string, value: string): any => {
  if (typeof is === 'string') return index(obj, is.split('.'), value);
  if (is.length === 1 && value !== undefined) return (obj[is[0]] = value);
  if (is.length === 0) return obj;
  return index(obj[is[0]], is.slice(1), value);
};

const validade = (values: CategoryProps, touched: any): any => {
  const errors: any = {};

  if (touched.title) {
    if (!values.title || values.title.length === 0) {
      errors.title = 'Por favor informe o título da categoria';
    }
  }

  if (touched['link_extra.url']) {
    if (
      values.link_extra.text.length === 0 &&
      values.link_extra.url.length > 0
    ) {
      errors['link_extra.url'] = 'Url do link extra informado sem texto';
    }
  }

  return errors;
};

type FormProps = {
  values: CategoryProps;
  errors: any;
  submittable: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  clearForm: () => void;
};

const useFormCategoria = (initialValues: CategoryProps): FormProps => {
  const [values, setValues] = useState<CategoryProps>({
    ...initialValues,
    link_extra: { ...initialValues.link_extra },
  });
  const [submittable, setSubmittable] = useState(false);
  const [errors, setErros] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = (chave: string, valor: string) => {
    const object = { ...values };
    index(object, chave, valor);
    setValues({
      ...object,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name: string = event.target.getAttribute('name') || '';
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  useEffect(() => {
    setErros(validade(values, touched));
  }, [values, touched]);

  useEffect(() => {
    setSubmittable(
      Object.keys(errors).length === 0 && Object.keys(touched).length > 0,
    );
  }, [errors, touched]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.getAttribute('name') || '', event.target.value);
  };

  function clearForm() {
    setSubmittable(false);
    setValues({
      ...initialValues,
      link_extra: { ...initialValues.link_extra },
    });
    setErros({});
    setTouched({});
  }

  return { values, errors, submittable, handleChange, handleBlur, clearForm };
};

export default useFormCategoria;
