import { writeYaml } from "../lib/file";

import * as envs from "../../src/constants/from-env";
import { generateEnvObjFor } from "../lib/generate-env";

writeYaml(
  { environment: generateEnvObjFor(envs).environment },
  "./dist/iam-service/env.yml",
);
