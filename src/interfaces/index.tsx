export type VideoProps = {
  id: number;
  title: string;
  url: string;
  categoryId?: number;
  category?: string;
};

export type LinkExtraProps = {
  text: string;
  url: string;
};

export type CategoryProps = {
  id: number;
  title?: string;
  color: string;
  link_extra: LinkExtraProps;
  videos?: VideoProps[];
};
