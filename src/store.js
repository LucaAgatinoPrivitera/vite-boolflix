import { reactive } from 'vue'
import Header from './components/Header.vue';

// const options = {
//     method: 'GET',
//     url: 'https://api.themoviedb.org/3/search/movie',
//     params: {query: 'Il%20Padrino', include_adult: 'false', language: 'en-US', page: '1'},
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
//     }
//   };;

let filmRequest = []
let seriesRequest = []

export const store = reactive({
    filmRequest: filmRequest,
    seriesRequest: seriesRequest
    // options: options
});