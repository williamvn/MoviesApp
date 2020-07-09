export interface ProductDetail{
    name: string,
    genre_ids: number[],
    first_air_date:Date,
    vote_average: number,
    overview:string,
    poster_path:string,
    backdrop_path:string,
    origin_country: string[]
}