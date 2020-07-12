export interface ProductDetail{
    id:number,
    name: string,
    first_air_date:Date,
    vote_average: number,
    overview:string,
    poster_path:string,
    backdrop_path:string,
    type?:string
}