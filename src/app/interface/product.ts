export interface Product {
    _id: string | number;
    image: string;
    name: string;
    price: string;
    weight: string;
    description: string;
}

export interface Price{
    price: string | number;
    priceValue: string;
}

export interface Weight{
    weight: string | number;
    weightValue: string;
}