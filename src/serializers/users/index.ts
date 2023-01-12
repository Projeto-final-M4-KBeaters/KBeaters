import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserResponse } from "../../interfaces/users";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isPerformer: yup.boolean().notRequired(),
});

const userRegisterResponseSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdmin: yup.boolean().required(),
    isPerformer: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  });

const listUsersResponseSerializer: SchemaOf<IUserResponse[]> = yup.array(
  userRegisterResponseSerializer
);

export {
  userSerializer,
  userRegisterResponseSerializer,
  listUsersResponseSerializer,
};