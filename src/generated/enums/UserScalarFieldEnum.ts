import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  userId = "userId",
  email = "email",
  password = "password",
  firstName = "firstName",
  lastName = "lastName",
  isDisabled = "isDisabled",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
