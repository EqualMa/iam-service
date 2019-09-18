import { writeYaml } from "../lib/file";

import * as envs from "../../src/constants/from-env";
import { generateEnvObjFor } from "../lib/generate-env";

writeYaml(generateEnvObjFor(envs), "./dist/iam-service/env.yml");
