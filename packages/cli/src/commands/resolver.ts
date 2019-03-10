import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import * as inquirer from "inquirer";
import {
  generator,
  getResolversPath,
  OperationType,
  generateQueryOrMutationFile
} from "../core";
import { exec } from "child-process-promise";

export default class ResolverCommand extends Command {
  static description = "Scaffold a resolver";

  async run() {
    const answers: {
      resolverName: string;
      operationType: OperationType;
    } = await inquirer.prompt([
      {
        type: "list",
        name: "operationType",
        message: "What is the operation type?",
        choices: [
          {
            name: "Query",
            value: "Query"
          },
          {
            name: "Mutation",
            value: "Mutation"
          }
        ]
      },
      {
        type: "input",
        name: "resolverName",
        message: "Type the resolver name:"
      }
    ]);

    cli.action.start("Generating files");

    generator({
      operationName: answers.resolverName,
      operationType: answers.operationType,
      schemaPath: "./src/schema.graphql",
      resolverPath: getResolversPath(answers.operationType),
      operationReturnType: "Boolean",
      codegenRelativePath: "../../generated/codegen"
    });

    await exec("yarn codegen");

    generateQueryOrMutationFile({
      filePath:
        answers.operationType === "Query"
          ? "./src/resolvers/Query.ts"
          : "./src/resolvers/Mutation.ts",
      operationType: answers.operationType,
      resolversPath: getResolversPath(answers.operationType),
      resolversRelativePath:
        answers.operationType === "Query" ? "./queries" : "./mutations",
      codegenRelativePath: "../generated/codegen"
    });

    cli.action.stop("✔");
  }
}
