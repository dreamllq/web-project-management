export type Project = {
  id: string;
  name: string;
  gitCloneUrl: string;
  productId: string;
};

export type Product = {
  id: string;
  name: string;
  dir?: string;
};