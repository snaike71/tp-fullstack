export interface MovieProps {
    _id       : string,
	titre     : string,
	année      : number,
	note      : number,
	createdAt : string,
	updatedAt : string,
	__v       : number
  }

export interface MovieFormProps {
    titre : string,
    année  : string,
    note  : string
}

export type MoviesProps = Array<MovieProps>