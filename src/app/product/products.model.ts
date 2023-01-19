export interface Product extends Record<string, any> {
    id: number,
    title: string,
    image: string,
    images: string[],
    price: number,
    priceHistory: PriceHistory[],
    specifications?: Specification[],
    categoryId: number
}
export interface PriceHistory extends Record<string, any>{
    date: Date,
    price: number
}
export interface Specification extends Record<string, any>{
    title: string,
    value: string,
    valueLong: string,
    knowledge: string,
    partReview: string 
}