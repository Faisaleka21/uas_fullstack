export interface ProductVariantType {
  id?: number; //disamakan dengan migrasi laravel
  variant_product_id: number;
  name: string;
  price: string;
  stock: string;
  product?: {
    id: number;
    name: string;
  };
}
