export type Project = {
  id: string;
  name: string;
  gitCloneUrl: string;
  productId: string;
  hasCloned: boolean;
};

export type Product = {
  id: string;
  name: string;
  dir?: string;
};