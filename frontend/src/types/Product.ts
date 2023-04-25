export type Product = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  category: string;
  brand: string;
  price: number;
  countInStock: number;
  description: string[];
  rating: number;
  numReviews: number;
  reviews: Review[];
  taste: string[];
  banner: string;
  isFeatured: boolean;
};

export type Review = {
  _id: string;
  createdAt: string;
  name: string;
  rating: number;
  comment: string;
};
