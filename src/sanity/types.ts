export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

export type AboutData = {
  title?: string;
  shortDescription?: string;
  description?: string;
  image?: SanityImage;
  titles?: string[];
  skills?: string[];
};

export type ProjectItem = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  description?: string;
  image?: SanityImage;
  link?: string;
  tags?: string[];
  github?: string;
  demovideo?: string;
  technologies?: string[];
};

export type ExperienceItem = {
  _id: string;
  title?: string;
  company?: string;
  startYear?: number;
  endYear?: string;
  description?: string;
  duration?: string;
};

export type ContactData = {
  name?: string;
  url?: string;
  icon?: string;
};

export type LinkItem = {
  _id: string;
  title?: string;
  url?: string;
  icon?: string;
};
