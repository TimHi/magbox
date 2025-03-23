export class DocumentPreview {
  Icon: string;
  Name: string;
  Title: string;
  Description: string;
  Images: string[];
  Link: string;

  constructor(
    icon: string,
    name: string,
    title: string,
    description: string,
    images: string[],
    link: string,
  ) {
    this.Icon = icon;
    this.Name = name;
    this.Title = title;
    this.Description = description;
    this.Images = images;
    this.Link = link;
  }
}
