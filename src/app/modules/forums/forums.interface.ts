export interface IForum {
  title: string;
  description: string;
  category: string;
  comments: string[];
  status: string;
}

export enum CategoryEnum {
  cultural = 'cultural',
  rebuilding = 'rebuilding',
  materials = 'materials',
  interactive = 'interactive',
  community = 'community',
}
