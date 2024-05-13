export type Folder = {
  id: number;
  created_at: Date;
  favorite: boolean;
  name: string;
  link_count?: number;
  user_id?: number;
};

export type User = {
  email: string;
  password: string;
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
