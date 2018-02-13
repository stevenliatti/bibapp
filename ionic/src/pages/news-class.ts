export class News {
  id: string;
  title: string;
  author: string;
  language: string;
  creationdate: string;
  description: string;
  publisher: string;
  abstract: string;

  constructor(
    id: string, title: string, author: string, language: string, creationdate: string, 
    description: string, publisher: string, abstract: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.language = language;
    this.creationdate = creationdate;
    this.description = description;
    this.publisher = publisher;
    this.abstract = abstract;
  }
}