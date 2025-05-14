//create the structure of the product model from the next json {
//   "id": 1, title, price, description, image, category and rating that contains rate and count

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
