import * as yup from "yup";
import { SchemaOf } from "yup";
import { IGenreRequest } from "../../interfaces/genres";

const genrePostSerializer: SchemaOf<IGenreRequest> = yup.object().shape({
    name: yup.string().required(),
})

const listGenresResponseSerializer: SchemaOf<IGenreRequest[]> = yup.array(
    genrePostSerializer
)

export { genrePostSerializer, listGenresResponseSerializer }