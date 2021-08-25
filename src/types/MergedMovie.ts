import {MovieResponseBeatfilm} from "./responses/BeatFilmApiResponses";

export interface MergedMovie extends MovieResponseBeatfilm{
  isSaved: boolean,
  _id?: string,
}