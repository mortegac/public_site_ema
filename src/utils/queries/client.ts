import { MainTypes } from "@types";
import { generateClient } from "aws-amplify/data";

export const client = generateClient<MainTypes>();