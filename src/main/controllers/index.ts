import test from './test';
import { ProductEntity } from '../entities/product';
import product from './product';

export default async () => {
  await ProductEntity.getInstance().init();
  product();
  test();
};