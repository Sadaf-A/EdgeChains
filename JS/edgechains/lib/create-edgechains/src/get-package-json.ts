import type { Options } from "../index.js";

function get_package_json(options: Options) {

  return (
    JSON.stringify(
      {
        name: options.project_name,
        private: true,
        type: "module",
        scripts: {
            test: "echo \"Error: no test specified\" && exit 1"
        },
        dependencies: {
            tsc: "^2.0.4",
            typescript: "^5.3.2"
        },
        devDependencies: {
            hono: "^3.10.2"
        },
        engines: {
          node: ">=18.14.1",
        },
      },
      null,
      2,
    ) + "\n"
  );
}

export { get_package_json };
