export interface ProductType {
  id?: number; //disamakan dengan migrasi laravel
  product_category_id: number;
  name: string;
  code: string;
  categorie_product?: {
    id: number;
    name: string;
  };
}
