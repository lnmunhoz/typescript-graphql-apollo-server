/**
 * Steps:
 * 1. Add the mutation or query to the schema ✔️
 * 2. Run the codegen to generate the type for it️️ ✔️ ️️️
 * 3. Generate the file with the resolver boilerplate already with the type ✔️
 * 4. Add the generated resolver to the query or mutation exporter ️✔️
 * 5. Add inquirer to ask the resolver name ️️️✔️
 * 6. Ask for arguments, maybe list the current inputs in the schema?
 *
 * TODO:
 *  Generate correct return types
 *
 */

import { parse } from "graphql/language/parser";
import { buildASTSchema, printSchema } from "graphql";
import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

export type OperationType = "Mutation" | "Query";
interface GenerateResolverCodeParams {
  operationName: GeneratorParams["operationName"];
  operationType: GeneratorParams["operationType"];
  codegenRelativePath: GeneratorParams["codegenRelativePath"];
  resolverPath: GeneratorParams["resolverPath"];
}

/**
 * Pretty prints an object
 */
function print(obj: any) {
  console.log(JSON.stringify(obj, null, 2));
}

function debugLog(msg: string) {
  console.log(`[debug] ${msg}`);
}

/**
 * Given a schema path, it returns the AST object.
 */
const schemaToAST = (schemaPath: string) => {
  const schemaString = fs.readFileSync(schemaPath, "utf-8");
  return parse(schemaString);
};

const astToSchemaString = (ast: any) => {
  const newSchema = buildASTSchema(ast);
  return printSchema(newSchema);
};

const formatCode = (code: string) =>
  prettier.format(code, {
    parser: "typescript"
  });

const generateResolverCode = (params: GenerateResolverCodeParams) => {
  const resolverName = `${params.operationName}Resolver`;
  const generatedType =
    params.operationName[0].toUpperCase() +
    params.operationName.slice(1) +
    "Resolver";

  const code = `
import { ${params.operationType}Resolvers } from "${
    params.codegenRelativePath
  }";

const ${resolverName}: ${
    params.operationType
  }Resolvers.${generatedType} = async (
parent,
args,
ctx
) => {
throw new Error("Not implemented")
};

export default ${resolverName};
`;

  return formatCode(code);
};

interface GenerateQueryFileParams {
  filePath: string;
  resolversPath: string;
  operationType: OperationType;
  codegenRelativePath: string;
  resolversRelativePath: string;
}

export const generateQueryOrMutationFile = (
  params: GenerateQueryFileParams
) => {
  const files = fs.readdirSync(params.resolversPath);
  const resolverNames = files.map(fileName => {
    const [resolverName] = fileName.split(".");
    return resolverName;
  });

  const resolverImports = resolverNames
    .map(resolverName => {
      const resolverPath = `${
        params.resolversRelativePath
      }/${resolverName}.resolver`;
      return `import ${resolverName} from "${resolverPath}";`;
    })
    .join(";");

  const code = `
import { ${params.operationType}Resolvers } from "${
    params.codegenRelativePath
  }";
${resolverImports}

const ${params.operationType}: ${params.operationType}Resolvers.Resolvers = {
  ${resolverNames}
}

export default ${params.operationType}

`;

  debugLog(`Generating ${params.operationType} file`);
  fs.writeFileSync(params.filePath, formatCode(code), "utf8");
};

interface GeneratorParams {
  schemaPath: string;
  operationType: OperationType;
  operationName: string;
  operationReturnType: string;
  codegenRelativePath: string;
  resolverPath: string;
}

// Return types
// if is only Type
// if is [Type]
// if is [Type!]
// if is [Type]!
// if is [Type!]!

export const generator = (params: GeneratorParams) => {
  const ast = schemaToAST(params.schemaPath);

  ast.definitions.forEach(definition => {
    if (definition.name.value === params.operationType) {
      // fs.writeFileSync(
      //   "./cli/logs.json",
      //   JSON.stringify(definition, null, 2),
      //   "utf8"
      // );

      const resolverAst = {
        kind: "FieldDefinition",
        name: {
          kind: "Name",
          value: params.operationName
        },
        arguments: [],
        type: {
          kind: "NonNullType",
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: params.operationReturnType
            }
          }
        },
        directives: []
      };

      const resolverDefinitionIndex = definition.fields.findIndex(
        field => field.name.value === params.operationName
      );

      if (resolverDefinitionIndex === -1) {
        throw new Error("Resolver not found");
        // debugLog("Adding new resolver to schema");
        // definition.fields.push(resolverAst);
      } else {
        // debugLog("Found resolver in schema, updating...");
        // definition.fields[resolverDefinitionIndex] = resolverAst;
      }
    }
  });

  const resolverCode = generateResolverCode({
    operationName: params.operationName,
    operationType: params.operationType,
    codegenRelativePath: params.codegenRelativePath,
    resolverPath: params.resolverPath
  });

  // Create resolver file
  fs.writeFileSync(
    path.join(params.resolverPath, `${params.operationName}.resolver.ts`),
    resolverCode,
    "utf8"
  );

  // Update schema file
  // --> Instead, just read from the schema the resolver that we want to scaffold
  // const schemaString = astToSchemaString(ast);
  // fs.writeFileSync(params.schemaPath, schemaString, "utf8");
};

export const getResolversPath = (operationType: OperationType) =>
  operationType === "Query"
    ? "./src/resolvers/queries"
    : "./src/resolvers/mutations";

// ============= How to use ===================
// ============================================

// generator({
//   schemaPath: "./src/schema.graphql",
//   operationName: "updateProfile",
//   operationType: "Mutation",
//   operationReturnType: "Boolean",
//   codegenRelativePath: "../../generated/codegen",
//   resolverPath: getResolversPath("Query")
// });

// generateQueryOrMutationFile({
//   filePath: "./src/resolvers/Query.ts",
//   resolversPath: getResolversPath("Query"),
//   operationType: "Query",
//   resolversRelativePath: "./queries",
//   codegenRelativePath: "../generated/codegen"
// });

// generateQueryOrMutationFile({
//   filePath: "./src/resolvers/Mutation.ts",
//   resolversPath: getResolversPath("Mutation"),
//   operationType: "Mutation",
//   resolversRelativePath: "./mutations",
//   codegenRelativePath: "../generated/codegen"
// });
