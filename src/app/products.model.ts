export interface Product {
    id: number,
    title: string,
    image: string,
    images: string[],
    price: number,
    priceHistory: PriceHistory[],
    specifications?: Specification[]
}
export interface PriceHistory{
    date: Date,
    price: number
}
export interface Specification{
    title: string,
    value: string,
    valueLong: string,
    knowledge: string,
    partReview: string 
}