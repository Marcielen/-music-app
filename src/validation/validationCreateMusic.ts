import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { EnumValidation } from "constants/enumValidation";

import { SelectOptions } from "components/Select/SelectDefault";

export type FormData = {
  nameMusic: string;
  genere: SelectOptions | null;
  author: string;
  album: string;
};

export const formDefaultValues = {
  nameMusic: "",
  genere: null,
  author: "",
  album: "",
};

const schema = yup.object().shape({
  nameMusic: yup.string().required(EnumValidation.REQUIRED_FIELD),
  album: yup.string().required(EnumValidation.REQUIRED_FIELD),
  author: yup.string().required(EnumValidation.REQUIRED_FIELD),
  genere: yup
    .object()
    .nullable()
    .default(null)
    .required(EnumValidation.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(schema);
