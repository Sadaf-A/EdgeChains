import * as path from "node:path";
import * as fs from "node:fs";
import inquirer from "inquirer";
import { format } from "prettier";
import { get_ts_config } from "./src/get-tsconfig.js";
import { get_package_json } from "./src/get-package-json.js";
import { fileURLToPath } from "node:url";
import { get_gitignore } from "./src/get-gitignore.js";

type Options = {
  project_name: string;
  lang_preference: "typescript";
  deployment_target: "node";
};

const lang_choices = ["TypeScript"] as const;

const deployment_choices = ["Node"] as const;

function dirname_from_import_meta(import_meta_url: string) {
  return path.dirname(fileURLToPath(import_meta_url));
}

type Prompts = Parameters<(typeof inquirer)["prompt"]>[0];

const prompts = [
  {
    type: "",
    name: "new_dir_name",
    message: `Enter a name for your project's new directory:`,
    prefix: "\n",
    validate: (dirname: string) => {
      const invalidCharacters = /[<>:"\/\\|?*\x00-\x1F ]/;
      return !!dirname && !invalidCharacters.test(dirname);
    },
  },
  {
    type: "list",
    name: "lang_preference",
    message: "TypeScript or JavaScript?",
    choices: lang_choices,
    prefix: "\n",
  },
  {
    type: "list",
    name: "deployment_target",
    message: `Choose a deployment target (easy to change later):`,
    choices: deployment_choices,
    prefix: "\n",
  },
] satisfies Prompts;

async function ask_questions(): Promise<
  | {
      new_dir_name: string;
      lang_preference: (typeof lang_choices)[number];
      deployment_target: (typeof deployment_choices)[number];
    }
  | undefined
> {
  try {
    return await inquirer.prompt(prompts);
  } catch (error) {
    console.error("\nError:", error);
  }
}

function get_options(
  choices: NonNullable<Awaited<ReturnType<typeof ask_questions>>>,
) {
  return {
    project_name: choices.new_dir_name,
    lang_preference: "typescript",
    deployment_target: "node"
  } satisfies Options;
}

async function main() {
  const choices = await ask_questions();

  if (!choices) {
    console.log("\nSomething went wrong! Please file an issue.\n");
    return;
  }

  const options = get_options(choices);

  console.log("\nWorking...");

  try {
    const new_dir_path = path.join(process.cwd(), choices.new_dir_name);

    const dir_already_exists =
      fs.existsSync(new_dir_path) && fs.statSync(new_dir_path).isDirectory();

    if (dir_already_exists) {
      throw new Error(`Directory ${new_dir_path} already exists.`);
    }

    // create all the folders we need
    fs.mkdirSync(new_dir_path, { recursive: true });
    fs.mkdirSync(path.join(new_dir_path, "src"), { recursive: true });
    fs.mkdirSync(path.join(new_dir_path, "src/config"), { recursive: true });
    fs.mkdirSync(path.join(new_dir_path, "src/jsonnet"), { recursive: true });
    fs.mkdirSync(path.join(new_dir_path, "src/lib"), { recursive: true });
    fs.mkdirSync(path.join(new_dir_path, "src/routes"), { recursive: true });
    fs.mkdirSync(path.join(new_dir_path, "src/service"), { recursive: true });
    fs.mkdirSync(path.join(new_dir_path, "src/types"), { recursive: true });

    // tsconfig
    fs.writeFileSync(
      path.join(new_dir_path, "tsconfig.json"),
      await format(get_ts_config(), {
        parser: "json",
      }),
      "utf8",
    );

    // package.json
    fs.writeFileSync(
      path.join(new_dir_path, "package.json"),
      await format(get_package_json(options), {
        parser: "json",
      }),
      "utf8",
    );

    //gitignore
    fs.writeFileSync(
      path.join(new_dir_path, ".gitignore"),
      get_gitignore(),
      "utf8",
    );

    // .env
    // fs.writeFileSync(path.join(new_dir_path, ".env"), get_env(), "utf8");

    // // eslintignore
    // fs.writeFileSync(
    //   path.join(new_dir_path, ".eslintignore"),
    //   get_eslintignore(),
    //   "utf8",
    // );

    const root_dir_path = path.join(
      dirname_from_import_meta(import.meta.url),
      `../`,
    );

  
  } catch (e) {
    return e;
  }
}

await main();

export type { Options };