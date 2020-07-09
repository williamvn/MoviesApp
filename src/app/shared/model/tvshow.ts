export interface TVShow {
    original_name: string;
    genre_ids: number[];
    name: string;
    popularity: number;
    origin_country: string[];
    vote_count: number;
    first_air_date: Date;
    backdrop_path: string;
    original_language: string;
    id: number;
    vote_average: number;
    overview: string;
    poster_path: string;
}

export interface TVResponse{
    page: number,
    total_results: number,
    total_pages: number,
    results: TVShow[]
}
