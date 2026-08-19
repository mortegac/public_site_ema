export interface Author {
  id: string
  name: string
  bio: string
  imageSrc: string
  imageAlt: string
  url: string
  jobTitle: string
  linkedIn?: string
}

export const AUTHORS: Record<string, Author> = {
  'felipe-donoso': {
    id: 'felipe-donoso',
    name: 'Felipe Donoso',
    bio: 'Ingeniero Eléctrico con 10+ años de experiencia en electromovilidad.',
    imageSrc: '/images/felipe-donoso.jpeg',
    imageAlt: 'Felipe Donoso, Ingeniero Eléctrico — Enérgica City',
    url: '/que-es-energica-city',
    jobTitle: 'Ingeniero Eléctrico, Enérgica City',
    linkedIn: 'https://www.linkedin.com/in/felipedonosovergara/',
  },
  'gilberto-escalona': {
    id: 'gilberto-escalona',
    name: 'Gilberto Escalona',
    bio: 'Gerente de Desarrollo de Negocios con experiencia en proyectos de electrificación de flotas.',
    imageSrc: '/images/gilberto-escalona.jpg',
    imageAlt: 'Gilberto Escalona, Gerente de Desarrollo de Negocios',
    url: '/que-es-energica-city',
    jobTitle: 'Gerente de Desarrollo de Negocios, Enérgica City',
    linkedIn: 'https://www.linkedin.com/in/gilbertoescalona/',
  },
  'manuel-ortega': {
    id: 'manuel-ortega',
    name: 'Manuel Ortega',
    bio: 'Ingeniero en desarrollo de software con 8+ años de experiencia en temas asociados a la electromovilidad.',
    imageSrc: '/images/profile/manuel-ortega.jpg',
    imageAlt: 'Manuel Ortega, Ingeniero en desarrollo de software',
    url: '/que-es-energica-city',
    jobTitle: 'Ingeniero en desarrollo de software, Enérgica City',
    linkedIn: 'https://www.linkedin.com/in/manuel-ortega-carcamo',
  },
  'franco-gnecco': {
    id: 'franco-gnecco',
    name: 'Franco Gnecco',
    bio: 'Ingeniero Civil Electrónico',
    imageSrc: '/images/profile/manuel-ortega.jpg',
    imageAlt: 'Manuel Ortega, Ingeniero Civil Electrónico',
    url: '/que-es-energica-city',
    jobTitle: 'Ingeniero Civil Electrónico, Enérgica City',
    linkedIn: 'http://linkedin.com/in/francogneccog',
  },
}

export const DEFAULT_AUTHOR_ID = 'felipe-donoso'
const CANONICAL_DOMAIN = 'https://www.energica.city'

export function getAuthor(id?: string): Author {
  return AUTHORS[id ?? DEFAULT_AUTHOR_ID] ?? AUTHORS[DEFAULT_AUTHOR_ID]
}

export function getAuthorSchemaData(id?: string) {
  const author = getAuthor(id)
  return {
    '@type': 'Person' as const,
    name: author.name,
    '@id': `${CANONICAL_DOMAIN}/#author-${author.id}`,
    jobTitle: author.jobTitle,
    url: `${CANONICAL_DOMAIN}${author.url}`,
    ...(author.linkedIn ? { sameAs: author.linkedIn } : {}),
  }
}
