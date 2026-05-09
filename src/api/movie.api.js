import axios from "./axios";

export const movieApi = {
  getHotMovies: () => axios.get("/movies/hot"),
  getMovieDetails: (id) => axios.get(`/movies/${id}`),
  getMovies: () => axios.get("/movies"),
};
