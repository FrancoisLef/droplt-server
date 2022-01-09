import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

const crudResolversMap = {
  User: crudResolvers.UserCrudResolver,
  Torrent: crudResolvers.TorrentCrudResolver,
  TorrentFile: crudResolvers.TorrentFileCrudResolver
};
const actionResolversMap = {
  User: {
    user: actionResolvers.FindUniqueUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    users: actionResolvers.FindManyUserResolver,
    createUser: actionResolvers.CreateUserResolver,
    deleteUser: actionResolvers.DeleteUserResolver,
    updateUser: actionResolvers.UpdateUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    upsertUser: actionResolvers.UpsertUserResolver,
    aggregateUser: actionResolvers.AggregateUserResolver,
    groupByUser: actionResolvers.GroupByUserResolver
  },
  Torrent: {
    torrent: actionResolvers.FindUniqueTorrentResolver,
    findFirstTorrent: actionResolvers.FindFirstTorrentResolver,
    torrents: actionResolvers.FindManyTorrentResolver,
    createTorrent: actionResolvers.CreateTorrentResolver,
    deleteTorrent: actionResolvers.DeleteTorrentResolver,
    updateTorrent: actionResolvers.UpdateTorrentResolver,
    deleteManyTorrent: actionResolvers.DeleteManyTorrentResolver,
    updateManyTorrent: actionResolvers.UpdateManyTorrentResolver,
    upsertTorrent: actionResolvers.UpsertTorrentResolver,
    aggregateTorrent: actionResolvers.AggregateTorrentResolver,
    groupByTorrent: actionResolvers.GroupByTorrentResolver
  },
  TorrentFile: {
    torrentFile: actionResolvers.FindUniqueTorrentFileResolver,
    findFirstTorrentFile: actionResolvers.FindFirstTorrentFileResolver,
    torrentFiles: actionResolvers.FindManyTorrentFileResolver,
    createTorrentFile: actionResolvers.CreateTorrentFileResolver,
    deleteTorrentFile: actionResolvers.DeleteTorrentFileResolver,
    updateTorrentFile: actionResolvers.UpdateTorrentFileResolver,
    deleteManyTorrentFile: actionResolvers.DeleteManyTorrentFileResolver,
    updateManyTorrentFile: actionResolvers.UpdateManyTorrentFileResolver,
    upsertTorrentFile: actionResolvers.UpsertTorrentFileResolver,
    aggregateTorrentFile: actionResolvers.AggregateTorrentFileResolver,
    groupByTorrentFile: actionResolvers.GroupByTorrentFileResolver
  }
};
const crudResolversInfo = {
  User: ["user", "findFirstUser", "users", "createUser", "deleteUser", "updateUser", "deleteManyUser", "updateManyUser", "upsertUser", "aggregateUser", "groupByUser"],
  Torrent: ["torrent", "findFirstTorrent", "torrents", "createTorrent", "deleteTorrent", "updateTorrent", "deleteManyTorrent", "updateManyTorrent", "upsertTorrent", "aggregateTorrent", "groupByTorrent"],
  TorrentFile: ["torrentFile", "findFirstTorrentFile", "torrentFiles", "createTorrentFile", "deleteTorrentFile", "updateTorrentFile", "deleteManyTorrentFile", "updateManyTorrentFile", "upsertTorrentFile", "aggregateTorrentFile", "groupByTorrentFile"]
};
const argsInfo = {
  FindUniqueUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateUserArgs: ["data"],
  DeleteUserArgs: ["where"],
  UpdateUserArgs: ["data", "where"],
  DeleteManyUserArgs: ["where"],
  UpdateManyUserArgs: ["data", "where"],
  UpsertUserArgs: ["where", "create", "update"],
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueTorrentArgs: ["where"],
  FindFirstTorrentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyTorrentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateTorrentArgs: ["data"],
  DeleteTorrentArgs: ["where"],
  UpdateTorrentArgs: ["data", "where"],
  DeleteManyTorrentArgs: ["where"],
  UpdateManyTorrentArgs: ["data", "where"],
  UpsertTorrentArgs: ["where", "create", "update"],
  AggregateTorrentArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByTorrentArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueTorrentFileArgs: ["where"],
  FindFirstTorrentFileArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyTorrentFileArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateTorrentFileArgs: ["data"],
  DeleteTorrentFileArgs: ["where"],
  UpdateTorrentFileArgs: ["data", "where"],
  DeleteManyTorrentFileArgs: ["where"],
  UpdateManyTorrentFileArgs: ["data", "where"],
  UpsertTorrentFileArgs: ["where", "create", "update"],
  AggregateTorrentFileArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByTorrentFileArgs: ["where", "orderBy", "by", "having", "take", "skip"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
  > = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
  > = Partial<Record<ModelResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
  > = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  Torrent: relationResolvers.TorrentRelationsResolver,
  TorrentFile: relationResolvers.TorrentFileRelationsResolver
};
const relationResolversInfo = {
  Torrent: ["files"],
  TorrentFile: ["Torrent"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
  > = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        tslib.__decorate(allActionsDecorators, relationResolverTarget, relationResolverActionName, null);
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | "_all", PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  User: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  Torrent: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentFile: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateUser: ["_count", "_min", "_max"],
  UserGroupBy: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt", "_count", "_min", "_max"],
  AggregateTorrent: ["_count", "_avg", "_sum", "_min", "_max"],
  TorrentGroupBy: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateTorrentFile: ["_count", "_avg", "_sum", "_min", "_max"],
  TorrentFileGroupBy: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  UserCountAggregate: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt", "_all"],
  UserMinAggregate: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  UserMaxAggregate: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  TorrentCount: ["files"],
  TorrentCountAggregate: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt", "_all"],
  TorrentAvgAggregate: ["transmissionId", "size", "progress", "ratio", "downloaded", "uploaded"],
  TorrentSumAggregate: ["transmissionId", "size", "progress", "ratio", "downloaded", "uploaded"],
  TorrentMinAggregate: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentMaxAggregate: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentFileCountAggregate: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt", "_all"],
  TorrentFileAvgAggregate: ["size", "downloaded"],
  TorrentFileSumAggregate: ["size", "downloaded"],
  TorrentFileMinAggregate: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileMaxAggregate: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
  > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  UserWhereInput: ["AND", "OR", "NOT", "userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  UserOrderByWithRelationInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  UserWhereUniqueInput: ["userId", "email"],
  UserOrderByWithAggregationInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt", "_count", "_max", "_min"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  TorrentWhereInput: ["AND", "OR", "NOT", "torrentId", "hash", "transmissionId", "name", "size", "path", "files", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentOrderByWithRelationInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "files", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentWhereUniqueInput: ["torrentId", "hash"],
  TorrentOrderByWithAggregationInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  TorrentScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentFileWhereInput: ["AND", "OR", "NOT", "torrentFileId", "torrentId", "name", "size", "downloaded", "Torrent", "createdAt", "updatedAt"],
  TorrentFileOrderByWithRelationInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "Torrent", "createdAt", "updatedAt"],
  TorrentFileWhereUniqueInput: ["torrentFileId"],
  TorrentFileOrderByWithAggregationInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  TorrentFileScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  UserCreateInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  UserUpdateInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  UserUpdateManyMutationInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  TorrentCreateInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt", "files"],
  TorrentUpdateInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt", "files"],
  TorrentUpdateManyMutationInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentFileCreateInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt", "Torrent"],
  TorrentFileUpdateInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt", "Torrent"],
  TorrentFileUpdateManyMutationInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  BoolFilter: ["equals", "not"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  UserCountOrderByAggregateInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  UserMaxOrderByAggregateInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  UserMinOrderByAggregateInput: ["userId", "email", "password", "firstName", "lastName", "isDisabled", "createdAt", "updatedAt"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  TorrentFileListRelationFilter: ["every", "some", "none"],
  FloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  TorrentFileOrderByRelationAggregateInput: ["_count"],
  TorrentCountOrderByAggregateInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentAvgOrderByAggregateInput: ["transmissionId", "size", "progress", "ratio", "downloaded", "uploaded"],
  TorrentMaxOrderByAggregateInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentMinOrderByAggregateInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentSumOrderByAggregateInput: ["transmissionId", "size", "progress", "ratio", "downloaded", "uploaded"],
  IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  FloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  TorrentRelationFilter: ["is", "isNot"],
  TorrentFileCountOrderByAggregateInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileAvgOrderByAggregateInput: ["size", "downloaded"],
  TorrentFileMaxOrderByAggregateInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileMinOrderByAggregateInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileSumOrderByAggregateInput: ["size", "downloaded"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  StringFieldUpdateOperationsInput: ["set"],
  BoolFieldUpdateOperationsInput: ["set"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  TorrentFileCreateNestedManyWithoutTorrentInput: ["create", "connectOrCreate", "connect"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  FloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  TorrentFileUpdateManyWithoutTorrentInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  TorrentCreateNestedOneWithoutFilesInput: ["create", "connectOrCreate", "connect"],
  TorrentUpdateOneWithoutFilesInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  NullableStringFieldUpdateOperationsInput: ["set"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedBoolFilter: ["equals", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  TorrentFileCreateWithoutTorrentInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileCreateOrConnectWithoutTorrentInput: ["where", "create"],
  TorrentFileUpsertWithWhereUniqueWithoutTorrentInput: ["where", "update", "create"],
  TorrentFileUpdateWithWhereUniqueWithoutTorrentInput: ["where", "data"],
  TorrentFileUpdateManyWithWhereWithoutTorrentInput: ["where", "data"],
  TorrentFileScalarWhereInput: ["AND", "OR", "NOT", "torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentCreateWithoutFilesInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentCreateOrConnectWithoutFilesInput: ["where", "create"],
  TorrentUpsertWithoutFilesInput: ["update", "create"],
  TorrentUpdateWithoutFilesInput: ["torrentId", "hash", "transmissionId", "name", "size", "path", "progress", "ratio", "status", "downloaded", "uploaded", "addedAt", "completedAt", "createdAt", "updatedAt"],
  TorrentFileUpdateWithoutTorrentInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
  > = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

