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
  Torrent: crudResolvers.TorrentCrudResolver,
  TorrentFile: crudResolvers.TorrentFileCrudResolver
};
const actionResolversMap = {
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
  Torrent: ["torrent", "findFirstTorrent", "torrents", "createTorrent", "deleteTorrent", "updateTorrent", "deleteManyTorrent", "updateManyTorrent", "upsertTorrent", "aggregateTorrent", "groupByTorrent"],
  TorrentFile: ["torrentFile", "findFirstTorrentFile", "torrentFiles", "createTorrentFile", "deleteTorrentFile", "updateTorrentFile", "deleteManyTorrentFile", "updateManyTorrentFile", "upsertTorrentFile", "aggregateTorrentFile", "groupByTorrentFile"]
};
const argsInfo = {
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
  Torrent: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
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
  AggregateTorrent: ["_count", "_avg", "_sum", "_min", "_max"],
  TorrentGroupBy: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateTorrentFile: ["_count", "_avg", "_sum", "_min", "_max"],
  TorrentFileGroupBy: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  TorrentCount: ["files"],
  TorrentCountAggregate: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt", "_all"],
  TorrentAvgAggregate: ["size", "eta", "progress", "ratio", "downloaded", "uploaded"],
  TorrentSumAggregate: ["size", "eta", "progress", "ratio", "downloaded", "uploaded"],
  TorrentMinAggregate: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentMaxAggregate: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
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
  TorrentWhereInput: ["AND", "OR", "NOT", "torrentId", "name", "size", "path", "eta", "files", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentOrderByWithRelationInput: ["torrentId", "name", "size", "path", "eta", "files", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentWhereUniqueInput: ["torrentId"],
  TorrentOrderByWithAggregationInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt", "_count", "_avg", "_max", "_min", "_sum"],
  TorrentScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentFileWhereInput: ["AND", "OR", "NOT", "torrentFileId", "torrentId", "name", "size", "downloaded", "Torrent", "createdAt", "updatedAt"],
  TorrentFileOrderByWithRelationInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "Torrent", "createdAt", "updatedAt"],
  TorrentFileWhereUniqueInput: ["torrentFileId"],
  TorrentFileOrderByWithAggregationInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  TorrentFileScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentCreateInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt", "files"],
  TorrentUpdateInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt", "files"],
  TorrentUpdateManyMutationInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentFileCreateInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt", "Torrent"],
  TorrentFileUpdateInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt", "Torrent"],
  TorrentFileUpdateManyMutationInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  FloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  FloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  TorrentFileListRelationFilter: ["every", "some", "none"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  TorrentFileOrderByRelationAggregateInput: ["_count"],
  TorrentCountOrderByAggregateInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentAvgOrderByAggregateInput: ["size", "eta", "progress", "ratio", "downloaded", "uploaded"],
  TorrentMaxOrderByAggregateInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentMinOrderByAggregateInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentSumOrderByAggregateInput: ["size", "eta", "progress", "ratio", "downloaded", "uploaded"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  FloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  FloatNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  TorrentRelationFilter: ["is", "isNot"],
  TorrentFileCountOrderByAggregateInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileAvgOrderByAggregateInput: ["size", "downloaded"],
  TorrentFileMaxOrderByAggregateInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileMinOrderByAggregateInput: ["torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileSumOrderByAggregateInput: ["size", "downloaded"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  TorrentFileCreateNestedManyWithoutTorrentInput: ["create", "connectOrCreate", "connect"],
  StringFieldUpdateOperationsInput: ["set"],
  FloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  NullableFloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  TorrentFileUpdateManyWithoutTorrentInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  TorrentCreateNestedOneWithoutFilesInput: ["create", "connectOrCreate", "connect"],
  TorrentUpdateOneWithoutFilesInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  NullableStringFieldUpdateOperationsInput: ["set"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedFloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedFloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  TorrentFileCreateWithoutTorrentInput: ["torrentFileId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentFileCreateOrConnectWithoutTorrentInput: ["where", "create"],
  TorrentFileUpsertWithWhereUniqueWithoutTorrentInput: ["where", "update", "create"],
  TorrentFileUpdateWithWhereUniqueWithoutTorrentInput: ["where", "data"],
  TorrentFileUpdateManyWithWhereWithoutTorrentInput: ["where", "data"],
  TorrentFileScalarWhereInput: ["AND", "OR", "NOT", "torrentFileId", "torrentId", "name", "size", "downloaded", "createdAt", "updatedAt"],
  TorrentCreateWithoutFilesInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
  TorrentCreateOrConnectWithoutFilesInput: ["where", "create"],
  TorrentUpsertWithoutFilesInput: ["update", "create"],
  TorrentUpdateWithoutFilesInput: ["torrentId", "name", "size", "path", "eta", "progress", "ratio", "status", "downloaded", "uploaded", "createdAt", "updatedAt", "addedAt", "completedAt"],
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

