export interface Product {
  id: string;
  title: string;
  ingredients: string;
  weight: string;
  calories: string;
  price: string;
  image: string;
  category: string;
  isIcon: boolean;
}

export interface ProductProps extends Omit<Product, "image"> {
  image: string | File | null;
}
