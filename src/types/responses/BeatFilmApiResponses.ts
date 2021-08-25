type ImageBeatfilm = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      path: null;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  created_at: string;
  updated_at: string;
};

export interface MovieResponseBeatfilm {
  id: string;
  image: ImageBeatfilm;
  duration: number;
  isSaved: boolean;
  nameRU: string;
  description: string;
  trailerLink: string | undefined;
  country: string | undefined;
  director: string | undefined;
  year: string;
  nameEN: string | undefined;
}