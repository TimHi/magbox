export interface LinkModel {
    title: string;
    categorie: string[];
    image: string;
    collectionId: string;
    collectionName: string;
    created: string;
    description: string;
    id: string;
    link: string;
    read: boolean;
    boxed: boolean;
    tagsFK: string[];
    updated: string;
    userFK: string;
}