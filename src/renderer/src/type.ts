export type Project = {
  id: string;
  name: string;
  gitHttp: string;
};

export type Product = {
  id: string;
  name: string;
  children: Project[];
};