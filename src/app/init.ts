import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

import { MainTypes } from "@types";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

export const client = generateClient<MainTypes>();