import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  userId = "userId",
  email = "email",
  password = "password",
  firstName = "firstName",
  lastName = "lastName",
  isDisabled = "isDisabled",
  isDeleted = "isDeleted",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  disabledAt = "disabledAt",
  deletedAt = "deletedAt"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
