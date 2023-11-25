import { Options } from "../index.js";

const ts_config = {
    compilerOptions: {
      target: "ES2022",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      forceConsistentCasingInFileNames: true,
      strict: true,
      noImplicitAny: true,
      skipLibCheck: true,
      esModuleInterop: true,
      jsx: "react-jsx",
      jsxImportSource: "hono/jsx",
    },
    exclude: ["node_modules", "dist"],
  };

export function get_ts_config() {
    return JSON.stringify(ts_config).trim() + "\n";
}