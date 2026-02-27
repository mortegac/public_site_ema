// import type { ClientForm, ModelEstimateConnection } from "../../utils/imports/graphql/API";
// import type { ModelEstimateConnection, Customer } from "../../utils/imports/graphql/API";
// import * as MAIN from "../../../amplify/data/main.schema";
// import type { emptyCustomer } from "../Customer/type";

// export const emptyEstimateConnection: ModelEstimateConnection = {
//   __typename: "ModelEstimateConnection",
//   items: [],
//   nextToken: null,
// };



export type clientFormInput = {
  name?: string,
  email?: string,
  phone?: string,
  address?: string,
  customerId?: string | null,
  isHouse?: boolean,
  isPortable?: boolean,
  isWallbox?: boolean,
  numberOfChargers?: number,
  distance?: number,
};

export type ClientForm = {
  // __typename: "ClientForm",
  // Customer?: Customer | null,
  // Estimates?: ModelEstimateConnection | null,
  // createdAt: string,
  customerId?: string | null,
  distance: number,
  formId: string,
  isHouse: boolean,
  isPortable: boolean,
  isWallbox: boolean,
  numberOfChargers?: number | null,
  // updatedAt: string,
  //extras
  name?: string,
  email?: string,
  phone?: string,
  address?: string,

  // NEWS
  acceptTermAndConditions: boolean,
  isBuilding?: boolean,
  hasOwnCharger?: boolean,
  needsCharger?: boolean,
  
};


export const emptyClientForm: ClientForm = {
  // __typename: "ClientForm",
  // userId: "",
  // createdAt: "",
  // updatedAt: "",
  // Customer: null,
  // Estimates: emptyEstimateConnection,
  customerId: "",
  distance: 0,
  formId: "",
  address: "",
  isHouse: false,
  isPortable: false,
  isWallbox: false,
  numberOfChargers: 0,
  // createdAt: "",
  // updatedAt: "",
    // NEWS
  acceptTermAndConditions: false,
  isBuilding: false,
  hasOwnCharger: true,
  needsCharger: false,
};



// export type InputForm  = {
//   userEmail?: string | undefined;
// }
