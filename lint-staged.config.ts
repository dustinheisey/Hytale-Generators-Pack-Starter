import type { Configuration } from "lint-staged";

export default {
  "*.{js,ts,json}": "npm run lint:cspell",
  "**/*": "npm run format",
  "**/*.ts": "npm run lint:scripts"
} satisfies Configuration;
