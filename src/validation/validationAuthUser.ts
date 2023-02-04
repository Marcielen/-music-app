import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { EnumValidation } from "constants/enumValidation";

export type FormData = {
  password: string;
  email: string;
};

export const formDefaultValues = {
  password: "",
  email: "",
};

const schema = yup.object().shape({
  password: yup.string().required(EnumValidation.REQUIRED_FIELD),
  email: yup.string().required(EnumValidation.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(schema);
