export type Folder = {
  id: number;
  created_at: Date;
  favorite: boolean;
  name: string;
  link_count: number;
};

export type User = {
  id: number;
  created_at: Date;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
};

export type LinkItem = {
  id: number;
  created_at: Date;
  createdAt: Date;
  updated_at: Date;
  url: string;
  title: string;
  description: string;
  image_source: string;
  imageSource: string;
  folder_id: number;
  [key: string]: number | Date | string;
};
