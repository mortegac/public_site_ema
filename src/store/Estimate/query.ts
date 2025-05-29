// import * as APITypes from "../../utils/imports/graphql/API";

// type GeneratedQuery<InputType, OutputType> = string & {
//   __generatedQueryInput: InputType;
//   __generatedQueryOutput: OutputType;
// };

// export const getUserCustom = /* GraphQL */ `query GetUser($userId: ID!) {
//   getUser(userId: $userId) {
//     Company {
//       companyId
//       companyType
//       createdAt
//       name
//       updatedAt
//       __typename
//     }
//     # Eve {
//     #   nextToken
//     #   __typename
//     # }
//     # EveCron {
//     #   nextToken
//     #   __typename
//     # }
//     Role {
//       roleId
//       name 
//       displayName
//       icon
//       PermissionPerRole {
//         items {
//           Permissions {
//             permissionId
//             name
//             displayName
//             icon
//             isVisible
//             order
//             isLeaf
//             Submenu {
//               items {
//                 permissionId
//                 name
//                 displayName
//                 icon
//                 isVisible
//                 order
//                 isLeaf
//               }
//             }
//           }
//         }
//       }
//     }
//     # collectionId
//     companyId
//     createdAt
//     name
//     roleId
//     updatedAt
//     userId
//     validated
//     __typename
//   }
// }
// ` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
