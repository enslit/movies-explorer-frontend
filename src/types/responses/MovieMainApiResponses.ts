type Owner = {
  _id: string;
  email: string;
  name: string;
}

export type MovieMainApiResponse = {
  _id: string;
  owner: Owner;
  movieId: string;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailer: string;
  thumbnail: string;
  nameRU: string;
  nameEN: string;
};

export type MoviesMainApiResponse = MovieMainApiResponse[];