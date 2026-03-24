import { generateClient } from "aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api";
import { configureAmplify } from "@/utils/amplify-config";
import { SaveSimulatorInput, SaveSimulatorResponse } from "./type";

configureAmplify();

const client = generateClient();

const SAVE_SIMULATOR_MUTATION = /* GraphQL */ `
  mutation SaveSimulatorResult(
    $companyName: String
    $companySize: String
    $industry: String
    $region: String
    $operationProfile: String
    $operatingHours: Int
    $daysPerWeek: Int
    $avgDailyKm: Int
    $connectionType: String
    $hasTransformer: Boolean
    $availablePowerKW: Int
    $areaM2: Int
    $fleetItemsJson: String!
    $customerId: String
  ) {
    SaveSimulatorResult(
      companyName: $companyName
      companySize: $companySize
      industry: $industry
      region: $region
      operationProfile: $operationProfile
      operatingHours: $operatingHours
      daysPerWeek: $daysPerWeek
      avgDailyKm: $avgDailyKm
      connectionType: $connectionType
      hasTransformer: $hasTransformer
      availablePowerKW: $availablePowerKW
      areaM2: $areaM2
      fleetItemsJson: $fleetItemsJson
      customerId: $customerId
    ) {
      simulatorLeadId
      simulatorResultId
      message
    }
  }
`;

export async function saveSimulatorResult(input: SaveSimulatorInput): Promise<SaveSimulatorResponse> {
  const response = await client.graphql<{ SaveSimulatorResult: SaveSimulatorResponse }>({
    query: SAVE_SIMULATOR_MUTATION,
    variables: {
      companyName: input.companyName ?? null,
      companySize: input.companySize ?? null,
      industry: input.industry ?? null,
      region: input.region ?? null,
      operationProfile: input.operationProfile ?? null,
      operatingHours: input.operatingHours,
      daysPerWeek: input.daysPerWeek,
      avgDailyKm: input.avgDailyKm,
      connectionType: input.connectionType ?? null,
      hasTransformer: input.hasTransformer ?? null,
      availablePowerKW: input.availablePowerKW,
      areaM2: input.areaM2,
      fleetItemsJson: JSON.stringify(input.fleetItems),
      customerId: input.customerId ?? null,
    },
  }) as GraphQLResult<{ SaveSimulatorResult: SaveSimulatorResponse }>;

  const result = response.data?.SaveSimulatorResult;
  if (!result?.simulatorLeadId) {
    throw new Error("SaveSimulatorResult returned no data");
  }
  return result;
}
