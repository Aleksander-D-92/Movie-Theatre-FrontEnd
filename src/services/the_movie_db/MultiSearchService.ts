import axios, {AxiosResponse} from "axios";

export interface MultiSearchResp {
    page: number
    total_results: number
    total_pages: number
    results: MultiSearchResult[]
}

export interface MultiSearchResult {
    media_type: MediaType
    id: number
    title: string// for movies
    name: string// for tv shows and person
}

export enum MediaType {
    tv = 'tv', movie = 'movie', person = 'person'
}

const MultiSearchService = (function () {
    const API_KEY = '2e0bd1aa1c128cb18713465fe5dbfb12';

    function getResults(name: string): Promise<AxiosResponse<MultiSearchResp>> {
        return axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`);
    }

    return {
        getResults: (name: string) => getResults(name),

    }
})();

export {MultiSearchService}
