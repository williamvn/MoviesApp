export interface ProductDetails{
    name:string,
    title:string,
    origin_country: string[],
    first_air_date: string,
    vote_average: number,
    overview: string,
    poster_path: string,
    genre_ids: number[],
    release_date: Date,
}