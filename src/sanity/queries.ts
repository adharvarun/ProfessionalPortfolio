export const aboutQuery = `*[_type == "about"][0]{
  title,
  shortDescription,
  description,
  image,
  titles,
  skills
}`;

export const projectsQuery = `*[_type == "projects"] | order(_createdAt desc){
  _id,
  title,
  slug,
  description,
  image,
  link,
  tags,
  github,
  demovideo,
  technologies,
}`;

export const experienceQuery = `*[_type == "experience"] | order(_createdAt desc){
  _id,
  title,
  company,
  startYear,
  endYear,
  description,
  duration
}`;

export const contactQuery = `*[_type == "contact"]{
  name,
  url,
  icon
}`;

export const linksQuery = `*[_type == "link"] | order(_createdAt asc){
  _id,
  title,
  url,
  icon
}`;
