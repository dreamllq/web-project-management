import test from './test';
import { ProductEntity } from '../entities/product';
import { ProjectEntity } from '../entities/project';
import product from './product';
import project from './project';

export default async () => {
  await ProductEntity.getInstance().init();
  await ProjectEntity.getInstance().init();
  product();
  project();
  test();
};