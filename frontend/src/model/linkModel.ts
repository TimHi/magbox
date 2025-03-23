export interface LinkModel {
  title: string;
  categorie: string[];
  image: string;
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  expand: LinkExpand;
  link: string;
  read: boolean;
  boxed: boolean;
  tagsFK: string[];
  updated: string;
  userFK: string;
}

export interface LinkExpand {
  categorie: Categorie[];
}

export interface Categorie {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  updated: string;
  userFK: string;
}
