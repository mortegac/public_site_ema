/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CalendarVisit = {
  __typename: "CalendarVisit",
  Customer?: Customer | null,
  User?: User | null,
  amount?: number | null,
  calendarId: string,
  createdAt: string,
  customerId?: string | null,
  duration?: number | null,
  endDate?: string | null,
  startDate?: string | null,
  updatedAt: string,
  userId?: string | null,
};

export type Customer = {
  __typename: "Customer",
  CalendarVisits?: ModelCalendarVisitConnection | null,
  ClientForm?: ModelClientFormConnection | null,
  address?: string | null,
  comune?: string | null,
  createdAt: string,
  customerId: string,
  email?: string | null,
  id: string,
  name?: string | null,
  phone?: string | null,
  updatedAt: string,
};

export type ModelCalendarVisitConnection = {
  __typename: "ModelCalendarVisitConnection",
  items:  Array<CalendarVisit | null >,
  nextToken?: string | null,
};

export type ModelClientFormConnection = {
  __typename: "ModelClientFormConnection",
  items:  Array<ClientForm | null >,
  nextToken?: string | null,
};

export type ClientForm = {
  __typename: "ClientForm",
  Customer?: Customer | null,
  Estimates?: ModelEstimateConnection | null,
  createdAt: string,
  customerId?: string | null,
  distance: number,
  formId: string,
  isHouse: boolean,
  isPortable: boolean,
  isWallbox: boolean,
  numberOfChargers?: number | null,
  updatedAt: string,
};

export type ModelEstimateConnection = {
  __typename: "ModelEstimateConnection",
  items:  Array<Estimate | null >,
  nextToken?: string | null,
};

export type Estimate = {
  __typename: "Estimate",
  ClientForm?: ClientForm | null,
  EstimateDetail?: ModelEstimateDetailConnection | null,
  InstallationRecipe?: InstallationRecipe | null,
  ShoppingCart?: ModelShoppingCartConnection | null,
  TE6Cost?: number | null,
  boardAndAssemblyCost?: number | null,
  cableingCost?: number | null,
  canalizationCost?: number | null,
  chargerBrand?: string | null,
  chargerCost?: number | null,
  chargerModel?: string | null,
  chargerPotence?: number | null,
  createdAt: string,
  distanceBPC?: number | null,
  distanceExposed?: number | null,
  distanceUnderground?: number | null,
  electricRoomFloorNumber?: string | null,
  electricalProtectionCost?: number | null,
  energicaMargin?: number | null,
  energicaMarginCost?: number | null,
  energicaNetCost?: number | null,
  estimateId: string,
  formId?: string | null,
  groundWebMeasurementCost?: number | null,
  hasTireStops?: boolean | null,
  installationRecipeId?: string | null,
  installedFromAppartment?: boolean | null,
  isApproved?: boolean | null,
  isHouse?: boolean | null,
  isUnderground?: boolean | null,
  manpowerCost?: number | null,
  materialsCost?: number | null,
  needsElectricPoles?: boolean | null,
  netCost?: number | null,
  numberOfBends?: number | null,
  numberOfChargers?: number | null,
  numberOfInstallers?: number | null,
  numberOfManDays?: number | null,
  numberOfWallBreaches?: number | null,
  otherInstallationCosts?: number | null,
  parkingFloorNumber?: string | null,
  preChanneledDistance?: number | null,
  stateValidation?: EstimateStateValidation | null,
  totalInstallationGross?: number | null,
  undergroundDistance?: number | null,
  updatedAt: string,
  vat?: number | null,
  vatPercentage?: number | null,
  vehicleBrand?: string | null,
  vehicleModel?: string | null,
};

export type ModelEstimateDetailConnection = {
  __typename: "ModelEstimateDetailConnection",
  items:  Array<EstimateDetail | null >,
  nextToken?: string | null,
};

export type EstimateDetail = {
  __typename: "EstimateDetail",
  Estimate?: Estimate | null,
  InstallationInput?: InstallationInput | null,
  Price?: Price | null,
  Product?: Product | null,
  ShoppingCartDetail?: ModelShoppingCartDetailConnection | null,
  createdAt: string,
  estimateDetailId: string,
  estimateId?: string | null,
  installationInputId?: string | null,
  priceId?: string | null,
  productId?: string | null,
  quantity?: number | null,
  state?: EstimateDetailState | null,
  totalPrice?: number | null,
  type?: string | null,
  unit?: string | null,
  unitPrice?: number | null,
  updatedAt: string,
};

export type InstallationInput = {
  __typename: "InstallationInput",
  EstimateDetails?: ModelEstimateDetailConnection | null,
  InstallationRecipe?: ModelInstallationInputRelConnection | null,
  Prices?: ModelPriceConnection | null,
  conductorCrossSection?: number | null,
  createdAt: string,
  description?: string | null,
  detail?: string | null,
  installationInputId: string,
  installationRecipeId?: string | null,
  unit?: string | null,
  updatedAt: string,
};

export type ModelInstallationInputRelConnection = {
  __typename: "ModelInstallationInputRelConnection",
  items:  Array<InstallationInputRel | null >,
  nextToken?: string | null,
};

export type InstallationInputRel = {
  __typename: "InstallationInputRel",
  InstallationInput?: InstallationInput | null,
  InstallationRecipe?: InstallationRecipe | null,
  amountPerInstallationMeter?: number | null,
  createdAt: string,
  installationInputId: string,
  installationRecipeId: string,
  quantity?: number | null,
  type: string,
  updatedAt: string,
  usagePercentage?: number | null,
};

export type InstallationRecipe = {
  __typename: "InstallationRecipe",
  Estimates?: ModelEstimateConnection | null,
  InstallationInputs?: ModelInstallationInputRelConnection | null,
  InstallationProducts?: ModelInstallationProductRelConnection | null,
  createdAt: string,
  installationRecipeId: string,
  isHouse: boolean,
  isUnderground: boolean,
  name: string,
  potence: number,
  updatedAt: string,
};

export type ModelInstallationProductRelConnection = {
  __typename: "ModelInstallationProductRelConnection",
  items:  Array<InstallationProductRel | null >,
  nextToken?: string | null,
};

export type InstallationProductRel = {
  __typename: "InstallationProductRel",
  InstallationRecipe?: InstallationRecipe | null,
  Product?: Product | null,
  createdAt: string,
  installationRecipeId: string,
  productId: string,
  quantity?: number | null,
  updatedAt: string,
};

export type Product = {
  __typename: "Product",
  EstimateDetails?: ModelEstimateDetailConnection | null,
  Prices?: ModelPriceConnection | null,
  Recipes?: ModelInstallationProductRelConnection | null,
  brand?: string | null,
  createdAt: string,
  description?: string | null,
  detail?: string | null,
  potence?: number | null,
  productId: string,
  type?: string | null,
  unit?: string | null,
  updatedAt: string,
};

export type ModelPriceConnection = {
  __typename: "ModelPriceConnection",
  items:  Array<Price | null >,
  nextToken?: string | null,
};

export type Price = {
  __typename: "Price",
  EstimateDetails?: ModelEstimateDetailConnection | null,
  InstallationInput?: InstallationInput | null,
  Product?: Product | null,
  ShoppingCartDetails?: ModelShoppingCartDetailConnection | null,
  cost?: number | null,
  createdAt: string,
  endDate?: string | null,
  installationInputId?: string | null,
  priceId: string,
  productId?: string | null,
  startDate?: string | null,
  status?: PriceStatus | null,
  updatedAt: string,
};

export type ModelShoppingCartDetailConnection = {
  __typename: "ModelShoppingCartDetailConnection",
  items:  Array<ShoppingCartDetail | null >,
  nextToken?: string | null,
};

export type ShoppingCartDetail = {
  __typename: "ShoppingCartDetail",
  EstimateDetail?: EstimateDetail | null,
  Price?: Price | null,
  ShoppingCart?: ShoppingCart | null,
  createdAt: string,
  estimateDetailId?: string | null,
  price?: number | null,
  priceId?: string | null,
  shoppingCartDetailId: string,
  shoppingCartId?: string | null,
  typeOfItem?: ShoppingCartDetailTypeOfItem | null,
  updatedAt: string,
};

export type ShoppingCart = {
  __typename: "ShoppingCart",
  Discounts?: ModelDiscountShoppingCartConnection | null,
  Estimate?: Estimate | null,
  PaymentTransaction?: PaymentTransaction | null,
  ShoppingCartDetails?: ModelShoppingCartDetailConnection | null,
  createdAt: string,
  estimateId?: string | null,
  paymentMethod?: ShoppingCartPaymentMethod | null,
  paymentTransactionId?: string | null,
  shoppingCartId: string,
  status?: ShoppingCartStatus | null,
  totalPrice?: number | null,
  updatedAt: string,
  vat?: number | null,
};

export type ModelDiscountShoppingCartConnection = {
  __typename: "ModelDiscountShoppingCartConnection",
  items:  Array<DiscountShoppingCart | null >,
  nextToken?: string | null,
};

export type DiscountShoppingCart = {
  __typename: "DiscountShoppingCart",
  Discount?: Discount | null,
  ShoppingCart?: ShoppingCart | null,
  createdAt: string,
  discountId: string,
  shoppingCartId: string,
  updatedAt: string,
};

export type Discount = {
  __typename: "Discount",
  ShoppingCarts?: ModelDiscountShoppingCartConnection | null,
  createdAt: string,
  discountId: string,
  flatAmount?: number | null,
  name?: string | null,
  percentage?: number | null,
  updatedAt: string,
};

export type PaymentTransaction = {
  __typename: "PaymentTransaction",
  ShoppingCart?: ShoppingCart | null,
  accounting_date?: string | null,
  amount?: number | null,
  authorization_code?: string | null,
  buy_order?: string | null,
  card_detail?: string | null,
  card_number?: string | null,
  createdAt: string,
  date?: string | null,
  glosa?: string | null,
  installments_amount?: string | null,
  installments_number?: string | null,
  paymentTransactionId: string,
  payment_type_code?: string | null,
  paymentsProcessorCommission?: number | null,
  response_code?: string | null,
  session_id?: string | null,
  shoppingCartId?: string | null,
  status?: string | null,
  token?: string | null,
  transaction_date?: string | null,
  updatedAt: string,
  usersPaymentTransactionsId?: string | null,
  vci?: string | null,
};

export enum ShoppingCartPaymentMethod {
  bank_transfer = "bank_transfer",
  cash = "cash",
  on_site = "on_site",
  transbank = "transbank",
}


export enum ShoppingCartStatus {
  cancelled = "cancelled",
  completed = "completed",
  pending = "pending",
}


export enum ShoppingCartDetailTypeOfItem {
  input = "input",
  product = "product",
  service = "service",
}


export enum PriceStatus {
  active = "active",
  archived = "archived",
  deleted = "deleted",
}


export enum EstimateDetailState {
  automated = "automated",
  installerModified = "installerModified",
  installerVerified = "installerVerified",
}


export type ModelShoppingCartConnection = {
  __typename: "ModelShoppingCartConnection",
  items:  Array<ShoppingCart | null >,
  nextToken?: string | null,
};

export enum EstimateStateValidation {
  automated = "automated",
  installerModified = "installerModified",
  installerVerified = "installerVerified",
}


export type User = {
  __typename: "User",
  CalendarVisits?: ModelCalendarVisitConnection | null,
  Company?: Company | null,
  RequestedTickets?: ModelSupportTicketConnection | null,
  ResolveTickest?: ModelSupportTicketConnection | null,
  Role?: Role | null,
  TicketComments?: ModelTicketCommentConnection | null,
  companyId?: string | null,
  createdAt: string,
  name: string,
  roleId?: string | null,
  updatedAt: string,
  userId: string,
  validated?: boolean | null,
};

export type Company = {
  __typename: "Company",
  Users?: ModelUserConnection | null,
  companyId: string,
  createdAt: string,
  name: string,
  updatedAt: string,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSupportTicketConnection = {
  __typename: "ModelSupportTicketConnection",
  items:  Array<SupportTicket | null >,
  nextToken?: string | null,
};

export type SupportTicket = {
  __typename: "SupportTicket",
  AssignedEmployee?: User | null,
  Solicitant?: User | null,
  TicketComments?: ModelTicketCommentConnection | null,
  createdAt: string,
  date?: string | null,
  description?: string | null,
  email?: string | null,
  employeeId?: string | null,
  eveId?: string | null,
  lastModificationUser?: string | null,
  level?: SupportTicketLevel | null,
  name?: string | null,
  phoneNumber?: string | null,
  solicitantId?: string | null,
  statusTicket?: SupportTicketStatusTicket | null,
  supportTicketId: string,
  updatedAt: string,
};

export type ModelTicketCommentConnection = {
  __typename: "ModelTicketCommentConnection",
  items:  Array<TicketComment | null >,
  nextToken?: string | null,
};

export type TicketComment = {
  __typename: "TicketComment",
  SupportTicket?: SupportTicket | null,
  User?: User | null,
  canClientSeeComment?: boolean | null,
  createdAt: string,
  isEnergica?: boolean | null,
  message: string,
  supportTicketId?: string | null,
  ticketCommentId: string,
  typeOfUser?: TicketCommentTypeOfUser | null,
  updatedAt: string,
  userId: string,
};

export enum TicketCommentTypeOfUser {
  client = "client",
  internal = "internal",
  test = "test",
}


export enum SupportTicketLevel {
  one = "one",
  three = "three",
  two = "two",
}


export enum SupportTicketStatusTicket {
  does_not_apply = "does_not_apply",
  in_progress = "in_progress",
  open = "open",
  resolved = "resolved",
}


export type Role = {
  __typename: "Role",
  PermissionPerRole?: ModelPermissionPerRoleConnection | null,
  createdAt: string,
  displayName: string,
  icon: string,
  name: string,
  roleId: string,
  updatedAt: string,
  users?: ModelUserConnection | null,
};

export type ModelPermissionPerRoleConnection = {
  __typename: "ModelPermissionPerRoleConnection",
  items:  Array<PermissionPerRole | null >,
  nextToken?: string | null,
};

export type PermissionPerRole = {
  __typename: "PermissionPerRole",
  Permissions?: Permission | null,
  Roles?: Role | null,
  createdAt: string,
  permissionId: string,
  roleId: string,
  updatedAt: string,
};

export type Permission = {
  __typename: "Permission",
  Padre?: Permission | null,
  PermissionPerRole?: ModelPermissionPerRoleConnection | null,
  Submenu?: ModelPermissionConnection | null,
  createdAt: string,
  displayName: string,
  icon: string,
  isLeaf?: boolean | null,
  isVisible?: boolean | null,
  name: string,
  order?: number | null,
  padreId?: string | null,
  permissionId: string,
  updatedAt: string,
};

export type ModelPermissionConnection = {
  __typename: "ModelPermissionConnection",
  items:  Array<Permission | null >,
  nextToken?: string | null,
};

export type Metadata = {
  __typename: "Metadata",
  Parameter?: Parameter | null,
  createdAt: string,
  key?: string | null,
  metadataId: string,
  parameterId?: string | null,
  updatedAt: string,
  value?: string | null,
};

export type Parameter = {
  __typename: "Parameter",
  Metadata?: ModelMetadataConnection | null,
  ParameterEnc?: ParameterEnc | null,
  createdAt: string,
  label: string,
  parameterEncId?: string | null,
  parameterId: string,
  updatedAt: string,
  value: string,
};

export type ModelMetadataConnection = {
  __typename: "ModelMetadataConnection",
  items:  Array<Metadata | null >,
  nextToken?: string | null,
};

export type ParameterEnc = {
  __typename: "ParameterEnc",
  Parameters?: ModelParameterConnection | null,
  createdAt: string,
  description: string,
  parameterEncId: string,
  updatedAt: string,
};

export type ModelParameterConnection = {
  __typename: "ModelParameterConnection",
  items:  Array<Parameter | null >,
  nextToken?: string | null,
};

export type ModelCalendarVisitFilterInput = {
  amount?: ModelIntInput | null,
  and?: Array< ModelCalendarVisitFilterInput | null > | null,
  calendarId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  duration?: ModelIntInput | null,
  endDate?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelCalendarVisitFilterInput | null,
  or?: Array< ModelCalendarVisitFilterInput | null > | null,
  startDate?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelClientFormFilterInput = {
  and?: Array< ModelClientFormFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  distance?: ModelFloatInput | null,
  formId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  isHouse?: ModelBooleanInput | null,
  isPortable?: ModelBooleanInput | null,
  isWallbox?: ModelBooleanInput | null,
  not?: ModelClientFormFilterInput | null,
  numberOfChargers?: ModelIntInput | null,
  or?: Array< ModelClientFormFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelCompanyFilterInput = {
  and?: Array< ModelCompanyFilterInput | null > | null,
  companyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelCompanyFilterInput | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCompanyConnection = {
  __typename: "ModelCompanyConnection",
  items:  Array<Company | null >,
  nextToken?: string | null,
};

export type ModelCustomerFilterInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelCustomerFilterInput | null > | null,
  comune?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelCustomerFilterInput | null,
  or?: Array< ModelCustomerFilterInput | null > | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCustomerConnection = {
  __typename: "ModelCustomerConnection",
  items:  Array<Customer | null >,
  nextToken?: string | null,
};

export type ModelDiscountShoppingCartFilterInput = {
  and?: Array< ModelDiscountShoppingCartFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  discountId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelDiscountShoppingCartFilterInput | null,
  or?: Array< ModelDiscountShoppingCartFilterInput | null > | null,
  shoppingCartId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelDiscountFilterInput = {
  and?: Array< ModelDiscountFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  discountId?: ModelIDInput | null,
  flatAmount?: ModelIntInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelDiscountFilterInput | null,
  or?: Array< ModelDiscountFilterInput | null > | null,
  percentage?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelDiscountConnection = {
  __typename: "ModelDiscountConnection",
  items:  Array<Discount | null >,
  nextToken?: string | null,
};

export type ModelEstimateDetailFilterInput = {
  and?: Array< ModelEstimateDetailFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  estimateDetailId?: ModelIDInput | null,
  estimateId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  installationInputId?: ModelIDInput | null,
  not?: ModelEstimateDetailFilterInput | null,
  or?: Array< ModelEstimateDetailFilterInput | null > | null,
  priceId?: ModelIDInput | null,
  productId?: ModelIDInput | null,
  quantity?: ModelFloatInput | null,
  state?: ModelEstimateDetailStateInput | null,
  totalPrice?: ModelIntInput | null,
  type?: ModelStringInput | null,
  unit?: ModelStringInput | null,
  unitPrice?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelEstimateDetailStateInput = {
  eq?: EstimateDetailState | null,
  ne?: EstimateDetailState | null,
};

export type ModelEstimateFilterInput = {
  TE6Cost?: ModelIntInput | null,
  and?: Array< ModelEstimateFilterInput | null > | null,
  boardAndAssemblyCost?: ModelIntInput | null,
  cableingCost?: ModelIntInput | null,
  canalizationCost?: ModelIntInput | null,
  chargerBrand?: ModelStringInput | null,
  chargerCost?: ModelIntInput | null,
  chargerModel?: ModelStringInput | null,
  chargerPotence?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  distanceBPC?: ModelFloatInput | null,
  distanceExposed?: ModelFloatInput | null,
  distanceUnderground?: ModelFloatInput | null,
  electricRoomFloorNumber?: ModelStringInput | null,
  electricalProtectionCost?: ModelIntInput | null,
  energicaMargin?: ModelFloatInput | null,
  energicaMarginCost?: ModelIntInput | null,
  energicaNetCost?: ModelIntInput | null,
  estimateId?: ModelIDInput | null,
  formId?: ModelIDInput | null,
  groundWebMeasurementCost?: ModelIntInput | null,
  hasTireStops?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  installationRecipeId?: ModelIDInput | null,
  installedFromAppartment?: ModelBooleanInput | null,
  isApproved?: ModelBooleanInput | null,
  isHouse?: ModelBooleanInput | null,
  isUnderground?: ModelBooleanInput | null,
  manpowerCost?: ModelIntInput | null,
  materialsCost?: ModelIntInput | null,
  needsElectricPoles?: ModelBooleanInput | null,
  netCost?: ModelIntInput | null,
  not?: ModelEstimateFilterInput | null,
  numberOfBends?: ModelIntInput | null,
  numberOfChargers?: ModelIntInput | null,
  numberOfInstallers?: ModelIntInput | null,
  numberOfManDays?: ModelFloatInput | null,
  numberOfWallBreaches?: ModelIntInput | null,
  or?: Array< ModelEstimateFilterInput | null > | null,
  otherInstallationCosts?: ModelIntInput | null,
  parkingFloorNumber?: ModelStringInput | null,
  preChanneledDistance?: ModelFloatInput | null,
  stateValidation?: ModelEstimateStateValidationInput | null,
  totalInstallationGross?: ModelIntInput | null,
  undergroundDistance?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
  vat?: ModelIntInput | null,
  vatPercentage?: ModelFloatInput | null,
  vehicleBrand?: ModelStringInput | null,
  vehicleModel?: ModelStringInput | null,
};

export type ModelEstimateStateValidationInput = {
  eq?: EstimateStateValidation | null,
  ne?: EstimateStateValidation | null,
};

export type ModelInstallationInputRelFilterInput = {
  amountPerInstallationMeter?: ModelFloatInput | null,
  and?: Array< ModelInstallationInputRelFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  installationInputId?: ModelIDInput | null,
  installationRecipeId?: ModelIDInput | null,
  not?: ModelInstallationInputRelFilterInput | null,
  or?: Array< ModelInstallationInputRelFilterInput | null > | null,
  quantity?: ModelFloatInput | null,
  type?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  usagePercentage?: ModelFloatInput | null,
};

export type ModelInstallationInputRelPrimaryCompositeKeyConditionInput = {
  beginsWith?: ModelInstallationInputRelPrimaryCompositeKeyInput | null,
  between?: Array< ModelInstallationInputRelPrimaryCompositeKeyInput | null > | null,
  eq?: ModelInstallationInputRelPrimaryCompositeKeyInput | null,
  ge?: ModelInstallationInputRelPrimaryCompositeKeyInput | null,
  gt?: ModelInstallationInputRelPrimaryCompositeKeyInput | null,
  le?: ModelInstallationInputRelPrimaryCompositeKeyInput | null,
  lt?: ModelInstallationInputRelPrimaryCompositeKeyInput | null,
};

export type ModelInstallationInputRelPrimaryCompositeKeyInput = {
  installationRecipeId?: string | null,
  type?: string | null,
};

export type ModelInstallationInputFilterInput = {
  and?: Array< ModelInstallationInputFilterInput | null > | null,
  conductorCrossSection?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  detail?: ModelStringInput | null,
  id?: ModelIDInput | null,
  installationInputId?: ModelIDInput | null,
  installationRecipeId?: ModelIDInput | null,
  not?: ModelInstallationInputFilterInput | null,
  or?: Array< ModelInstallationInputFilterInput | null > | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelInstallationInputConnection = {
  __typename: "ModelInstallationInputConnection",
  items:  Array<InstallationInput | null >,
  nextToken?: string | null,
};

export type ModelInstallationProductRelFilterInput = {
  and?: Array< ModelInstallationProductRelFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  installationRecipeId?: ModelIDInput | null,
  not?: ModelInstallationProductRelFilterInput | null,
  or?: Array< ModelInstallationProductRelFilterInput | null > | null,
  productId?: ModelIDInput | null,
  quantity?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelInstallationRecipeFilterInput = {
  and?: Array< ModelInstallationRecipeFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  installationRecipeId?: ModelIDInput | null,
  isHouse?: ModelBooleanInput | null,
  isUnderground?: ModelBooleanInput | null,
  name?: ModelStringInput | null,
  not?: ModelInstallationRecipeFilterInput | null,
  or?: Array< ModelInstallationRecipeFilterInput | null > | null,
  potence?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelInstallationRecipeConnection = {
  __typename: "ModelInstallationRecipeConnection",
  items:  Array<InstallationRecipe | null >,
  nextToken?: string | null,
};

export type ModelMetadataFilterInput = {
  and?: Array< ModelMetadataFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  key?: ModelStringInput | null,
  metadataId?: ModelIDInput | null,
  not?: ModelMetadataFilterInput | null,
  or?: Array< ModelMetadataFilterInput | null > | null,
  parameterId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
};

export type ModelParameterEncFilterInput = {
  and?: Array< ModelParameterEncFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelParameterEncFilterInput | null,
  or?: Array< ModelParameterEncFilterInput | null > | null,
  parameterEncId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelParameterEncConnection = {
  __typename: "ModelParameterEncConnection",
  items:  Array<ParameterEnc | null >,
  nextToken?: string | null,
};

export type ModelParameterFilterInput = {
  and?: Array< ModelParameterFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  label?: ModelStringInput | null,
  not?: ModelParameterFilterInput | null,
  or?: Array< ModelParameterFilterInput | null > | null,
  parameterEncId?: ModelIDInput | null,
  parameterId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
};

export type ModelPaymentTransactionFilterInput = {
  accounting_date?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelPaymentTransactionFilterInput | null > | null,
  authorization_code?: ModelStringInput | null,
  buy_order?: ModelStringInput | null,
  card_detail?: ModelStringInput | null,
  card_number?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  glosa?: ModelStringInput | null,
  id?: ModelIDInput | null,
  installments_amount?: ModelStringInput | null,
  installments_number?: ModelStringInput | null,
  not?: ModelPaymentTransactionFilterInput | null,
  or?: Array< ModelPaymentTransactionFilterInput | null > | null,
  paymentTransactionId?: ModelIDInput | null,
  payment_type_code?: ModelStringInput | null,
  paymentsProcessorCommission?: ModelFloatInput | null,
  response_code?: ModelStringInput | null,
  session_id?: ModelStringInput | null,
  shoppingCartId?: ModelIDInput | null,
  status?: ModelStringInput | null,
  token?: ModelIDInput | null,
  transaction_date?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  usersPaymentTransactionsId?: ModelIDInput | null,
  vci?: ModelStringInput | null,
};

export type ModelPaymentTransactionConnection = {
  __typename: "ModelPaymentTransactionConnection",
  items:  Array<PaymentTransaction | null >,
  nextToken?: string | null,
};

export type ModelPermissionPerRoleFilterInput = {
  and?: Array< ModelPermissionPerRoleFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelPermissionPerRoleFilterInput | null,
  or?: Array< ModelPermissionPerRoleFilterInput | null > | null,
  permissionId?: ModelIDInput | null,
  roleId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPermissionFilterInput = {
  and?: Array< ModelPermissionFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isLeaf?: ModelBooleanInput | null,
  isVisible?: ModelBooleanInput | null,
  name?: ModelStringInput | null,
  not?: ModelPermissionFilterInput | null,
  or?: Array< ModelPermissionFilterInput | null > | null,
  order?: ModelIntInput | null,
  padreId?: ModelIDInput | null,
  permissionId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPriceFilterInput = {
  and?: Array< ModelPriceFilterInput | null > | null,
  cost?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  id?: ModelIDInput | null,
  installationInputId?: ModelIDInput | null,
  not?: ModelPriceFilterInput | null,
  or?: Array< ModelPriceFilterInput | null > | null,
  priceId?: ModelIDInput | null,
  productId?: ModelIDInput | null,
  startDate?: ModelStringInput | null,
  status?: ModelPriceStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPriceStatusInput = {
  eq?: PriceStatus | null,
  ne?: PriceStatus | null,
};

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelProductFilterInput = {
  and?: Array< ModelProductFilterInput | null > | null,
  brand?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  detail?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelProductFilterInput | null,
  or?: Array< ModelProductFilterInput | null > | null,
  potence?: ModelFloatInput | null,
  productId?: ModelIDInput | null,
  type?: ModelStringInput | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelRoleFilterInput = {
  and?: Array< ModelRoleFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelRoleFilterInput | null,
  or?: Array< ModelRoleFilterInput | null > | null,
  roleId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelRoleConnection = {
  __typename: "ModelRoleConnection",
  items:  Array<Role | null >,
  nextToken?: string | null,
};

export type ModelShoppingCartDetailFilterInput = {
  and?: Array< ModelShoppingCartDetailFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  estimateDetailId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelShoppingCartDetailFilterInput | null,
  or?: Array< ModelShoppingCartDetailFilterInput | null > | null,
  price?: ModelIntInput | null,
  priceId?: ModelIDInput | null,
  shoppingCartDetailId?: ModelIDInput | null,
  shoppingCartId?: ModelIDInput | null,
  typeOfItem?: ModelShoppingCartDetailTypeOfItemInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelShoppingCartDetailTypeOfItemInput = {
  eq?: ShoppingCartDetailTypeOfItem | null,
  ne?: ShoppingCartDetailTypeOfItem | null,
};

export type ModelShoppingCartFilterInput = {
  and?: Array< ModelShoppingCartFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  estimateId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelShoppingCartFilterInput | null,
  or?: Array< ModelShoppingCartFilterInput | null > | null,
  paymentMethod?: ModelShoppingCartPaymentMethodInput | null,
  paymentTransactionId?: ModelIDInput | null,
  shoppingCartId?: ModelIDInput | null,
  status?: ModelShoppingCartStatusInput | null,
  totalPrice?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  vat?: ModelIntInput | null,
};

export type ModelShoppingCartPaymentMethodInput = {
  eq?: ShoppingCartPaymentMethod | null,
  ne?: ShoppingCartPaymentMethod | null,
};

export type ModelShoppingCartStatusInput = {
  eq?: ShoppingCartStatus | null,
  ne?: ShoppingCartStatus | null,
};

export type ModelSupportTicketFilterInput = {
  and?: Array< ModelSupportTicketFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  employeeId?: ModelIDInput | null,
  eveId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  lastModificationUser?: ModelStringInput | null,
  level?: ModelSupportTicketLevelInput | null,
  name?: ModelStringInput | null,
  not?: ModelSupportTicketFilterInput | null,
  or?: Array< ModelSupportTicketFilterInput | null > | null,
  phoneNumber?: ModelStringInput | null,
  solicitantId?: ModelIDInput | null,
  statusTicket?: ModelSupportTicketStatusTicketInput | null,
  supportTicketId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSupportTicketLevelInput = {
  eq?: SupportTicketLevel | null,
  ne?: SupportTicketLevel | null,
};

export type ModelSupportTicketStatusTicketInput = {
  eq?: SupportTicketStatusTicket | null,
  ne?: SupportTicketStatusTicket | null,
};

export type ModelTicketCommentFilterInput = {
  and?: Array< ModelTicketCommentFilterInput | null > | null,
  canClientSeeComment?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isEnergica?: ModelBooleanInput | null,
  message?: ModelStringInput | null,
  not?: ModelTicketCommentFilterInput | null,
  or?: Array< ModelTicketCommentFilterInput | null > | null,
  supportTicketId?: ModelIDInput | null,
  ticketCommentId?: ModelIDInput | null,
  typeOfUser?: ModelTicketCommentTypeOfUserInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelTicketCommentTypeOfUserInput = {
  eq?: TicketCommentTypeOfUser | null,
  ne?: TicketCommentTypeOfUser | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
  companyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  roleId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  validated?: ModelBooleanInput | null,
};

export type ModelCalendarVisitConditionInput = {
  amount?: ModelIntInput | null,
  and?: Array< ModelCalendarVisitConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  duration?: ModelIntInput | null,
  endDate?: ModelStringInput | null,
  not?: ModelCalendarVisitConditionInput | null,
  or?: Array< ModelCalendarVisitConditionInput | null > | null,
  startDate?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateCalendarVisitInput = {
  amount?: number | null,
  calendarId: string,
  customerId?: string | null,
  duration?: number | null,
  endDate?: string | null,
  startDate?: string | null,
  userId?: string | null,
};

export type ModelClientFormConditionInput = {
  and?: Array< ModelClientFormConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  distance?: ModelFloatInput | null,
  isHouse?: ModelBooleanInput | null,
  isPortable?: ModelBooleanInput | null,
  isWallbox?: ModelBooleanInput | null,
  not?: ModelClientFormConditionInput | null,
  numberOfChargers?: ModelIntInput | null,
  or?: Array< ModelClientFormConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateClientFormInput = {
  customerId?: string | null,
  distance: number,
  formId: string,
  isHouse: boolean,
  isPortable: boolean,
  isWallbox: boolean,
  numberOfChargers?: number | null,
};

export type ModelCompanyConditionInput = {
  and?: Array< ModelCompanyConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelCompanyConditionInput | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCompanyInput = {
  companyId: string,
  name: string,
};

export type ModelCustomerConditionInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelCustomerConditionInput | null > | null,
  comune?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelCustomerConditionInput | null,
  or?: Array< ModelCustomerConditionInput | null > | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCustomerInput = {
  address?: string | null,
  comune?: string | null,
  customerId: string,
  email?: string | null,
  id?: string | null,
  name?: string | null,
  phone?: string | null,
};

export type ModelDiscountConditionInput = {
  and?: Array< ModelDiscountConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  flatAmount?: ModelIntInput | null,
  name?: ModelStringInput | null,
  not?: ModelDiscountConditionInput | null,
  or?: Array< ModelDiscountConditionInput | null > | null,
  percentage?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDiscountInput = {
  discountId: string,
  flatAmount?: number | null,
  name?: string | null,
  percentage?: number | null,
};

export type ModelDiscountShoppingCartConditionInput = {
  and?: Array< ModelDiscountShoppingCartConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelDiscountShoppingCartConditionInput | null,
  or?: Array< ModelDiscountShoppingCartConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDiscountShoppingCartInput = {
  discountId: string,
  shoppingCartId: string,
};

export type ModelEstimateConditionInput = {
  TE6Cost?: ModelIntInput | null,
  and?: Array< ModelEstimateConditionInput | null > | null,
  boardAndAssemblyCost?: ModelIntInput | null,
  cableingCost?: ModelIntInput | null,
  canalizationCost?: ModelIntInput | null,
  chargerBrand?: ModelStringInput | null,
  chargerCost?: ModelIntInput | null,
  chargerModel?: ModelStringInput | null,
  chargerPotence?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  distanceBPC?: ModelFloatInput | null,
  distanceExposed?: ModelFloatInput | null,
  distanceUnderground?: ModelFloatInput | null,
  electricRoomFloorNumber?: ModelStringInput | null,
  electricalProtectionCost?: ModelIntInput | null,
  energicaMargin?: ModelFloatInput | null,
  energicaMarginCost?: ModelIntInput | null,
  energicaNetCost?: ModelIntInput | null,
  formId?: ModelIDInput | null,
  groundWebMeasurementCost?: ModelIntInput | null,
  hasTireStops?: ModelBooleanInput | null,
  installationRecipeId?: ModelIDInput | null,
  installedFromAppartment?: ModelBooleanInput | null,
  isApproved?: ModelBooleanInput | null,
  isHouse?: ModelBooleanInput | null,
  isUnderground?: ModelBooleanInput | null,
  manpowerCost?: ModelIntInput | null,
  materialsCost?: ModelIntInput | null,
  needsElectricPoles?: ModelBooleanInput | null,
  netCost?: ModelIntInput | null,
  not?: ModelEstimateConditionInput | null,
  numberOfBends?: ModelIntInput | null,
  numberOfChargers?: ModelIntInput | null,
  numberOfInstallers?: ModelIntInput | null,
  numberOfManDays?: ModelFloatInput | null,
  numberOfWallBreaches?: ModelIntInput | null,
  or?: Array< ModelEstimateConditionInput | null > | null,
  otherInstallationCosts?: ModelIntInput | null,
  parkingFloorNumber?: ModelStringInput | null,
  preChanneledDistance?: ModelFloatInput | null,
  stateValidation?: ModelEstimateStateValidationInput | null,
  totalInstallationGross?: ModelIntInput | null,
  undergroundDistance?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
  vat?: ModelIntInput | null,
  vatPercentage?: ModelFloatInput | null,
  vehicleBrand?: ModelStringInput | null,
  vehicleModel?: ModelStringInput | null,
};

export type CreateEstimateInput = {
  TE6Cost?: number | null,
  boardAndAssemblyCost?: number | null,
  cableingCost?: number | null,
  canalizationCost?: number | null,
  chargerBrand?: string | null,
  chargerCost?: number | null,
  chargerModel?: string | null,
  chargerPotence?: number | null,
  distanceBPC?: number | null,
  distanceExposed?: number | null,
  distanceUnderground?: number | null,
  electricRoomFloorNumber?: string | null,
  electricalProtectionCost?: number | null,
  energicaMargin?: number | null,
  energicaMarginCost?: number | null,
  energicaNetCost?: number | null,
  estimateId: string,
  formId?: string | null,
  groundWebMeasurementCost?: number | null,
  hasTireStops?: boolean | null,
  installationRecipeId?: string | null,
  installedFromAppartment?: boolean | null,
  isApproved?: boolean | null,
  isHouse?: boolean | null,
  isUnderground?: boolean | null,
  manpowerCost?: number | null,
  materialsCost?: number | null,
  needsElectricPoles?: boolean | null,
  netCost?: number | null,
  numberOfBends?: number | null,
  numberOfChargers?: number | null,
  numberOfInstallers?: number | null,
  numberOfManDays?: number | null,
  numberOfWallBreaches?: number | null,
  otherInstallationCosts?: number | null,
  parkingFloorNumber?: string | null,
  preChanneledDistance?: number | null,
  stateValidation?: EstimateStateValidation | null,
  totalInstallationGross?: number | null,
  undergroundDistance?: number | null,
  vat?: number | null,
  vatPercentage?: number | null,
  vehicleBrand?: string | null,
  vehicleModel?: string | null,
};

export type ModelEstimateDetailConditionInput = {
  and?: Array< ModelEstimateDetailConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  estimateId?: ModelIDInput | null,
  installationInputId?: ModelIDInput | null,
  not?: ModelEstimateDetailConditionInput | null,
  or?: Array< ModelEstimateDetailConditionInput | null > | null,
  priceId?: ModelIDInput | null,
  productId?: ModelIDInput | null,
  quantity?: ModelFloatInput | null,
  state?: ModelEstimateDetailStateInput | null,
  totalPrice?: ModelIntInput | null,
  type?: ModelStringInput | null,
  unit?: ModelStringInput | null,
  unitPrice?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateEstimateDetailInput = {
  estimateDetailId: string,
  estimateId?: string | null,
  installationInputId?: string | null,
  priceId?: string | null,
  productId?: string | null,
  quantity?: number | null,
  state?: EstimateDetailState | null,
  totalPrice?: number | null,
  type?: string | null,
  unit?: string | null,
  unitPrice?: number | null,
};

export type ModelInstallationInputConditionInput = {
  and?: Array< ModelInstallationInputConditionInput | null > | null,
  conductorCrossSection?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  detail?: ModelStringInput | null,
  installationRecipeId?: ModelIDInput | null,
  not?: ModelInstallationInputConditionInput | null,
  or?: Array< ModelInstallationInputConditionInput | null > | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateInstallationInputInput = {
  conductorCrossSection?: number | null,
  description?: string | null,
  detail?: string | null,
  installationInputId: string,
  installationRecipeId?: string | null,
  unit?: string | null,
};

export type ModelInstallationInputRelConditionInput = {
  amountPerInstallationMeter?: ModelFloatInput | null,
  and?: Array< ModelInstallationInputRelConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelInstallationInputRelConditionInput | null,
  or?: Array< ModelInstallationInputRelConditionInput | null > | null,
  quantity?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
  usagePercentage?: ModelFloatInput | null,
};

export type CreateInstallationInputRelInput = {
  amountPerInstallationMeter?: number | null,
  installationInputId: string,
  installationRecipeId: string,
  quantity?: number | null,
  type: string,
  usagePercentage?: number | null,
};

export type ModelInstallationProductRelConditionInput = {
  and?: Array< ModelInstallationProductRelConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelInstallationProductRelConditionInput | null,
  or?: Array< ModelInstallationProductRelConditionInput | null > | null,
  quantity?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateInstallationProductRelInput = {
  installationRecipeId: string,
  productId: string,
  quantity?: number | null,
};

export type ModelInstallationRecipeConditionInput = {
  and?: Array< ModelInstallationRecipeConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  isHouse?: ModelBooleanInput | null,
  isUnderground?: ModelBooleanInput | null,
  name?: ModelStringInput | null,
  not?: ModelInstallationRecipeConditionInput | null,
  or?: Array< ModelInstallationRecipeConditionInput | null > | null,
  potence?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateInstallationRecipeInput = {
  installationRecipeId: string,
  isHouse: boolean,
  isUnderground: boolean,
  name: string,
  potence: number,
};

export type ModelMetadataConditionInput = {
  and?: Array< ModelMetadataConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  key?: ModelStringInput | null,
  not?: ModelMetadataConditionInput | null,
  or?: Array< ModelMetadataConditionInput | null > | null,
  parameterId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
};

export type CreateMetadataInput = {
  key?: string | null,
  metadataId: string,
  parameterId?: string | null,
  value?: string | null,
};

export type ModelParameterConditionInput = {
  and?: Array< ModelParameterConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  label?: ModelStringInput | null,
  not?: ModelParameterConditionInput | null,
  or?: Array< ModelParameterConditionInput | null > | null,
  parameterEncId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
};

export type CreateParameterInput = {
  label: string,
  parameterEncId?: string | null,
  parameterId: string,
  value: string,
};

export type ModelParameterEncConditionInput = {
  and?: Array< ModelParameterEncConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  not?: ModelParameterEncConditionInput | null,
  or?: Array< ModelParameterEncConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateParameterEncInput = {
  description: string,
  parameterEncId: string,
};

export type ModelPaymentTransactionConditionInput = {
  accounting_date?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelPaymentTransactionConditionInput | null > | null,
  authorization_code?: ModelStringInput | null,
  buy_order?: ModelStringInput | null,
  card_detail?: ModelStringInput | null,
  card_number?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  glosa?: ModelStringInput | null,
  installments_amount?: ModelStringInput | null,
  installments_number?: ModelStringInput | null,
  not?: ModelPaymentTransactionConditionInput | null,
  or?: Array< ModelPaymentTransactionConditionInput | null > | null,
  payment_type_code?: ModelStringInput | null,
  paymentsProcessorCommission?: ModelFloatInput | null,
  response_code?: ModelStringInput | null,
  session_id?: ModelStringInput | null,
  shoppingCartId?: ModelIDInput | null,
  status?: ModelStringInput | null,
  token?: ModelIDInput | null,
  transaction_date?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  usersPaymentTransactionsId?: ModelIDInput | null,
  vci?: ModelStringInput | null,
};

export type CreatePaymentTransactionInput = {
  accounting_date?: string | null,
  amount?: number | null,
  authorization_code?: string | null,
  buy_order?: string | null,
  card_detail?: string | null,
  card_number?: string | null,
  date?: string | null,
  glosa?: string | null,
  installments_amount?: string | null,
  installments_number?: string | null,
  paymentTransactionId: string,
  payment_type_code?: string | null,
  paymentsProcessorCommission?: number | null,
  response_code?: string | null,
  session_id?: string | null,
  shoppingCartId?: string | null,
  status?: string | null,
  token?: string | null,
  transaction_date?: string | null,
  usersPaymentTransactionsId?: string | null,
  vci?: string | null,
};

export type ModelPermissionConditionInput = {
  and?: Array< ModelPermissionConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  isLeaf?: ModelBooleanInput | null,
  isVisible?: ModelBooleanInput | null,
  name?: ModelStringInput | null,
  not?: ModelPermissionConditionInput | null,
  or?: Array< ModelPermissionConditionInput | null > | null,
  order?: ModelIntInput | null,
  padreId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePermissionInput = {
  displayName: string,
  icon: string,
  isLeaf?: boolean | null,
  isVisible?: boolean | null,
  name: string,
  order?: number | null,
  padreId?: string | null,
  permissionId: string,
};

export type ModelPermissionPerRoleConditionInput = {
  and?: Array< ModelPermissionPerRoleConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelPermissionPerRoleConditionInput | null,
  or?: Array< ModelPermissionPerRoleConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePermissionPerRoleInput = {
  permissionId: string,
  roleId: string,
};

export type ModelPriceConditionInput = {
  and?: Array< ModelPriceConditionInput | null > | null,
  cost?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  installationInputId?: ModelIDInput | null,
  not?: ModelPriceConditionInput | null,
  or?: Array< ModelPriceConditionInput | null > | null,
  productId?: ModelIDInput | null,
  startDate?: ModelStringInput | null,
  status?: ModelPriceStatusInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePriceInput = {
  cost?: number | null,
  endDate?: string | null,
  installationInputId?: string | null,
  priceId: string,
  productId?: string | null,
  startDate?: string | null,
  status?: PriceStatus | null,
};

export type ModelProductConditionInput = {
  and?: Array< ModelProductConditionInput | null > | null,
  brand?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  detail?: ModelStringInput | null,
  not?: ModelProductConditionInput | null,
  or?: Array< ModelProductConditionInput | null > | null,
  potence?: ModelFloatInput | null,
  type?: ModelStringInput | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateProductInput = {
  brand?: string | null,
  description?: string | null,
  detail?: string | null,
  potence?: number | null,
  productId: string,
  type?: string | null,
  unit?: string | null,
};

export type ModelRoleConditionInput = {
  and?: Array< ModelRoleConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelRoleConditionInput | null,
  or?: Array< ModelRoleConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateRoleInput = {
  displayName: string,
  icon: string,
  name: string,
  roleId: string,
};

export type ModelShoppingCartConditionInput = {
  and?: Array< ModelShoppingCartConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  estimateId?: ModelIDInput | null,
  not?: ModelShoppingCartConditionInput | null,
  or?: Array< ModelShoppingCartConditionInput | null > | null,
  paymentMethod?: ModelShoppingCartPaymentMethodInput | null,
  paymentTransactionId?: ModelIDInput | null,
  status?: ModelShoppingCartStatusInput | null,
  totalPrice?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  vat?: ModelIntInput | null,
};

export type CreateShoppingCartInput = {
  estimateId?: string | null,
  paymentMethod?: ShoppingCartPaymentMethod | null,
  paymentTransactionId?: string | null,
  shoppingCartId: string,
  status?: ShoppingCartStatus | null,
  totalPrice?: number | null,
  vat?: number | null,
};

export type ModelShoppingCartDetailConditionInput = {
  and?: Array< ModelShoppingCartDetailConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  estimateDetailId?: ModelIDInput | null,
  not?: ModelShoppingCartDetailConditionInput | null,
  or?: Array< ModelShoppingCartDetailConditionInput | null > | null,
  price?: ModelIntInput | null,
  priceId?: ModelIDInput | null,
  shoppingCartId?: ModelIDInput | null,
  typeOfItem?: ModelShoppingCartDetailTypeOfItemInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateShoppingCartDetailInput = {
  estimateDetailId?: string | null,
  price?: number | null,
  priceId?: string | null,
  shoppingCartDetailId: string,
  shoppingCartId?: string | null,
  typeOfItem?: ShoppingCartDetailTypeOfItem | null,
};

export type ModelSupportTicketConditionInput = {
  and?: Array< ModelSupportTicketConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  employeeId?: ModelIDInput | null,
  eveId?: ModelIDInput | null,
  lastModificationUser?: ModelStringInput | null,
  level?: ModelSupportTicketLevelInput | null,
  name?: ModelStringInput | null,
  not?: ModelSupportTicketConditionInput | null,
  or?: Array< ModelSupportTicketConditionInput | null > | null,
  phoneNumber?: ModelStringInput | null,
  solicitantId?: ModelIDInput | null,
  statusTicket?: ModelSupportTicketStatusTicketInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSupportTicketInput = {
  date?: string | null,
  description?: string | null,
  email?: string | null,
  employeeId?: string | null,
  eveId?: string | null,
  lastModificationUser?: string | null,
  level?: SupportTicketLevel | null,
  name?: string | null,
  phoneNumber?: string | null,
  solicitantId?: string | null,
  statusTicket?: SupportTicketStatusTicket | null,
  supportTicketId: string,
};

export type ModelTicketCommentConditionInput = {
  and?: Array< ModelTicketCommentConditionInput | null > | null,
  canClientSeeComment?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  isEnergica?: ModelBooleanInput | null,
  message?: ModelStringInput | null,
  not?: ModelTicketCommentConditionInput | null,
  or?: Array< ModelTicketCommentConditionInput | null > | null,
  supportTicketId?: ModelIDInput | null,
  typeOfUser?: ModelTicketCommentTypeOfUserInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateTicketCommentInput = {
  canClientSeeComment?: boolean | null,
  isEnergica?: boolean | null,
  message: string,
  supportTicketId?: string | null,
  ticketCommentId: string,
  typeOfUser?: TicketCommentTypeOfUser | null,
  userId: string,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  companyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  roleId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  validated?: ModelBooleanInput | null,
};

export type CreateUserInput = {
  companyId?: string | null,
  name: string,
  roleId?: string | null,
  userId: string,
  validated?: boolean | null,
};

export type DeleteCalendarVisitInput = {
  calendarId: string,
};

export type DeleteClientFormInput = {
  formId: string,
};

export type DeleteCompanyInput = {
  companyId: string,
};

export type DeleteCustomerInput = {
  id: string,
};

export type DeleteDiscountInput = {
  discountId: string,
};

export type DeleteDiscountShoppingCartInput = {
  discountId: string,
  shoppingCartId: string,
};

export type DeleteEstimateInput = {
  estimateId: string,
};

export type DeleteEstimateDetailInput = {
  estimateDetailId: string,
};

export type DeleteInstallationInputInput = {
  installationInputId: string,
};

export type DeleteInstallationInputRelInput = {
  installationInputId: string,
  installationRecipeId: string,
  type: string,
};

export type DeleteInstallationProductRelInput = {
  installationRecipeId: string,
  productId: string,
};

export type DeleteInstallationRecipeInput = {
  installationRecipeId: string,
};

export type DeleteMetadataInput = {
  metadataId: string,
};

export type DeleteParameterInput = {
  parameterId: string,
};

export type DeleteParameterEncInput = {
  parameterEncId: string,
};

export type DeletePaymentTransactionInput = {
  paymentTransactionId: string,
};

export type DeletePermissionInput = {
  permissionId: string,
};

export type DeletePermissionPerRoleInput = {
  permissionId: string,
  roleId: string,
};

export type DeletePriceInput = {
  priceId: string,
};

export type DeleteProductInput = {
  productId: string,
};

export type DeleteRoleInput = {
  roleId: string,
};

export type DeleteShoppingCartInput = {
  shoppingCartId: string,
};

export type DeleteShoppingCartDetailInput = {
  shoppingCartDetailId: string,
};

export type DeleteSupportTicketInput = {
  supportTicketId: string,
};

export type DeleteTicketCommentInput = {
  ticketCommentId: string,
};

export type DeleteUserInput = {
  userId: string,
};

export type UpdateCalendarVisitInput = {
  amount?: number | null,
  calendarId: string,
  customerId?: string | null,
  duration?: number | null,
  endDate?: string | null,
  startDate?: string | null,
  userId?: string | null,
};

export type UpdateClientFormInput = {
  customerId?: string | null,
  distance?: number | null,
  formId: string,
  isHouse?: boolean | null,
  isPortable?: boolean | null,
  isWallbox?: boolean | null,
  numberOfChargers?: number | null,
};

export type UpdateCompanyInput = {
  companyId: string,
  name?: string | null,
};

export type UpdateCustomerInput = {
  address?: string | null,
  comune?: string | null,
  customerId?: string | null,
  email?: string | null,
  id: string,
  name?: string | null,
  phone?: string | null,
};

export type UpdateDiscountInput = {
  discountId: string,
  flatAmount?: number | null,
  name?: string | null,
  percentage?: number | null,
};

export type UpdateDiscountShoppingCartInput = {
  discountId: string,
  shoppingCartId: string,
};

export type UpdateEstimateInput = {
  TE6Cost?: number | null,
  boardAndAssemblyCost?: number | null,
  cableingCost?: number | null,
  canalizationCost?: number | null,
  chargerBrand?: string | null,
  chargerCost?: number | null,
  chargerModel?: string | null,
  chargerPotence?: number | null,
  distanceBPC?: number | null,
  distanceExposed?: number | null,
  distanceUnderground?: number | null,
  electricRoomFloorNumber?: string | null,
  electricalProtectionCost?: number | null,
  energicaMargin?: number | null,
  energicaMarginCost?: number | null,
  energicaNetCost?: number | null,
  estimateId: string,
  formId?: string | null,
  groundWebMeasurementCost?: number | null,
  hasTireStops?: boolean | null,
  installationRecipeId?: string | null,
  installedFromAppartment?: boolean | null,
  isApproved?: boolean | null,
  isHouse?: boolean | null,
  isUnderground?: boolean | null,
  manpowerCost?: number | null,
  materialsCost?: number | null,
  needsElectricPoles?: boolean | null,
  netCost?: number | null,
  numberOfBends?: number | null,
  numberOfChargers?: number | null,
  numberOfInstallers?: number | null,
  numberOfManDays?: number | null,
  numberOfWallBreaches?: number | null,
  otherInstallationCosts?: number | null,
  parkingFloorNumber?: string | null,
  preChanneledDistance?: number | null,
  stateValidation?: EstimateStateValidation | null,
  totalInstallationGross?: number | null,
  undergroundDistance?: number | null,
  vat?: number | null,
  vatPercentage?: number | null,
  vehicleBrand?: string | null,
  vehicleModel?: string | null,
};

export type UpdateEstimateDetailInput = {
  estimateDetailId: string,
  estimateId?: string | null,
  installationInputId?: string | null,
  priceId?: string | null,
  productId?: string | null,
  quantity?: number | null,
  state?: EstimateDetailState | null,
  totalPrice?: number | null,
  type?: string | null,
  unit?: string | null,
  unitPrice?: number | null,
};

export type UpdateInstallationInputInput = {
  conductorCrossSection?: number | null,
  description?: string | null,
  detail?: string | null,
  installationInputId: string,
  installationRecipeId?: string | null,
  unit?: string | null,
};

export type UpdateInstallationInputRelInput = {
  amountPerInstallationMeter?: number | null,
  installationInputId: string,
  installationRecipeId: string,
  quantity?: number | null,
  type: string,
  usagePercentage?: number | null,
};

export type UpdateInstallationProductRelInput = {
  installationRecipeId: string,
  productId: string,
  quantity?: number | null,
};

export type UpdateInstallationRecipeInput = {
  installationRecipeId: string,
  isHouse?: boolean | null,
  isUnderground?: boolean | null,
  name?: string | null,
  potence?: number | null,
};

export type UpdateMetadataInput = {
  key?: string | null,
  metadataId: string,
  parameterId?: string | null,
  value?: string | null,
};

export type UpdateParameterInput = {
  label?: string | null,
  parameterEncId?: string | null,
  parameterId: string,
  value?: string | null,
};

export type UpdateParameterEncInput = {
  description?: string | null,
  parameterEncId: string,
};

export type UpdatePaymentTransactionInput = {
  accounting_date?: string | null,
  amount?: number | null,
  authorization_code?: string | null,
  buy_order?: string | null,
  card_detail?: string | null,
  card_number?: string | null,
  date?: string | null,
  glosa?: string | null,
  installments_amount?: string | null,
  installments_number?: string | null,
  paymentTransactionId: string,
  payment_type_code?: string | null,
  paymentsProcessorCommission?: number | null,
  response_code?: string | null,
  session_id?: string | null,
  shoppingCartId?: string | null,
  status?: string | null,
  token?: string | null,
  transaction_date?: string | null,
  usersPaymentTransactionsId?: string | null,
  vci?: string | null,
};

export type UpdatePermissionInput = {
  displayName?: string | null,
  icon?: string | null,
  isLeaf?: boolean | null,
  isVisible?: boolean | null,
  name?: string | null,
  order?: number | null,
  padreId?: string | null,
  permissionId: string,
};

export type UpdatePermissionPerRoleInput = {
  permissionId: string,
  roleId: string,
};

export type UpdatePriceInput = {
  cost?: number | null,
  endDate?: string | null,
  installationInputId?: string | null,
  priceId: string,
  productId?: string | null,
  startDate?: string | null,
  status?: PriceStatus | null,
};

export type UpdateProductInput = {
  brand?: string | null,
  description?: string | null,
  detail?: string | null,
  potence?: number | null,
  productId: string,
  type?: string | null,
  unit?: string | null,
};

export type UpdateRoleInput = {
  displayName?: string | null,
  icon?: string | null,
  name?: string | null,
  roleId: string,
};

export type UpdateShoppingCartInput = {
  estimateId?: string | null,
  paymentMethod?: ShoppingCartPaymentMethod | null,
  paymentTransactionId?: string | null,
  shoppingCartId: string,
  status?: ShoppingCartStatus | null,
  totalPrice?: number | null,
  vat?: number | null,
};

export type UpdateShoppingCartDetailInput = {
  estimateDetailId?: string | null,
  price?: number | null,
  priceId?: string | null,
  shoppingCartDetailId: string,
  shoppingCartId?: string | null,
  typeOfItem?: ShoppingCartDetailTypeOfItem | null,
};

export type UpdateSupportTicketInput = {
  date?: string | null,
  description?: string | null,
  email?: string | null,
  employeeId?: string | null,
  eveId?: string | null,
  lastModificationUser?: string | null,
  level?: SupportTicketLevel | null,
  name?: string | null,
  phoneNumber?: string | null,
  solicitantId?: string | null,
  statusTicket?: SupportTicketStatusTicket | null,
  supportTicketId: string,
};

export type UpdateTicketCommentInput = {
  canClientSeeComment?: boolean | null,
  isEnergica?: boolean | null,
  message?: string | null,
  supportTicketId?: string | null,
  ticketCommentId: string,
  typeOfUser?: TicketCommentTypeOfUser | null,
  userId?: string | null,
};

export type UpdateUserInput = {
  companyId?: string | null,
  name?: string | null,
  roleId?: string | null,
  userId: string,
  validated?: boolean | null,
};

export type WebpayCommitReturnType = {
  __typename: "WebpayCommitReturnType",
  buy_order?: string | null,
  email?: string | null,
  message: string,
};

export type WebpayStartReturnType = {
  __typename: "WebpayStartReturnType",
  order?: string | null,
  token?: string | null,
  url?: string | null,
};

export type WebpayStatusReturnType = {
  __typename: "WebpayStatusReturnType",
  amount?: number | null,
  buy_order?: string | null,
  card_number?: string | null,
  email?: string | null,
  glosa?: string | null,
  message?: string | null,
  paymentTransactionId?: string | null,
  payment_type_code?: string | null,
  status?: string | null,
  usersPaymentTransactionsId?: string | null,
};

export type ModelSubscriptionCalendarVisitFilterInput = {
  amount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionCalendarVisitFilterInput | null > | null,
  calendarId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  customerId?: ModelSubscriptionIDInput | null,
  duration?: ModelSubscriptionIntInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionCalendarVisitFilterInput | null > | null,
  startDate?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionClientFormFilterInput = {
  and?: Array< ModelSubscriptionClientFormFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  customerId?: ModelSubscriptionIDInput | null,
  distance?: ModelSubscriptionFloatInput | null,
  formId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  isHouse?: ModelSubscriptionBooleanInput | null,
  isPortable?: ModelSubscriptionBooleanInput | null,
  isWallbox?: ModelSubscriptionBooleanInput | null,
  numberOfChargers?: ModelSubscriptionIntInput | null,
  or?: Array< ModelSubscriptionClientFormFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionCompanyFilterInput = {
  and?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
  companyId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCustomerFilterInput = {
  address?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  comune?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  customerId?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  phone?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionDiscountFilterInput = {
  and?: Array< ModelSubscriptionDiscountFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  discountId?: ModelSubscriptionIDInput | null,
  flatAmount?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionDiscountFilterInput | null > | null,
  percentage?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionDiscountShoppingCartFilterInput = {
  and?: Array< ModelSubscriptionDiscountShoppingCartFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  discountId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionDiscountShoppingCartFilterInput | null > | null,
  shoppingCartId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionEstimateFilterInput = {
  TE6Cost?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionEstimateFilterInput | null > | null,
  boardAndAssemblyCost?: ModelSubscriptionIntInput | null,
  cableingCost?: ModelSubscriptionIntInput | null,
  canalizationCost?: ModelSubscriptionIntInput | null,
  chargerBrand?: ModelSubscriptionStringInput | null,
  chargerCost?: ModelSubscriptionIntInput | null,
  chargerModel?: ModelSubscriptionStringInput | null,
  chargerPotence?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  distanceBPC?: ModelSubscriptionFloatInput | null,
  distanceExposed?: ModelSubscriptionFloatInput | null,
  distanceUnderground?: ModelSubscriptionFloatInput | null,
  electricRoomFloorNumber?: ModelSubscriptionStringInput | null,
  electricalProtectionCost?: ModelSubscriptionIntInput | null,
  energicaMargin?: ModelSubscriptionFloatInput | null,
  energicaMarginCost?: ModelSubscriptionIntInput | null,
  energicaNetCost?: ModelSubscriptionIntInput | null,
  estimateId?: ModelSubscriptionIDInput | null,
  formId?: ModelSubscriptionIDInput | null,
  groundWebMeasurementCost?: ModelSubscriptionIntInput | null,
  hasTireStops?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  installationRecipeId?: ModelSubscriptionIDInput | null,
  installedFromAppartment?: ModelSubscriptionBooleanInput | null,
  isApproved?: ModelSubscriptionBooleanInput | null,
  isHouse?: ModelSubscriptionBooleanInput | null,
  isUnderground?: ModelSubscriptionBooleanInput | null,
  manpowerCost?: ModelSubscriptionIntInput | null,
  materialsCost?: ModelSubscriptionIntInput | null,
  needsElectricPoles?: ModelSubscriptionBooleanInput | null,
  netCost?: ModelSubscriptionIntInput | null,
  numberOfBends?: ModelSubscriptionIntInput | null,
  numberOfChargers?: ModelSubscriptionIntInput | null,
  numberOfInstallers?: ModelSubscriptionIntInput | null,
  numberOfManDays?: ModelSubscriptionFloatInput | null,
  numberOfWallBreaches?: ModelSubscriptionIntInput | null,
  or?: Array< ModelSubscriptionEstimateFilterInput | null > | null,
  otherInstallationCosts?: ModelSubscriptionIntInput | null,
  parkingFloorNumber?: ModelSubscriptionStringInput | null,
  preChanneledDistance?: ModelSubscriptionFloatInput | null,
  stateValidation?: ModelSubscriptionStringInput | null,
  totalInstallationGross?: ModelSubscriptionIntInput | null,
  undergroundDistance?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  vat?: ModelSubscriptionIntInput | null,
  vatPercentage?: ModelSubscriptionFloatInput | null,
  vehicleBrand?: ModelSubscriptionStringInput | null,
  vehicleModel?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionEstimateDetailFilterInput = {
  and?: Array< ModelSubscriptionEstimateDetailFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  estimateDetailId?: ModelSubscriptionIDInput | null,
  estimateId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  installationInputId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionEstimateDetailFilterInput | null > | null,
  priceId?: ModelSubscriptionIDInput | null,
  productId?: ModelSubscriptionIDInput | null,
  quantity?: ModelSubscriptionFloatInput | null,
  state?: ModelSubscriptionStringInput | null,
  totalPrice?: ModelSubscriptionIntInput | null,
  type?: ModelSubscriptionStringInput | null,
  unit?: ModelSubscriptionStringInput | null,
  unitPrice?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionInstallationInputFilterInput = {
  and?: Array< ModelSubscriptionInstallationInputFilterInput | null > | null,
  conductorCrossSection?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  detail?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  installationInputId?: ModelSubscriptionIDInput | null,
  installationRecipeId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionInstallationInputFilterInput | null > | null,
  unit?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionInstallationInputRelFilterInput = {
  amountPerInstallationMeter?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionInstallationInputRelFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  installationInputId?: ModelSubscriptionIDInput | null,
  installationRecipeId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionInstallationInputRelFilterInput | null > | null,
  quantity?: ModelSubscriptionFloatInput | null,
  type?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  usagePercentage?: ModelSubscriptionFloatInput | null,
};

export type ModelSubscriptionInstallationProductRelFilterInput = {
  and?: Array< ModelSubscriptionInstallationProductRelFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  installationRecipeId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionInstallationProductRelFilterInput | null > | null,
  productId?: ModelSubscriptionIDInput | null,
  quantity?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionInstallationRecipeFilterInput = {
  and?: Array< ModelSubscriptionInstallationRecipeFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  installationRecipeId?: ModelSubscriptionIDInput | null,
  isHouse?: ModelSubscriptionBooleanInput | null,
  isUnderground?: ModelSubscriptionBooleanInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionInstallationRecipeFilterInput | null > | null,
  potence?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMetadataFilterInput = {
  and?: Array< ModelSubscriptionMetadataFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  key?: ModelSubscriptionStringInput | null,
  metadataId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMetadataFilterInput | null > | null,
  parameterId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionParameterFilterInput = {
  and?: Array< ModelSubscriptionParameterFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  label?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionParameterFilterInput | null > | null,
  parameterEncId?: ModelSubscriptionIDInput | null,
  parameterId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionParameterEncFilterInput = {
  and?: Array< ModelSubscriptionParameterEncFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionParameterEncFilterInput | null > | null,
  parameterEncId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPaymentTransactionFilterInput = {
  accounting_date?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionPaymentTransactionFilterInput | null > | null,
  authorization_code?: ModelSubscriptionStringInput | null,
  buy_order?: ModelSubscriptionStringInput | null,
  card_detail?: ModelSubscriptionStringInput | null,
  card_number?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  glosa?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  installments_amount?: ModelSubscriptionStringInput | null,
  installments_number?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionPaymentTransactionFilterInput | null > | null,
  paymentTransactionId?: ModelSubscriptionIDInput | null,
  payment_type_code?: ModelSubscriptionStringInput | null,
  paymentsProcessorCommission?: ModelSubscriptionFloatInput | null,
  response_code?: ModelSubscriptionStringInput | null,
  session_id?: ModelSubscriptionStringInput | null,
  shoppingCartId?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  token?: ModelSubscriptionIDInput | null,
  transaction_date?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  usersPaymentTransactionsId?: ModelSubscriptionIDInput | null,
  vci?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPermissionFilterInput = {
  and?: Array< ModelSubscriptionPermissionFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  displayName?: ModelSubscriptionStringInput | null,
  icon?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isLeaf?: ModelSubscriptionBooleanInput | null,
  isVisible?: ModelSubscriptionBooleanInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionPermissionFilterInput | null > | null,
  order?: ModelSubscriptionIntInput | null,
  padreId?: ModelSubscriptionIDInput | null,
  permissionId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPermissionPerRoleFilterInput = {
  and?: Array< ModelSubscriptionPermissionPerRoleFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionPermissionPerRoleFilterInput | null > | null,
  permissionId?: ModelSubscriptionIDInput | null,
  roleId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPriceFilterInput = {
  and?: Array< ModelSubscriptionPriceFilterInput | null > | null,
  cost?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  installationInputId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionPriceFilterInput | null > | null,
  priceId?: ModelSubscriptionIDInput | null,
  productId?: ModelSubscriptionIDInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionProductFilterInput = {
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  brand?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  detail?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
  potence?: ModelSubscriptionFloatInput | null,
  productId?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  unit?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionRoleFilterInput = {
  and?: Array< ModelSubscriptionRoleFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  displayName?: ModelSubscriptionStringInput | null,
  icon?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionRoleFilterInput | null > | null,
  roleId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionShoppingCartFilterInput = {
  and?: Array< ModelSubscriptionShoppingCartFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  estimateId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionShoppingCartFilterInput | null > | null,
  paymentMethod?: ModelSubscriptionStringInput | null,
  paymentTransactionId?: ModelSubscriptionIDInput | null,
  shoppingCartId?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  totalPrice?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  vat?: ModelSubscriptionIntInput | null,
};

export type ModelSubscriptionShoppingCartDetailFilterInput = {
  and?: Array< ModelSubscriptionShoppingCartDetailFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  estimateDetailId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionShoppingCartDetailFilterInput | null > | null,
  price?: ModelSubscriptionIntInput | null,
  priceId?: ModelSubscriptionIDInput | null,
  shoppingCartDetailId?: ModelSubscriptionIDInput | null,
  shoppingCartId?: ModelSubscriptionIDInput | null,
  typeOfItem?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSupportTicketFilterInput = {
  and?: Array< ModelSubscriptionSupportTicketFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  employeeId?: ModelSubscriptionIDInput | null,
  eveId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastModificationUser?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionSupportTicketFilterInput | null > | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  solicitantId?: ModelSubscriptionIDInput | null,
  statusTicket?: ModelSubscriptionStringInput | null,
  supportTicketId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionTicketCommentFilterInput = {
  and?: Array< ModelSubscriptionTicketCommentFilterInput | null > | null,
  canClientSeeComment?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isEnergica?: ModelSubscriptionBooleanInput | null,
  message?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionTicketCommentFilterInput | null > | null,
  supportTicketId?: ModelSubscriptionIDInput | null,
  ticketCommentId?: ModelSubscriptionIDInput | null,
  typeOfUser?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  companyId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  roleId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  validated?: ModelSubscriptionBooleanInput | null,
};

export type GetCalendarVisitQueryVariables = {
  calendarId: string,
};

export type GetCalendarVisitQuery = {
  getCalendarVisit?:  {
    __typename: "CalendarVisit",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    amount?: number | null,
    calendarId: string,
    createdAt: string,
    customerId?: string | null,
    duration?: number | null,
    endDate?: string | null,
    startDate?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type GetClientFormQueryVariables = {
  formId: string,
};

export type GetClientFormQuery = {
  getClientForm?:  {
    __typename: "ClientForm",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customerId?: string | null,
    distance: number,
    formId: string,
    isHouse: boolean,
    isPortable: boolean,
    isWallbox: boolean,
    numberOfChargers?: number | null,
    updatedAt: string,
  } | null,
};

export type GetCompanyQueryVariables = {
  companyId: string,
};

export type GetCompanyQuery = {
  getCompany?:  {
    __typename: "Company",
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    companyId: string,
    createdAt: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type GetCustomerQueryVariables = {
  id: string,
};

export type GetCustomerQuery = {
  getCustomer?:  {
    __typename: "Customer",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    ClientForm?:  {
      __typename: "ModelClientFormConnection",
      nextToken?: string | null,
    } | null,
    address?: string | null,
    comune?: string | null,
    createdAt: string,
    customerId: string,
    email?: string | null,
    id: string,
    name?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type GetDiscountQueryVariables = {
  discountId: string,
};

export type GetDiscountQuery = {
  getDiscount?:  {
    __typename: "Discount",
    ShoppingCarts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    discountId: string,
    flatAmount?: number | null,
    name?: string | null,
    percentage?: number | null,
    updatedAt: string,
  } | null,
};

export type GetDiscountShoppingCartQueryVariables = {
  discountId: string,
  shoppingCartId: string,
};

export type GetDiscountShoppingCartQuery = {
  getDiscountShoppingCart?:  {
    __typename: "DiscountShoppingCart",
    Discount?:  {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    discountId: string,
    shoppingCartId: string,
    updatedAt: string,
  } | null,
};

export type GetEstimateQueryVariables = {
  estimateId: string,
};

export type GetEstimateQuery = {
  getEstimate?:  {
    __typename: "Estimate",
    ClientForm?:  {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null,
    EstimateDetail?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ModelShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    TE6Cost?: number | null,
    boardAndAssemblyCost?: number | null,
    cableingCost?: number | null,
    canalizationCost?: number | null,
    chargerBrand?: string | null,
    chargerCost?: number | null,
    chargerModel?: string | null,
    chargerPotence?: number | null,
    createdAt: string,
    distanceBPC?: number | null,
    distanceExposed?: number | null,
    distanceUnderground?: number | null,
    electricRoomFloorNumber?: string | null,
    electricalProtectionCost?: number | null,
    energicaMargin?: number | null,
    energicaMarginCost?: number | null,
    energicaNetCost?: number | null,
    estimateId: string,
    formId?: string | null,
    groundWebMeasurementCost?: number | null,
    hasTireStops?: boolean | null,
    installationRecipeId?: string | null,
    installedFromAppartment?: boolean | null,
    isApproved?: boolean | null,
    isHouse?: boolean | null,
    isUnderground?: boolean | null,
    manpowerCost?: number | null,
    materialsCost?: number | null,
    needsElectricPoles?: boolean | null,
    netCost?: number | null,
    numberOfBends?: number | null,
    numberOfChargers?: number | null,
    numberOfInstallers?: number | null,
    numberOfManDays?: number | null,
    numberOfWallBreaches?: number | null,
    otherInstallationCosts?: number | null,
    parkingFloorNumber?: string | null,
    preChanneledDistance?: number | null,
    stateValidation?: EstimateStateValidation | null,
    totalInstallationGross?: number | null,
    undergroundDistance?: number | null,
    updatedAt: string,
    vat?: number | null,
    vatPercentage?: number | null,
    vehicleBrand?: string | null,
    vehicleModel?: string | null,
  } | null,
};

export type GetEstimateDetailQueryVariables = {
  estimateDetailId: string,
};

export type GetEstimateDetailQuery = {
  getEstimateDetail?:  {
    __typename: "EstimateDetail",
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetail?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateDetailId: string,
    estimateId?: string | null,
    installationInputId?: string | null,
    priceId?: string | null,
    productId?: string | null,
    quantity?: number | null,
    state?: EstimateDetailState | null,
    totalPrice?: number | null,
    type?: string | null,
    unit?: string | null,
    unitPrice?: number | null,
    updatedAt: string,
  } | null,
};

export type GetInstallationInputQueryVariables = {
  installationInputId: string,
};

export type GetInstallationInputQuery = {
  getInstallationInput?:  {
    __typename: "InstallationInput",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    conductorCrossSection?: number | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    installationInputId: string,
    installationRecipeId?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type GetInstallationInputRelQueryVariables = {
  installationInputId: string,
  installationRecipeId: string,
  type: string,
};

export type GetInstallationInputRelQuery = {
  getInstallationInputRel?:  {
    __typename: "InstallationInputRel",
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    amountPerInstallationMeter?: number | null,
    createdAt: string,
    installationInputId: string,
    installationRecipeId: string,
    quantity?: number | null,
    type: string,
    updatedAt: string,
    usagePercentage?: number | null,
  } | null,
};

export type GetInstallationProductRelQueryVariables = {
  installationRecipeId: string,
  productId: string,
};

export type GetInstallationProductRelQuery = {
  getInstallationProductRel?:  {
    __typename: "InstallationProductRel",
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    productId: string,
    quantity?: number | null,
    updatedAt: string,
  } | null,
};

export type GetInstallationRecipeQueryVariables = {
  installationRecipeId: string,
};

export type GetInstallationRecipeQuery = {
  getInstallationRecipe?:  {
    __typename: "InstallationRecipe",
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    InstallationInputs?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    InstallationProducts?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    isHouse: boolean,
    isUnderground: boolean,
    name: string,
    potence: number,
    updatedAt: string,
  } | null,
};

export type GetMetadataQueryVariables = {
  metadataId: string,
};

export type GetMetadataQuery = {
  getMetadata?:  {
    __typename: "Metadata",
    Parameter?:  {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null,
    createdAt: string,
    key?: string | null,
    metadataId: string,
    parameterId?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type GetParameterQueryVariables = {
  parameterId: string,
};

export type GetParameterQuery = {
  getParameter?:  {
    __typename: "Parameter",
    Metadata?:  {
      __typename: "ModelMetadataConnection",
      nextToken?: string | null,
    } | null,
    ParameterEnc?:  {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    label: string,
    parameterEncId?: string | null,
    parameterId: string,
    updatedAt: string,
    value: string,
  } | null,
};

export type GetParameterEncQueryVariables = {
  parameterEncId: string,
};

export type GetParameterEncQuery = {
  getParameterEnc?:  {
    __typename: "ParameterEnc",
    Parameters?:  {
      __typename: "ModelParameterConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    description: string,
    parameterEncId: string,
    updatedAt: string,
  } | null,
};

export type GetPaymentTransactionQueryVariables = {
  paymentTransactionId: string,
};

export type GetPaymentTransactionQuery = {
  getPaymentTransaction?:  {
    __typename: "PaymentTransaction",
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    accounting_date?: string | null,
    amount?: number | null,
    authorization_code?: string | null,
    buy_order?: string | null,
    card_detail?: string | null,
    card_number?: string | null,
    createdAt: string,
    date?: string | null,
    glosa?: string | null,
    installments_amount?: string | null,
    installments_number?: string | null,
    paymentTransactionId: string,
    payment_type_code?: string | null,
    paymentsProcessorCommission?: number | null,
    response_code?: string | null,
    session_id?: string | null,
    shoppingCartId?: string | null,
    status?: string | null,
    token?: string | null,
    transaction_date?: string | null,
    updatedAt: string,
    usersPaymentTransactionsId?: string | null,
    vci?: string | null,
  } | null,
};

export type GetPermissionQueryVariables = {
  permissionId: string,
};

export type GetPermissionQuery = {
  getPermission?:  {
    __typename: "Permission",
    Padre?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    Submenu?:  {
      __typename: "ModelPermissionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    isLeaf?: boolean | null,
    isVisible?: boolean | null,
    name: string,
    order?: number | null,
    padreId?: string | null,
    permissionId: string,
    updatedAt: string,
  } | null,
};

export type GetPermissionPerRoleQueryVariables = {
  permissionId: string,
  roleId: string,
};

export type GetPermissionPerRoleQuery = {
  getPermissionPerRole?:  {
    __typename: "PermissionPerRole",
    Permissions?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    Roles?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    permissionId: string,
    roleId: string,
    updatedAt: string,
  } | null,
};

export type GetPriceQueryVariables = {
  priceId: string,
};

export type GetPriceQuery = {
  getPrice?:  {
    __typename: "Price",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    cost?: number | null,
    createdAt: string,
    endDate?: string | null,
    installationInputId?: string | null,
    priceId: string,
    productId?: string | null,
    startDate?: string | null,
    status?: PriceStatus | null,
    updatedAt: string,
  } | null,
};

export type GetProductQueryVariables = {
  productId: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    Recipes?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    brand?: string | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    potence?: number | null,
    productId: string,
    type?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type GetRoleQueryVariables = {
  roleId: string,
};

export type GetRoleQuery = {
  getRole?:  {
    __typename: "Role",
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    name: string,
    roleId: string,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetShoppingCartQueryVariables = {
  shoppingCartId: string,
};

export type GetShoppingCartQuery = {
  getShoppingCart?:  {
    __typename: "ShoppingCart",
    Discounts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    PaymentTransaction?:  {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateId?: string | null,
    paymentMethod?: ShoppingCartPaymentMethod | null,
    paymentTransactionId?: string | null,
    shoppingCartId: string,
    status?: ShoppingCartStatus | null,
    totalPrice?: number | null,
    updatedAt: string,
    vat?: number | null,
  } | null,
};

export type GetShoppingCartDetailQueryVariables = {
  shoppingCartDetailId: string,
};

export type GetShoppingCartDetailQuery = {
  getShoppingCartDetail?:  {
    __typename: "ShoppingCartDetail",
    EstimateDetail?:  {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    estimateDetailId?: string | null,
    price?: number | null,
    priceId?: string | null,
    shoppingCartDetailId: string,
    shoppingCartId?: string | null,
    typeOfItem?: ShoppingCartDetailTypeOfItem | null,
    updatedAt: string,
  } | null,
};

export type GetSupportTicketQueryVariables = {
  supportTicketId: string,
};

export type GetSupportTicketQuery = {
  getSupportTicket?:  {
    __typename: "SupportTicket",
    AssignedEmployee?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    Solicitant?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    date?: string | null,
    description?: string | null,
    email?: string | null,
    employeeId?: string | null,
    eveId?: string | null,
    lastModificationUser?: string | null,
    level?: SupportTicketLevel | null,
    name?: string | null,
    phoneNumber?: string | null,
    solicitantId?: string | null,
    statusTicket?: SupportTicketStatusTicket | null,
    supportTicketId: string,
    updatedAt: string,
  } | null,
};

export type GetTicketCommentQueryVariables = {
  ticketCommentId: string,
};

export type GetTicketCommentQuery = {
  getTicketComment?:  {
    __typename: "TicketComment",
    SupportTicket?:  {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    canClientSeeComment?: boolean | null,
    createdAt: string,
    isEnergica?: boolean | null,
    message: string,
    supportTicketId?: string | null,
    ticketCommentId: string,
    typeOfUser?: TicketCommentTypeOfUser | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type GetUserQueryVariables = {
  userId: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    Company?:  {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null,
    RequestedTickets?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    ResolveTickest?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    Role?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    companyId?: string | null,
    createdAt: string,
    name: string,
    roleId?: string | null,
    updatedAt: string,
    userId: string,
    validated?: boolean | null,
  } | null,
};

export type ListCalendarVisitsQueryVariables = {
  calendarId?: string | null,
  filter?: ModelCalendarVisitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCalendarVisitsQuery = {
  listCalendarVisits?:  {
    __typename: "ModelCalendarVisitConnection",
    items:  Array< {
      __typename: "CalendarVisit",
      amount?: number | null,
      calendarId: string,
      createdAt: string,
      customerId?: string | null,
      duration?: number | null,
      endDate?: string | null,
      startDate?: string | null,
      updatedAt: string,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListClientFormsQueryVariables = {
  filter?: ModelClientFormFilterInput | null,
  formId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListClientFormsQuery = {
  listClientForms?:  {
    __typename: "ModelClientFormConnection",
    items:  Array< {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCompaniesQueryVariables = {
  companyId?: string | null,
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCompaniesQuery = {
  listCompanies?:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCustomersQueryVariables = {
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCustomersQuery = {
  listCustomers?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDiscountShoppingCartsQueryVariables = {
  discountId?: string | null,
  filter?: ModelDiscountShoppingCartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  shoppingCartId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDiscountShoppingCartsQuery = {
  listDiscountShoppingCarts?:  {
    __typename: "ModelDiscountShoppingCartConnection",
    items:  Array< {
      __typename: "DiscountShoppingCart",
      createdAt: string,
      discountId: string,
      shoppingCartId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDiscountsQueryVariables = {
  discountId?: string | null,
  filter?: ModelDiscountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDiscountsQuery = {
  listDiscounts?:  {
    __typename: "ModelDiscountConnection",
    items:  Array< {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListEstimateDetailsQueryVariables = {
  estimateDetailId?: string | null,
  filter?: ModelEstimateDetailFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListEstimateDetailsQuery = {
  listEstimateDetails?:  {
    __typename: "ModelEstimateDetailConnection",
    items:  Array< {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListEstimatesQueryVariables = {
  estimateId?: string | null,
  filter?: ModelEstimateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListEstimatesQuery = {
  listEstimates?:  {
    __typename: "ModelEstimateConnection",
    items:  Array< {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInstallationInputRelsQueryVariables = {
  filter?: ModelInstallationInputRelFilterInput | null,
  installationInputId?: string | null,
  installationRecipeIdType?: ModelInstallationInputRelPrimaryCompositeKeyConditionInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListInstallationInputRelsQuery = {
  listInstallationInputRels?:  {
    __typename: "ModelInstallationInputRelConnection",
    items:  Array< {
      __typename: "InstallationInputRel",
      amountPerInstallationMeter?: number | null,
      createdAt: string,
      installationInputId: string,
      installationRecipeId: string,
      quantity?: number | null,
      type: string,
      updatedAt: string,
      usagePercentage?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInstallationInputsQueryVariables = {
  filter?: ModelInstallationInputFilterInput | null,
  installationInputId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListInstallationInputsQuery = {
  listInstallationInputs?:  {
    __typename: "ModelInstallationInputConnection",
    items:  Array< {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInstallationProductRelsQueryVariables = {
  filter?: ModelInstallationProductRelFilterInput | null,
  installationRecipeId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  productId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListInstallationProductRelsQuery = {
  listInstallationProductRels?:  {
    __typename: "ModelInstallationProductRelConnection",
    items:  Array< {
      __typename: "InstallationProductRel",
      createdAt: string,
      installationRecipeId: string,
      productId: string,
      quantity?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInstallationRecipesQueryVariables = {
  filter?: ModelInstallationRecipeFilterInput | null,
  installationRecipeId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListInstallationRecipesQuery = {
  listInstallationRecipes?:  {
    __typename: "ModelInstallationRecipeConnection",
    items:  Array< {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMetadataQueryVariables = {
  filter?: ModelMetadataFilterInput | null,
  limit?: number | null,
  metadataId?: string | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMetadataQuery = {
  listMetadata?:  {
    __typename: "ModelMetadataConnection",
    items:  Array< {
      __typename: "Metadata",
      createdAt: string,
      key?: string | null,
      metadataId: string,
      parameterId?: string | null,
      updatedAt: string,
      value?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListParameterEncsQueryVariables = {
  filter?: ModelParameterEncFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  parameterEncId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListParameterEncsQuery = {
  listParameterEncs?:  {
    __typename: "ModelParameterEncConnection",
    items:  Array< {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListParametersQueryVariables = {
  filter?: ModelParameterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  parameterId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListParametersQuery = {
  listParameters?:  {
    __typename: "ModelParameterConnection",
    items:  Array< {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPaymentTransactionByTokenQueryVariables = {
  filter?: ModelPaymentTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  token: string,
};

export type ListPaymentTransactionByTokenQuery = {
  listPaymentTransactionByToken?:  {
    __typename: "ModelPaymentTransactionConnection",
    items:  Array< {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPaymentTransactionsQueryVariables = {
  filter?: ModelPaymentTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  paymentTransactionId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPaymentTransactionsQuery = {
  listPaymentTransactions?:  {
    __typename: "ModelPaymentTransactionConnection",
    items:  Array< {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPermissionPerRolesQueryVariables = {
  filter?: ModelPermissionPerRoleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  permissionId?: ModelIDKeyConditionInput | null,
  roleId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPermissionPerRolesQuery = {
  listPermissionPerRoles?:  {
    __typename: "ModelPermissionPerRoleConnection",
    items:  Array< {
      __typename: "PermissionPerRole",
      createdAt: string,
      permissionId: string,
      roleId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPermissionsQueryVariables = {
  filter?: ModelPermissionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  permissionId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPermissionsQuery = {
  listPermissions?:  {
    __typename: "ModelPermissionConnection",
    items:  Array< {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPriceByInstallationInputIdAndStartDateQueryVariables = {
  filter?: ModelPriceFilterInput | null,
  installationInputId: string,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  startDate?: ModelStringKeyConditionInput | null,
};

export type ListPriceByInstallationInputIdAndStartDateQuery = {
  listPriceByInstallationInputIdAndStartDate?:  {
    __typename: "ModelPriceConnection",
    items:  Array< {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPriceByProductIdAndStartDateQueryVariables = {
  filter?: ModelPriceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  productId: string,
  sortDirection?: ModelSortDirection | null,
  startDate?: ModelStringKeyConditionInput | null,
};

export type ListPriceByProductIdAndStartDateQuery = {
  listPriceByProductIdAndStartDate?:  {
    __typename: "ModelPriceConnection",
    items:  Array< {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPricesQueryVariables = {
  filter?: ModelPriceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  priceId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPricesQuery = {
  listPrices?:  {
    __typename: "ModelPriceConnection",
    items:  Array< {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  productId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRolesQueryVariables = {
  filter?: ModelRoleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  roleId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRolesQuery = {
  listRoles?:  {
    __typename: "ModelRoleConnection",
    items:  Array< {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListShoppingCartDetailsQueryVariables = {
  filter?: ModelShoppingCartDetailFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  shoppingCartDetailId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListShoppingCartDetailsQuery = {
  listShoppingCartDetails?:  {
    __typename: "ModelShoppingCartDetailConnection",
    items:  Array< {
      __typename: "ShoppingCartDetail",
      createdAt: string,
      estimateDetailId?: string | null,
      price?: number | null,
      priceId?: string | null,
      shoppingCartDetailId: string,
      shoppingCartId?: string | null,
      typeOfItem?: ShoppingCartDetailTypeOfItem | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListShoppingCartsQueryVariables = {
  filter?: ModelShoppingCartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  shoppingCartId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListShoppingCartsQuery = {
  listShoppingCarts?:  {
    __typename: "ModelShoppingCartConnection",
    items:  Array< {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSupportTicketsQueryVariables = {
  filter?: ModelSupportTicketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  supportTicketId?: string | null,
};

export type ListSupportTicketsQuery = {
  listSupportTickets?:  {
    __typename: "ModelSupportTicketConnection",
    items:  Array< {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTicketCommentsQueryVariables = {
  filter?: ModelTicketCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  ticketCommentId?: string | null,
};

export type ListTicketCommentsQuery = {
  listTicketComments?:  {
    __typename: "ModelTicketCommentConnection",
    items:  Array< {
      __typename: "TicketComment",
      canClientSeeComment?: boolean | null,
      createdAt: string,
      isEnergica?: boolean | null,
      message: string,
      supportTicketId?: string | null,
      ticketCommentId: string,
      typeOfUser?: TicketCommentTypeOfUser | null,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  userId?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProcessEstimateMutationVariables = {
  formId: string,
};

export type ProcessEstimateMutation = {
  ProcessEstimate: string,
};

export type RemoveEstimateMutationVariables = {
  estimateId: string,
};

export type RemoveEstimateMutation = {
  RemoveEstimate: string,
};

export type CreateCalendarVisitMutationVariables = {
  condition?: ModelCalendarVisitConditionInput | null,
  input: CreateCalendarVisitInput,
};

export type CreateCalendarVisitMutation = {
  createCalendarVisit?:  {
    __typename: "CalendarVisit",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    amount?: number | null,
    calendarId: string,
    createdAt: string,
    customerId?: string | null,
    duration?: number | null,
    endDate?: string | null,
    startDate?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type CreateClientFormMutationVariables = {
  condition?: ModelClientFormConditionInput | null,
  input: CreateClientFormInput,
};

export type CreateClientFormMutation = {
  createClientForm?:  {
    __typename: "ClientForm",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customerId?: string | null,
    distance: number,
    formId: string,
    isHouse: boolean,
    isPortable: boolean,
    isWallbox: boolean,
    numberOfChargers?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateCompanyMutationVariables = {
  condition?: ModelCompanyConditionInput | null,
  input: CreateCompanyInput,
};

export type CreateCompanyMutation = {
  createCompany?:  {
    __typename: "Company",
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    companyId: string,
    createdAt: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type CreateCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: CreateCustomerInput,
};

export type CreateCustomerMutation = {
  createCustomer?:  {
    __typename: "Customer",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    ClientForm?:  {
      __typename: "ModelClientFormConnection",
      nextToken?: string | null,
    } | null,
    address?: string | null,
    comune?: string | null,
    createdAt: string,
    customerId: string,
    email?: string | null,
    id: string,
    name?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateDiscountMutationVariables = {
  condition?: ModelDiscountConditionInput | null,
  input: CreateDiscountInput,
};

export type CreateDiscountMutation = {
  createDiscount?:  {
    __typename: "Discount",
    ShoppingCarts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    discountId: string,
    flatAmount?: number | null,
    name?: string | null,
    percentage?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateDiscountShoppingCartMutationVariables = {
  condition?: ModelDiscountShoppingCartConditionInput | null,
  input: CreateDiscountShoppingCartInput,
};

export type CreateDiscountShoppingCartMutation = {
  createDiscountShoppingCart?:  {
    __typename: "DiscountShoppingCart",
    Discount?:  {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    discountId: string,
    shoppingCartId: string,
    updatedAt: string,
  } | null,
};

export type CreateEstimateMutationVariables = {
  condition?: ModelEstimateConditionInput | null,
  input: CreateEstimateInput,
};

export type CreateEstimateMutation = {
  createEstimate?:  {
    __typename: "Estimate",
    ClientForm?:  {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null,
    EstimateDetail?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ModelShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    TE6Cost?: number | null,
    boardAndAssemblyCost?: number | null,
    cableingCost?: number | null,
    canalizationCost?: number | null,
    chargerBrand?: string | null,
    chargerCost?: number | null,
    chargerModel?: string | null,
    chargerPotence?: number | null,
    createdAt: string,
    distanceBPC?: number | null,
    distanceExposed?: number | null,
    distanceUnderground?: number | null,
    electricRoomFloorNumber?: string | null,
    electricalProtectionCost?: number | null,
    energicaMargin?: number | null,
    energicaMarginCost?: number | null,
    energicaNetCost?: number | null,
    estimateId: string,
    formId?: string | null,
    groundWebMeasurementCost?: number | null,
    hasTireStops?: boolean | null,
    installationRecipeId?: string | null,
    installedFromAppartment?: boolean | null,
    isApproved?: boolean | null,
    isHouse?: boolean | null,
    isUnderground?: boolean | null,
    manpowerCost?: number | null,
    materialsCost?: number | null,
    needsElectricPoles?: boolean | null,
    netCost?: number | null,
    numberOfBends?: number | null,
    numberOfChargers?: number | null,
    numberOfInstallers?: number | null,
    numberOfManDays?: number | null,
    numberOfWallBreaches?: number | null,
    otherInstallationCosts?: number | null,
    parkingFloorNumber?: string | null,
    preChanneledDistance?: number | null,
    stateValidation?: EstimateStateValidation | null,
    totalInstallationGross?: number | null,
    undergroundDistance?: number | null,
    updatedAt: string,
    vat?: number | null,
    vatPercentage?: number | null,
    vehicleBrand?: string | null,
    vehicleModel?: string | null,
  } | null,
};

export type CreateEstimateDetailMutationVariables = {
  condition?: ModelEstimateDetailConditionInput | null,
  input: CreateEstimateDetailInput,
};

export type CreateEstimateDetailMutation = {
  createEstimateDetail?:  {
    __typename: "EstimateDetail",
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetail?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateDetailId: string,
    estimateId?: string | null,
    installationInputId?: string | null,
    priceId?: string | null,
    productId?: string | null,
    quantity?: number | null,
    state?: EstimateDetailState | null,
    totalPrice?: number | null,
    type?: string | null,
    unit?: string | null,
    unitPrice?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateInstallationInputMutationVariables = {
  condition?: ModelInstallationInputConditionInput | null,
  input: CreateInstallationInputInput,
};

export type CreateInstallationInputMutation = {
  createInstallationInput?:  {
    __typename: "InstallationInput",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    conductorCrossSection?: number | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    installationInputId: string,
    installationRecipeId?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateInstallationInputRelMutationVariables = {
  condition?: ModelInstallationInputRelConditionInput | null,
  input: CreateInstallationInputRelInput,
};

export type CreateInstallationInputRelMutation = {
  createInstallationInputRel?:  {
    __typename: "InstallationInputRel",
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    amountPerInstallationMeter?: number | null,
    createdAt: string,
    installationInputId: string,
    installationRecipeId: string,
    quantity?: number | null,
    type: string,
    updatedAt: string,
    usagePercentage?: number | null,
  } | null,
};

export type CreateInstallationProductRelMutationVariables = {
  condition?: ModelInstallationProductRelConditionInput | null,
  input: CreateInstallationProductRelInput,
};

export type CreateInstallationProductRelMutation = {
  createInstallationProductRel?:  {
    __typename: "InstallationProductRel",
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    productId: string,
    quantity?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateInstallationRecipeMutationVariables = {
  condition?: ModelInstallationRecipeConditionInput | null,
  input: CreateInstallationRecipeInput,
};

export type CreateInstallationRecipeMutation = {
  createInstallationRecipe?:  {
    __typename: "InstallationRecipe",
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    InstallationInputs?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    InstallationProducts?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    isHouse: boolean,
    isUnderground: boolean,
    name: string,
    potence: number,
    updatedAt: string,
  } | null,
};

export type CreateMetadataMutationVariables = {
  condition?: ModelMetadataConditionInput | null,
  input: CreateMetadataInput,
};

export type CreateMetadataMutation = {
  createMetadata?:  {
    __typename: "Metadata",
    Parameter?:  {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null,
    createdAt: string,
    key?: string | null,
    metadataId: string,
    parameterId?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type CreateParameterMutationVariables = {
  condition?: ModelParameterConditionInput | null,
  input: CreateParameterInput,
};

export type CreateParameterMutation = {
  createParameter?:  {
    __typename: "Parameter",
    Metadata?:  {
      __typename: "ModelMetadataConnection",
      nextToken?: string | null,
    } | null,
    ParameterEnc?:  {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    label: string,
    parameterEncId?: string | null,
    parameterId: string,
    updatedAt: string,
    value: string,
  } | null,
};

export type CreateParameterEncMutationVariables = {
  condition?: ModelParameterEncConditionInput | null,
  input: CreateParameterEncInput,
};

export type CreateParameterEncMutation = {
  createParameterEnc?:  {
    __typename: "ParameterEnc",
    Parameters?:  {
      __typename: "ModelParameterConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    description: string,
    parameterEncId: string,
    updatedAt: string,
  } | null,
};

export type CreatePaymentTransactionMutationVariables = {
  condition?: ModelPaymentTransactionConditionInput | null,
  input: CreatePaymentTransactionInput,
};

export type CreatePaymentTransactionMutation = {
  createPaymentTransaction?:  {
    __typename: "PaymentTransaction",
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    accounting_date?: string | null,
    amount?: number | null,
    authorization_code?: string | null,
    buy_order?: string | null,
    card_detail?: string | null,
    card_number?: string | null,
    createdAt: string,
    date?: string | null,
    glosa?: string | null,
    installments_amount?: string | null,
    installments_number?: string | null,
    paymentTransactionId: string,
    payment_type_code?: string | null,
    paymentsProcessorCommission?: number | null,
    response_code?: string | null,
    session_id?: string | null,
    shoppingCartId?: string | null,
    status?: string | null,
    token?: string | null,
    transaction_date?: string | null,
    updatedAt: string,
    usersPaymentTransactionsId?: string | null,
    vci?: string | null,
  } | null,
};

export type CreatePermissionMutationVariables = {
  condition?: ModelPermissionConditionInput | null,
  input: CreatePermissionInput,
};

export type CreatePermissionMutation = {
  createPermission?:  {
    __typename: "Permission",
    Padre?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    Submenu?:  {
      __typename: "ModelPermissionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    isLeaf?: boolean | null,
    isVisible?: boolean | null,
    name: string,
    order?: number | null,
    padreId?: string | null,
    permissionId: string,
    updatedAt: string,
  } | null,
};

export type CreatePermissionPerRoleMutationVariables = {
  condition?: ModelPermissionPerRoleConditionInput | null,
  input: CreatePermissionPerRoleInput,
};

export type CreatePermissionPerRoleMutation = {
  createPermissionPerRole?:  {
    __typename: "PermissionPerRole",
    Permissions?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    Roles?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    permissionId: string,
    roleId: string,
    updatedAt: string,
  } | null,
};

export type CreatePriceMutationVariables = {
  condition?: ModelPriceConditionInput | null,
  input: CreatePriceInput,
};

export type CreatePriceMutation = {
  createPrice?:  {
    __typename: "Price",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    cost?: number | null,
    createdAt: string,
    endDate?: string | null,
    installationInputId?: string | null,
    priceId: string,
    productId?: string | null,
    startDate?: string | null,
    status?: PriceStatus | null,
    updatedAt: string,
  } | null,
};

export type CreateProductMutationVariables = {
  condition?: ModelProductConditionInput | null,
  input: CreateProductInput,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    Recipes?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    brand?: string | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    potence?: number | null,
    productId: string,
    type?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateRoleMutationVariables = {
  condition?: ModelRoleConditionInput | null,
  input: CreateRoleInput,
};

export type CreateRoleMutation = {
  createRole?:  {
    __typename: "Role",
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    name: string,
    roleId: string,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateShoppingCartMutationVariables = {
  condition?: ModelShoppingCartConditionInput | null,
  input: CreateShoppingCartInput,
};

export type CreateShoppingCartMutation = {
  createShoppingCart?:  {
    __typename: "ShoppingCart",
    Discounts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    PaymentTransaction?:  {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateId?: string | null,
    paymentMethod?: ShoppingCartPaymentMethod | null,
    paymentTransactionId?: string | null,
    shoppingCartId: string,
    status?: ShoppingCartStatus | null,
    totalPrice?: number | null,
    updatedAt: string,
    vat?: number | null,
  } | null,
};

export type CreateShoppingCartDetailMutationVariables = {
  condition?: ModelShoppingCartDetailConditionInput | null,
  input: CreateShoppingCartDetailInput,
};

export type CreateShoppingCartDetailMutation = {
  createShoppingCartDetail?:  {
    __typename: "ShoppingCartDetail",
    EstimateDetail?:  {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    estimateDetailId?: string | null,
    price?: number | null,
    priceId?: string | null,
    shoppingCartDetailId: string,
    shoppingCartId?: string | null,
    typeOfItem?: ShoppingCartDetailTypeOfItem | null,
    updatedAt: string,
  } | null,
};

export type CreateSupportTicketMutationVariables = {
  condition?: ModelSupportTicketConditionInput | null,
  input: CreateSupportTicketInput,
};

export type CreateSupportTicketMutation = {
  createSupportTicket?:  {
    __typename: "SupportTicket",
    AssignedEmployee?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    Solicitant?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    date?: string | null,
    description?: string | null,
    email?: string | null,
    employeeId?: string | null,
    eveId?: string | null,
    lastModificationUser?: string | null,
    level?: SupportTicketLevel | null,
    name?: string | null,
    phoneNumber?: string | null,
    solicitantId?: string | null,
    statusTicket?: SupportTicketStatusTicket | null,
    supportTicketId: string,
    updatedAt: string,
  } | null,
};

export type CreateTicketCommentMutationVariables = {
  condition?: ModelTicketCommentConditionInput | null,
  input: CreateTicketCommentInput,
};

export type CreateTicketCommentMutation = {
  createTicketComment?:  {
    __typename: "TicketComment",
    SupportTicket?:  {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    canClientSeeComment?: boolean | null,
    createdAt: string,
    isEnergica?: boolean | null,
    message: string,
    supportTicketId?: string | null,
    ticketCommentId: string,
    typeOfUser?: TicketCommentTypeOfUser | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    Company?:  {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null,
    RequestedTickets?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    ResolveTickest?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    Role?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    companyId?: string | null,
    createdAt: string,
    name: string,
    roleId?: string | null,
    updatedAt: string,
    userId: string,
    validated?: boolean | null,
  } | null,
};

export type DeleteCalendarVisitMutationVariables = {
  condition?: ModelCalendarVisitConditionInput | null,
  input: DeleteCalendarVisitInput,
};

export type DeleteCalendarVisitMutation = {
  deleteCalendarVisit?:  {
    __typename: "CalendarVisit",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    amount?: number | null,
    calendarId: string,
    createdAt: string,
    customerId?: string | null,
    duration?: number | null,
    endDate?: string | null,
    startDate?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type DeleteClientFormMutationVariables = {
  condition?: ModelClientFormConditionInput | null,
  input: DeleteClientFormInput,
};

export type DeleteClientFormMutation = {
  deleteClientForm?:  {
    __typename: "ClientForm",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customerId?: string | null,
    distance: number,
    formId: string,
    isHouse: boolean,
    isPortable: boolean,
    isWallbox: boolean,
    numberOfChargers?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  condition?: ModelCompanyConditionInput | null,
  input: DeleteCompanyInput,
};

export type DeleteCompanyMutation = {
  deleteCompany?:  {
    __typename: "Company",
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    companyId: string,
    createdAt: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type DeleteCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: DeleteCustomerInput,
};

export type DeleteCustomerMutation = {
  deleteCustomer?:  {
    __typename: "Customer",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    ClientForm?:  {
      __typename: "ModelClientFormConnection",
      nextToken?: string | null,
    } | null,
    address?: string | null,
    comune?: string | null,
    createdAt: string,
    customerId: string,
    email?: string | null,
    id: string,
    name?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteDiscountMutationVariables = {
  condition?: ModelDiscountConditionInput | null,
  input: DeleteDiscountInput,
};

export type DeleteDiscountMutation = {
  deleteDiscount?:  {
    __typename: "Discount",
    ShoppingCarts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    discountId: string,
    flatAmount?: number | null,
    name?: string | null,
    percentage?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteDiscountShoppingCartMutationVariables = {
  condition?: ModelDiscountShoppingCartConditionInput | null,
  input: DeleteDiscountShoppingCartInput,
};

export type DeleteDiscountShoppingCartMutation = {
  deleteDiscountShoppingCart?:  {
    __typename: "DiscountShoppingCart",
    Discount?:  {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    discountId: string,
    shoppingCartId: string,
    updatedAt: string,
  } | null,
};

export type DeleteEstimateMutationVariables = {
  condition?: ModelEstimateConditionInput | null,
  input: DeleteEstimateInput,
};

export type DeleteEstimateMutation = {
  deleteEstimate?:  {
    __typename: "Estimate",
    ClientForm?:  {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null,
    EstimateDetail?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ModelShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    TE6Cost?: number | null,
    boardAndAssemblyCost?: number | null,
    cableingCost?: number | null,
    canalizationCost?: number | null,
    chargerBrand?: string | null,
    chargerCost?: number | null,
    chargerModel?: string | null,
    chargerPotence?: number | null,
    createdAt: string,
    distanceBPC?: number | null,
    distanceExposed?: number | null,
    distanceUnderground?: number | null,
    electricRoomFloorNumber?: string | null,
    electricalProtectionCost?: number | null,
    energicaMargin?: number | null,
    energicaMarginCost?: number | null,
    energicaNetCost?: number | null,
    estimateId: string,
    formId?: string | null,
    groundWebMeasurementCost?: number | null,
    hasTireStops?: boolean | null,
    installationRecipeId?: string | null,
    installedFromAppartment?: boolean | null,
    isApproved?: boolean | null,
    isHouse?: boolean | null,
    isUnderground?: boolean | null,
    manpowerCost?: number | null,
    materialsCost?: number | null,
    needsElectricPoles?: boolean | null,
    netCost?: number | null,
    numberOfBends?: number | null,
    numberOfChargers?: number | null,
    numberOfInstallers?: number | null,
    numberOfManDays?: number | null,
    numberOfWallBreaches?: number | null,
    otherInstallationCosts?: number | null,
    parkingFloorNumber?: string | null,
    preChanneledDistance?: number | null,
    stateValidation?: EstimateStateValidation | null,
    totalInstallationGross?: number | null,
    undergroundDistance?: number | null,
    updatedAt: string,
    vat?: number | null,
    vatPercentage?: number | null,
    vehicleBrand?: string | null,
    vehicleModel?: string | null,
  } | null,
};

export type DeleteEstimateDetailMutationVariables = {
  condition?: ModelEstimateDetailConditionInput | null,
  input: DeleteEstimateDetailInput,
};

export type DeleteEstimateDetailMutation = {
  deleteEstimateDetail?:  {
    __typename: "EstimateDetail",
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetail?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateDetailId: string,
    estimateId?: string | null,
    installationInputId?: string | null,
    priceId?: string | null,
    productId?: string | null,
    quantity?: number | null,
    state?: EstimateDetailState | null,
    totalPrice?: number | null,
    type?: string | null,
    unit?: string | null,
    unitPrice?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteInstallationInputMutationVariables = {
  condition?: ModelInstallationInputConditionInput | null,
  input: DeleteInstallationInputInput,
};

export type DeleteInstallationInputMutation = {
  deleteInstallationInput?:  {
    __typename: "InstallationInput",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    conductorCrossSection?: number | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    installationInputId: string,
    installationRecipeId?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteInstallationInputRelMutationVariables = {
  condition?: ModelInstallationInputRelConditionInput | null,
  input: DeleteInstallationInputRelInput,
};

export type DeleteInstallationInputRelMutation = {
  deleteInstallationInputRel?:  {
    __typename: "InstallationInputRel",
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    amountPerInstallationMeter?: number | null,
    createdAt: string,
    installationInputId: string,
    installationRecipeId: string,
    quantity?: number | null,
    type: string,
    updatedAt: string,
    usagePercentage?: number | null,
  } | null,
};

export type DeleteInstallationProductRelMutationVariables = {
  condition?: ModelInstallationProductRelConditionInput | null,
  input: DeleteInstallationProductRelInput,
};

export type DeleteInstallationProductRelMutation = {
  deleteInstallationProductRel?:  {
    __typename: "InstallationProductRel",
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    productId: string,
    quantity?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteInstallationRecipeMutationVariables = {
  condition?: ModelInstallationRecipeConditionInput | null,
  input: DeleteInstallationRecipeInput,
};

export type DeleteInstallationRecipeMutation = {
  deleteInstallationRecipe?:  {
    __typename: "InstallationRecipe",
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    InstallationInputs?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    InstallationProducts?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    isHouse: boolean,
    isUnderground: boolean,
    name: string,
    potence: number,
    updatedAt: string,
  } | null,
};

export type DeleteMetadataMutationVariables = {
  condition?: ModelMetadataConditionInput | null,
  input: DeleteMetadataInput,
};

export type DeleteMetadataMutation = {
  deleteMetadata?:  {
    __typename: "Metadata",
    Parameter?:  {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null,
    createdAt: string,
    key?: string | null,
    metadataId: string,
    parameterId?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type DeleteParameterMutationVariables = {
  condition?: ModelParameterConditionInput | null,
  input: DeleteParameterInput,
};

export type DeleteParameterMutation = {
  deleteParameter?:  {
    __typename: "Parameter",
    Metadata?:  {
      __typename: "ModelMetadataConnection",
      nextToken?: string | null,
    } | null,
    ParameterEnc?:  {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    label: string,
    parameterEncId?: string | null,
    parameterId: string,
    updatedAt: string,
    value: string,
  } | null,
};

export type DeleteParameterEncMutationVariables = {
  condition?: ModelParameterEncConditionInput | null,
  input: DeleteParameterEncInput,
};

export type DeleteParameterEncMutation = {
  deleteParameterEnc?:  {
    __typename: "ParameterEnc",
    Parameters?:  {
      __typename: "ModelParameterConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    description: string,
    parameterEncId: string,
    updatedAt: string,
  } | null,
};

export type DeletePaymentTransactionMutationVariables = {
  condition?: ModelPaymentTransactionConditionInput | null,
  input: DeletePaymentTransactionInput,
};

export type DeletePaymentTransactionMutation = {
  deletePaymentTransaction?:  {
    __typename: "PaymentTransaction",
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    accounting_date?: string | null,
    amount?: number | null,
    authorization_code?: string | null,
    buy_order?: string | null,
    card_detail?: string | null,
    card_number?: string | null,
    createdAt: string,
    date?: string | null,
    glosa?: string | null,
    installments_amount?: string | null,
    installments_number?: string | null,
    paymentTransactionId: string,
    payment_type_code?: string | null,
    paymentsProcessorCommission?: number | null,
    response_code?: string | null,
    session_id?: string | null,
    shoppingCartId?: string | null,
    status?: string | null,
    token?: string | null,
    transaction_date?: string | null,
    updatedAt: string,
    usersPaymentTransactionsId?: string | null,
    vci?: string | null,
  } | null,
};

export type DeletePermissionMutationVariables = {
  condition?: ModelPermissionConditionInput | null,
  input: DeletePermissionInput,
};

export type DeletePermissionMutation = {
  deletePermission?:  {
    __typename: "Permission",
    Padre?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    Submenu?:  {
      __typename: "ModelPermissionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    isLeaf?: boolean | null,
    isVisible?: boolean | null,
    name: string,
    order?: number | null,
    padreId?: string | null,
    permissionId: string,
    updatedAt: string,
  } | null,
};

export type DeletePermissionPerRoleMutationVariables = {
  condition?: ModelPermissionPerRoleConditionInput | null,
  input: DeletePermissionPerRoleInput,
};

export type DeletePermissionPerRoleMutation = {
  deletePermissionPerRole?:  {
    __typename: "PermissionPerRole",
    Permissions?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    Roles?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    permissionId: string,
    roleId: string,
    updatedAt: string,
  } | null,
};

export type DeletePriceMutationVariables = {
  condition?: ModelPriceConditionInput | null,
  input: DeletePriceInput,
};

export type DeletePriceMutation = {
  deletePrice?:  {
    __typename: "Price",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    cost?: number | null,
    createdAt: string,
    endDate?: string | null,
    installationInputId?: string | null,
    priceId: string,
    productId?: string | null,
    startDate?: string | null,
    status?: PriceStatus | null,
    updatedAt: string,
  } | null,
};

export type DeleteProductMutationVariables = {
  condition?: ModelProductConditionInput | null,
  input: DeleteProductInput,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    Recipes?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    brand?: string | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    potence?: number | null,
    productId: string,
    type?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteRoleMutationVariables = {
  condition?: ModelRoleConditionInput | null,
  input: DeleteRoleInput,
};

export type DeleteRoleMutation = {
  deleteRole?:  {
    __typename: "Role",
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    name: string,
    roleId: string,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteShoppingCartMutationVariables = {
  condition?: ModelShoppingCartConditionInput | null,
  input: DeleteShoppingCartInput,
};

export type DeleteShoppingCartMutation = {
  deleteShoppingCart?:  {
    __typename: "ShoppingCart",
    Discounts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    PaymentTransaction?:  {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateId?: string | null,
    paymentMethod?: ShoppingCartPaymentMethod | null,
    paymentTransactionId?: string | null,
    shoppingCartId: string,
    status?: ShoppingCartStatus | null,
    totalPrice?: number | null,
    updatedAt: string,
    vat?: number | null,
  } | null,
};

export type DeleteShoppingCartDetailMutationVariables = {
  condition?: ModelShoppingCartDetailConditionInput | null,
  input: DeleteShoppingCartDetailInput,
};

export type DeleteShoppingCartDetailMutation = {
  deleteShoppingCartDetail?:  {
    __typename: "ShoppingCartDetail",
    EstimateDetail?:  {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    estimateDetailId?: string | null,
    price?: number | null,
    priceId?: string | null,
    shoppingCartDetailId: string,
    shoppingCartId?: string | null,
    typeOfItem?: ShoppingCartDetailTypeOfItem | null,
    updatedAt: string,
  } | null,
};

export type DeleteSupportTicketMutationVariables = {
  condition?: ModelSupportTicketConditionInput | null,
  input: DeleteSupportTicketInput,
};

export type DeleteSupportTicketMutation = {
  deleteSupportTicket?:  {
    __typename: "SupportTicket",
    AssignedEmployee?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    Solicitant?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    date?: string | null,
    description?: string | null,
    email?: string | null,
    employeeId?: string | null,
    eveId?: string | null,
    lastModificationUser?: string | null,
    level?: SupportTicketLevel | null,
    name?: string | null,
    phoneNumber?: string | null,
    solicitantId?: string | null,
    statusTicket?: SupportTicketStatusTicket | null,
    supportTicketId: string,
    updatedAt: string,
  } | null,
};

export type DeleteTicketCommentMutationVariables = {
  condition?: ModelTicketCommentConditionInput | null,
  input: DeleteTicketCommentInput,
};

export type DeleteTicketCommentMutation = {
  deleteTicketComment?:  {
    __typename: "TicketComment",
    SupportTicket?:  {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    canClientSeeComment?: boolean | null,
    createdAt: string,
    isEnergica?: boolean | null,
    message: string,
    supportTicketId?: string | null,
    ticketCommentId: string,
    typeOfUser?: TicketCommentTypeOfUser | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    Company?:  {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null,
    RequestedTickets?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    ResolveTickest?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    Role?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    companyId?: string | null,
    createdAt: string,
    name: string,
    roleId?: string | null,
    updatedAt: string,
    userId: string,
    validated?: boolean | null,
  } | null,
};

export type UpdateCalendarVisitMutationVariables = {
  condition?: ModelCalendarVisitConditionInput | null,
  input: UpdateCalendarVisitInput,
};

export type UpdateCalendarVisitMutation = {
  updateCalendarVisit?:  {
    __typename: "CalendarVisit",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    amount?: number | null,
    calendarId: string,
    createdAt: string,
    customerId?: string | null,
    duration?: number | null,
    endDate?: string | null,
    startDate?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type UpdateClientFormMutationVariables = {
  condition?: ModelClientFormConditionInput | null,
  input: UpdateClientFormInput,
};

export type UpdateClientFormMutation = {
  updateClientForm?:  {
    __typename: "ClientForm",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customerId?: string | null,
    distance: number,
    formId: string,
    isHouse: boolean,
    isPortable: boolean,
    isWallbox: boolean,
    numberOfChargers?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  condition?: ModelCompanyConditionInput | null,
  input: UpdateCompanyInput,
};

export type UpdateCompanyMutation = {
  updateCompany?:  {
    __typename: "Company",
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    companyId: string,
    createdAt: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type UpdateCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: UpdateCustomerInput,
};

export type UpdateCustomerMutation = {
  updateCustomer?:  {
    __typename: "Customer",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    ClientForm?:  {
      __typename: "ModelClientFormConnection",
      nextToken?: string | null,
    } | null,
    address?: string | null,
    comune?: string | null,
    createdAt: string,
    customerId: string,
    email?: string | null,
    id: string,
    name?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateDiscountMutationVariables = {
  condition?: ModelDiscountConditionInput | null,
  input: UpdateDiscountInput,
};

export type UpdateDiscountMutation = {
  updateDiscount?:  {
    __typename: "Discount",
    ShoppingCarts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    discountId: string,
    flatAmount?: number | null,
    name?: string | null,
    percentage?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateDiscountShoppingCartMutationVariables = {
  condition?: ModelDiscountShoppingCartConditionInput | null,
  input: UpdateDiscountShoppingCartInput,
};

export type UpdateDiscountShoppingCartMutation = {
  updateDiscountShoppingCart?:  {
    __typename: "DiscountShoppingCart",
    Discount?:  {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    discountId: string,
    shoppingCartId: string,
    updatedAt: string,
  } | null,
};

export type UpdateEstimateMutationVariables = {
  condition?: ModelEstimateConditionInput | null,
  input: UpdateEstimateInput,
};

export type UpdateEstimateMutation = {
  updateEstimate?:  {
    __typename: "Estimate",
    ClientForm?:  {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null,
    EstimateDetail?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ModelShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    TE6Cost?: number | null,
    boardAndAssemblyCost?: number | null,
    cableingCost?: number | null,
    canalizationCost?: number | null,
    chargerBrand?: string | null,
    chargerCost?: number | null,
    chargerModel?: string | null,
    chargerPotence?: number | null,
    createdAt: string,
    distanceBPC?: number | null,
    distanceExposed?: number | null,
    distanceUnderground?: number | null,
    electricRoomFloorNumber?: string | null,
    electricalProtectionCost?: number | null,
    energicaMargin?: number | null,
    energicaMarginCost?: number | null,
    energicaNetCost?: number | null,
    estimateId: string,
    formId?: string | null,
    groundWebMeasurementCost?: number | null,
    hasTireStops?: boolean | null,
    installationRecipeId?: string | null,
    installedFromAppartment?: boolean | null,
    isApproved?: boolean | null,
    isHouse?: boolean | null,
    isUnderground?: boolean | null,
    manpowerCost?: number | null,
    materialsCost?: number | null,
    needsElectricPoles?: boolean | null,
    netCost?: number | null,
    numberOfBends?: number | null,
    numberOfChargers?: number | null,
    numberOfInstallers?: number | null,
    numberOfManDays?: number | null,
    numberOfWallBreaches?: number | null,
    otherInstallationCosts?: number | null,
    parkingFloorNumber?: string | null,
    preChanneledDistance?: number | null,
    stateValidation?: EstimateStateValidation | null,
    totalInstallationGross?: number | null,
    undergroundDistance?: number | null,
    updatedAt: string,
    vat?: number | null,
    vatPercentage?: number | null,
    vehicleBrand?: string | null,
    vehicleModel?: string | null,
  } | null,
};

export type UpdateEstimateDetailMutationVariables = {
  condition?: ModelEstimateDetailConditionInput | null,
  input: UpdateEstimateDetailInput,
};

export type UpdateEstimateDetailMutation = {
  updateEstimateDetail?:  {
    __typename: "EstimateDetail",
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetail?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateDetailId: string,
    estimateId?: string | null,
    installationInputId?: string | null,
    priceId?: string | null,
    productId?: string | null,
    quantity?: number | null,
    state?: EstimateDetailState | null,
    totalPrice?: number | null,
    type?: string | null,
    unit?: string | null,
    unitPrice?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateInstallationInputMutationVariables = {
  condition?: ModelInstallationInputConditionInput | null,
  input: UpdateInstallationInputInput,
};

export type UpdateInstallationInputMutation = {
  updateInstallationInput?:  {
    __typename: "InstallationInput",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    conductorCrossSection?: number | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    installationInputId: string,
    installationRecipeId?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateInstallationInputRelMutationVariables = {
  condition?: ModelInstallationInputRelConditionInput | null,
  input: UpdateInstallationInputRelInput,
};

export type UpdateInstallationInputRelMutation = {
  updateInstallationInputRel?:  {
    __typename: "InstallationInputRel",
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    amountPerInstallationMeter?: number | null,
    createdAt: string,
    installationInputId: string,
    installationRecipeId: string,
    quantity?: number | null,
    type: string,
    updatedAt: string,
    usagePercentage?: number | null,
  } | null,
};

export type UpdateInstallationProductRelMutationVariables = {
  condition?: ModelInstallationProductRelConditionInput | null,
  input: UpdateInstallationProductRelInput,
};

export type UpdateInstallationProductRelMutation = {
  updateInstallationProductRel?:  {
    __typename: "InstallationProductRel",
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    productId: string,
    quantity?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateInstallationRecipeMutationVariables = {
  condition?: ModelInstallationRecipeConditionInput | null,
  input: UpdateInstallationRecipeInput,
};

export type UpdateInstallationRecipeMutation = {
  updateInstallationRecipe?:  {
    __typename: "InstallationRecipe",
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    InstallationInputs?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    InstallationProducts?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    isHouse: boolean,
    isUnderground: boolean,
    name: string,
    potence: number,
    updatedAt: string,
  } | null,
};

export type UpdateMetadataMutationVariables = {
  condition?: ModelMetadataConditionInput | null,
  input: UpdateMetadataInput,
};

export type UpdateMetadataMutation = {
  updateMetadata?:  {
    __typename: "Metadata",
    Parameter?:  {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null,
    createdAt: string,
    key?: string | null,
    metadataId: string,
    parameterId?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type UpdateParameterMutationVariables = {
  condition?: ModelParameterConditionInput | null,
  input: UpdateParameterInput,
};

export type UpdateParameterMutation = {
  updateParameter?:  {
    __typename: "Parameter",
    Metadata?:  {
      __typename: "ModelMetadataConnection",
      nextToken?: string | null,
    } | null,
    ParameterEnc?:  {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    label: string,
    parameterEncId?: string | null,
    parameterId: string,
    updatedAt: string,
    value: string,
  } | null,
};

export type UpdateParameterEncMutationVariables = {
  condition?: ModelParameterEncConditionInput | null,
  input: UpdateParameterEncInput,
};

export type UpdateParameterEncMutation = {
  updateParameterEnc?:  {
    __typename: "ParameterEnc",
    Parameters?:  {
      __typename: "ModelParameterConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    description: string,
    parameterEncId: string,
    updatedAt: string,
  } | null,
};

export type UpdatePaymentTransactionMutationVariables = {
  condition?: ModelPaymentTransactionConditionInput | null,
  input: UpdatePaymentTransactionInput,
};

export type UpdatePaymentTransactionMutation = {
  updatePaymentTransaction?:  {
    __typename: "PaymentTransaction",
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    accounting_date?: string | null,
    amount?: number | null,
    authorization_code?: string | null,
    buy_order?: string | null,
    card_detail?: string | null,
    card_number?: string | null,
    createdAt: string,
    date?: string | null,
    glosa?: string | null,
    installments_amount?: string | null,
    installments_number?: string | null,
    paymentTransactionId: string,
    payment_type_code?: string | null,
    paymentsProcessorCommission?: number | null,
    response_code?: string | null,
    session_id?: string | null,
    shoppingCartId?: string | null,
    status?: string | null,
    token?: string | null,
    transaction_date?: string | null,
    updatedAt: string,
    usersPaymentTransactionsId?: string | null,
    vci?: string | null,
  } | null,
};

export type UpdatePermissionMutationVariables = {
  condition?: ModelPermissionConditionInput | null,
  input: UpdatePermissionInput,
};

export type UpdatePermissionMutation = {
  updatePermission?:  {
    __typename: "Permission",
    Padre?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    Submenu?:  {
      __typename: "ModelPermissionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    isLeaf?: boolean | null,
    isVisible?: boolean | null,
    name: string,
    order?: number | null,
    padreId?: string | null,
    permissionId: string,
    updatedAt: string,
  } | null,
};

export type UpdatePermissionPerRoleMutationVariables = {
  condition?: ModelPermissionPerRoleConditionInput | null,
  input: UpdatePermissionPerRoleInput,
};

export type UpdatePermissionPerRoleMutation = {
  updatePermissionPerRole?:  {
    __typename: "PermissionPerRole",
    Permissions?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    Roles?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    permissionId: string,
    roleId: string,
    updatedAt: string,
  } | null,
};

export type UpdatePriceMutationVariables = {
  condition?: ModelPriceConditionInput | null,
  input: UpdatePriceInput,
};

export type UpdatePriceMutation = {
  updatePrice?:  {
    __typename: "Price",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    cost?: number | null,
    createdAt: string,
    endDate?: string | null,
    installationInputId?: string | null,
    priceId: string,
    productId?: string | null,
    startDate?: string | null,
    status?: PriceStatus | null,
    updatedAt: string,
  } | null,
};

export type UpdateProductMutationVariables = {
  condition?: ModelProductConditionInput | null,
  input: UpdateProductInput,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    Recipes?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    brand?: string | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    potence?: number | null,
    productId: string,
    type?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateRoleMutationVariables = {
  condition?: ModelRoleConditionInput | null,
  input: UpdateRoleInput,
};

export type UpdateRoleMutation = {
  updateRole?:  {
    __typename: "Role",
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    name: string,
    roleId: string,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateShoppingCartMutationVariables = {
  condition?: ModelShoppingCartConditionInput | null,
  input: UpdateShoppingCartInput,
};

export type UpdateShoppingCartMutation = {
  updateShoppingCart?:  {
    __typename: "ShoppingCart",
    Discounts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    PaymentTransaction?:  {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateId?: string | null,
    paymentMethod?: ShoppingCartPaymentMethod | null,
    paymentTransactionId?: string | null,
    shoppingCartId: string,
    status?: ShoppingCartStatus | null,
    totalPrice?: number | null,
    updatedAt: string,
    vat?: number | null,
  } | null,
};

export type UpdateShoppingCartDetailMutationVariables = {
  condition?: ModelShoppingCartDetailConditionInput | null,
  input: UpdateShoppingCartDetailInput,
};

export type UpdateShoppingCartDetailMutation = {
  updateShoppingCartDetail?:  {
    __typename: "ShoppingCartDetail",
    EstimateDetail?:  {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    estimateDetailId?: string | null,
    price?: number | null,
    priceId?: string | null,
    shoppingCartDetailId: string,
    shoppingCartId?: string | null,
    typeOfItem?: ShoppingCartDetailTypeOfItem | null,
    updatedAt: string,
  } | null,
};

export type UpdateSupportTicketMutationVariables = {
  condition?: ModelSupportTicketConditionInput | null,
  input: UpdateSupportTicketInput,
};

export type UpdateSupportTicketMutation = {
  updateSupportTicket?:  {
    __typename: "SupportTicket",
    AssignedEmployee?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    Solicitant?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    date?: string | null,
    description?: string | null,
    email?: string | null,
    employeeId?: string | null,
    eveId?: string | null,
    lastModificationUser?: string | null,
    level?: SupportTicketLevel | null,
    name?: string | null,
    phoneNumber?: string | null,
    solicitantId?: string | null,
    statusTicket?: SupportTicketStatusTicket | null,
    supportTicketId: string,
    updatedAt: string,
  } | null,
};

export type UpdateTicketCommentMutationVariables = {
  condition?: ModelTicketCommentConditionInput | null,
  input: UpdateTicketCommentInput,
};

export type UpdateTicketCommentMutation = {
  updateTicketComment?:  {
    __typename: "TicketComment",
    SupportTicket?:  {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    canClientSeeComment?: boolean | null,
    createdAt: string,
    isEnergica?: boolean | null,
    message: string,
    supportTicketId?: string | null,
    ticketCommentId: string,
    typeOfUser?: TicketCommentTypeOfUser | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    Company?:  {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null,
    RequestedTickets?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    ResolveTickest?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    Role?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    companyId?: string | null,
    createdAt: string,
    name: string,
    roleId?: string | null,
    updatedAt: string,
    userId: string,
    validated?: boolean | null,
  } | null,
};

export type WebpayCommitMutationVariables = {
  token: string,
};

export type WebpayCommitMutation = {
  webpayCommit?:  {
    __typename: "WebpayCommitReturnType",
    buy_order?: string | null,
    email?: string | null,
    message: string,
  } | null,
};

export type WebpayStartMutationVariables = {
  amount: number,
  glosa: string,
  userId?: string | null,
};

export type WebpayStartMutation = {
  webpayStart?:  {
    __typename: "WebpayStartReturnType",
    order?: string | null,
    token?: string | null,
    url?: string | null,
  } | null,
};

export type WebpayStatusMutationVariables = {
  token: string,
};

export type WebpayStatusMutation = {
  webpayStatus?:  {
    __typename: "WebpayStatusReturnType",
    amount?: number | null,
    buy_order?: string | null,
    card_number?: string | null,
    email?: string | null,
    glosa?: string | null,
    message?: string | null,
    paymentTransactionId?: string | null,
    payment_type_code?: string | null,
    status?: string | null,
    usersPaymentTransactionsId?: string | null,
  } | null,
};

export type OnCreateCalendarVisitSubscriptionVariables = {
  filter?: ModelSubscriptionCalendarVisitFilterInput | null,
};

export type OnCreateCalendarVisitSubscription = {
  onCreateCalendarVisit?:  {
    __typename: "CalendarVisit",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    amount?: number | null,
    calendarId: string,
    createdAt: string,
    customerId?: string | null,
    duration?: number | null,
    endDate?: string | null,
    startDate?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnCreateClientFormSubscriptionVariables = {
  filter?: ModelSubscriptionClientFormFilterInput | null,
};

export type OnCreateClientFormSubscription = {
  onCreateClientForm?:  {
    __typename: "ClientForm",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customerId?: string | null,
    distance: number,
    formId: string,
    isHouse: boolean,
    isPortable: boolean,
    isWallbox: boolean,
    numberOfChargers?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnCreateCompanySubscription = {
  onCreateCompany?:  {
    __typename: "Company",
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    companyId: string,
    createdAt: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
};

export type OnCreateCustomerSubscription = {
  onCreateCustomer?:  {
    __typename: "Customer",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    ClientForm?:  {
      __typename: "ModelClientFormConnection",
      nextToken?: string | null,
    } | null,
    address?: string | null,
    comune?: string | null,
    createdAt: string,
    customerId: string,
    email?: string | null,
    id: string,
    name?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateDiscountSubscriptionVariables = {
  filter?: ModelSubscriptionDiscountFilterInput | null,
};

export type OnCreateDiscountSubscription = {
  onCreateDiscount?:  {
    __typename: "Discount",
    ShoppingCarts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    discountId: string,
    flatAmount?: number | null,
    name?: string | null,
    percentage?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateDiscountShoppingCartSubscriptionVariables = {
  filter?: ModelSubscriptionDiscountShoppingCartFilterInput | null,
};

export type OnCreateDiscountShoppingCartSubscription = {
  onCreateDiscountShoppingCart?:  {
    __typename: "DiscountShoppingCart",
    Discount?:  {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    discountId: string,
    shoppingCartId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEstimateSubscriptionVariables = {
  filter?: ModelSubscriptionEstimateFilterInput | null,
};

export type OnCreateEstimateSubscription = {
  onCreateEstimate?:  {
    __typename: "Estimate",
    ClientForm?:  {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null,
    EstimateDetail?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ModelShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    TE6Cost?: number | null,
    boardAndAssemblyCost?: number | null,
    cableingCost?: number | null,
    canalizationCost?: number | null,
    chargerBrand?: string | null,
    chargerCost?: number | null,
    chargerModel?: string | null,
    chargerPotence?: number | null,
    createdAt: string,
    distanceBPC?: number | null,
    distanceExposed?: number | null,
    distanceUnderground?: number | null,
    electricRoomFloorNumber?: string | null,
    electricalProtectionCost?: number | null,
    energicaMargin?: number | null,
    energicaMarginCost?: number | null,
    energicaNetCost?: number | null,
    estimateId: string,
    formId?: string | null,
    groundWebMeasurementCost?: number | null,
    hasTireStops?: boolean | null,
    installationRecipeId?: string | null,
    installedFromAppartment?: boolean | null,
    isApproved?: boolean | null,
    isHouse?: boolean | null,
    isUnderground?: boolean | null,
    manpowerCost?: number | null,
    materialsCost?: number | null,
    needsElectricPoles?: boolean | null,
    netCost?: number | null,
    numberOfBends?: number | null,
    numberOfChargers?: number | null,
    numberOfInstallers?: number | null,
    numberOfManDays?: number | null,
    numberOfWallBreaches?: number | null,
    otherInstallationCosts?: number | null,
    parkingFloorNumber?: string | null,
    preChanneledDistance?: number | null,
    stateValidation?: EstimateStateValidation | null,
    totalInstallationGross?: number | null,
    undergroundDistance?: number | null,
    updatedAt: string,
    vat?: number | null,
    vatPercentage?: number | null,
    vehicleBrand?: string | null,
    vehicleModel?: string | null,
  } | null,
};

export type OnCreateEstimateDetailSubscriptionVariables = {
  filter?: ModelSubscriptionEstimateDetailFilterInput | null,
};

export type OnCreateEstimateDetailSubscription = {
  onCreateEstimateDetail?:  {
    __typename: "EstimateDetail",
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetail?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateDetailId: string,
    estimateId?: string | null,
    installationInputId?: string | null,
    priceId?: string | null,
    productId?: string | null,
    quantity?: number | null,
    state?: EstimateDetailState | null,
    totalPrice?: number | null,
    type?: string | null,
    unit?: string | null,
    unitPrice?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateInstallationInputSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationInputFilterInput | null,
};

export type OnCreateInstallationInputSubscription = {
  onCreateInstallationInput?:  {
    __typename: "InstallationInput",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    conductorCrossSection?: number | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    installationInputId: string,
    installationRecipeId?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateInstallationInputRelSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationInputRelFilterInput | null,
};

export type OnCreateInstallationInputRelSubscription = {
  onCreateInstallationInputRel?:  {
    __typename: "InstallationInputRel",
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    amountPerInstallationMeter?: number | null,
    createdAt: string,
    installationInputId: string,
    installationRecipeId: string,
    quantity?: number | null,
    type: string,
    updatedAt: string,
    usagePercentage?: number | null,
  } | null,
};

export type OnCreateInstallationProductRelSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationProductRelFilterInput | null,
};

export type OnCreateInstallationProductRelSubscription = {
  onCreateInstallationProductRel?:  {
    __typename: "InstallationProductRel",
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    productId: string,
    quantity?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateInstallationRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationRecipeFilterInput | null,
};

export type OnCreateInstallationRecipeSubscription = {
  onCreateInstallationRecipe?:  {
    __typename: "InstallationRecipe",
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    InstallationInputs?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    InstallationProducts?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    isHouse: boolean,
    isUnderground: boolean,
    name: string,
    potence: number,
    updatedAt: string,
  } | null,
};

export type OnCreateMetadataSubscriptionVariables = {
  filter?: ModelSubscriptionMetadataFilterInput | null,
};

export type OnCreateMetadataSubscription = {
  onCreateMetadata?:  {
    __typename: "Metadata",
    Parameter?:  {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null,
    createdAt: string,
    key?: string | null,
    metadataId: string,
    parameterId?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type OnCreateParameterSubscriptionVariables = {
  filter?: ModelSubscriptionParameterFilterInput | null,
};

export type OnCreateParameterSubscription = {
  onCreateParameter?:  {
    __typename: "Parameter",
    Metadata?:  {
      __typename: "ModelMetadataConnection",
      nextToken?: string | null,
    } | null,
    ParameterEnc?:  {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    label: string,
    parameterEncId?: string | null,
    parameterId: string,
    updatedAt: string,
    value: string,
  } | null,
};

export type OnCreateParameterEncSubscriptionVariables = {
  filter?: ModelSubscriptionParameterEncFilterInput | null,
};

export type OnCreateParameterEncSubscription = {
  onCreateParameterEnc?:  {
    __typename: "ParameterEnc",
    Parameters?:  {
      __typename: "ModelParameterConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    description: string,
    parameterEncId: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePaymentTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentTransactionFilterInput | null,
};

export type OnCreatePaymentTransactionSubscription = {
  onCreatePaymentTransaction?:  {
    __typename: "PaymentTransaction",
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    accounting_date?: string | null,
    amount?: number | null,
    authorization_code?: string | null,
    buy_order?: string | null,
    card_detail?: string | null,
    card_number?: string | null,
    createdAt: string,
    date?: string | null,
    glosa?: string | null,
    installments_amount?: string | null,
    installments_number?: string | null,
    paymentTransactionId: string,
    payment_type_code?: string | null,
    paymentsProcessorCommission?: number | null,
    response_code?: string | null,
    session_id?: string | null,
    shoppingCartId?: string | null,
    status?: string | null,
    token?: string | null,
    transaction_date?: string | null,
    updatedAt: string,
    usersPaymentTransactionsId?: string | null,
    vci?: string | null,
  } | null,
};

export type OnCreatePermissionSubscriptionVariables = {
  filter?: ModelSubscriptionPermissionFilterInput | null,
};

export type OnCreatePermissionSubscription = {
  onCreatePermission?:  {
    __typename: "Permission",
    Padre?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    Submenu?:  {
      __typename: "ModelPermissionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    isLeaf?: boolean | null,
    isVisible?: boolean | null,
    name: string,
    order?: number | null,
    padreId?: string | null,
    permissionId: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePermissionPerRoleSubscriptionVariables = {
  filter?: ModelSubscriptionPermissionPerRoleFilterInput | null,
};

export type OnCreatePermissionPerRoleSubscription = {
  onCreatePermissionPerRole?:  {
    __typename: "PermissionPerRole",
    Permissions?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    Roles?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    permissionId: string,
    roleId: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePriceSubscriptionVariables = {
  filter?: ModelSubscriptionPriceFilterInput | null,
};

export type OnCreatePriceSubscription = {
  onCreatePrice?:  {
    __typename: "Price",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    cost?: number | null,
    createdAt: string,
    endDate?: string | null,
    installationInputId?: string | null,
    priceId: string,
    productId?: string | null,
    startDate?: string | null,
    status?: PriceStatus | null,
    updatedAt: string,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    Recipes?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    brand?: string | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    potence?: number | null,
    productId: string,
    type?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateRoleSubscriptionVariables = {
  filter?: ModelSubscriptionRoleFilterInput | null,
};

export type OnCreateRoleSubscription = {
  onCreateRole?:  {
    __typename: "Role",
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    name: string,
    roleId: string,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateShoppingCartSubscriptionVariables = {
  filter?: ModelSubscriptionShoppingCartFilterInput | null,
};

export type OnCreateShoppingCartSubscription = {
  onCreateShoppingCart?:  {
    __typename: "ShoppingCart",
    Discounts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    PaymentTransaction?:  {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateId?: string | null,
    paymentMethod?: ShoppingCartPaymentMethod | null,
    paymentTransactionId?: string | null,
    shoppingCartId: string,
    status?: ShoppingCartStatus | null,
    totalPrice?: number | null,
    updatedAt: string,
    vat?: number | null,
  } | null,
};

export type OnCreateShoppingCartDetailSubscriptionVariables = {
  filter?: ModelSubscriptionShoppingCartDetailFilterInput | null,
};

export type OnCreateShoppingCartDetailSubscription = {
  onCreateShoppingCartDetail?:  {
    __typename: "ShoppingCartDetail",
    EstimateDetail?:  {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    estimateDetailId?: string | null,
    price?: number | null,
    priceId?: string | null,
    shoppingCartDetailId: string,
    shoppingCartId?: string | null,
    typeOfItem?: ShoppingCartDetailTypeOfItem | null,
    updatedAt: string,
  } | null,
};

export type OnCreateSupportTicketSubscriptionVariables = {
  filter?: ModelSubscriptionSupportTicketFilterInput | null,
};

export type OnCreateSupportTicketSubscription = {
  onCreateSupportTicket?:  {
    __typename: "SupportTicket",
    AssignedEmployee?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    Solicitant?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    date?: string | null,
    description?: string | null,
    email?: string | null,
    employeeId?: string | null,
    eveId?: string | null,
    lastModificationUser?: string | null,
    level?: SupportTicketLevel | null,
    name?: string | null,
    phoneNumber?: string | null,
    solicitantId?: string | null,
    statusTicket?: SupportTicketStatusTicket | null,
    supportTicketId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTicketCommentSubscriptionVariables = {
  filter?: ModelSubscriptionTicketCommentFilterInput | null,
};

export type OnCreateTicketCommentSubscription = {
  onCreateTicketComment?:  {
    __typename: "TicketComment",
    SupportTicket?:  {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    canClientSeeComment?: boolean | null,
    createdAt: string,
    isEnergica?: boolean | null,
    message: string,
    supportTicketId?: string | null,
    ticketCommentId: string,
    typeOfUser?: TicketCommentTypeOfUser | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    Company?:  {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null,
    RequestedTickets?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    ResolveTickest?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    Role?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    companyId?: string | null,
    createdAt: string,
    name: string,
    roleId?: string | null,
    updatedAt: string,
    userId: string,
    validated?: boolean | null,
  } | null,
};

export type OnDeleteCalendarVisitSubscriptionVariables = {
  filter?: ModelSubscriptionCalendarVisitFilterInput | null,
};

export type OnDeleteCalendarVisitSubscription = {
  onDeleteCalendarVisit?:  {
    __typename: "CalendarVisit",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    amount?: number | null,
    calendarId: string,
    createdAt: string,
    customerId?: string | null,
    duration?: number | null,
    endDate?: string | null,
    startDate?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnDeleteClientFormSubscriptionVariables = {
  filter?: ModelSubscriptionClientFormFilterInput | null,
};

export type OnDeleteClientFormSubscription = {
  onDeleteClientForm?:  {
    __typename: "ClientForm",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customerId?: string | null,
    distance: number,
    formId: string,
    isHouse: boolean,
    isPortable: boolean,
    isWallbox: boolean,
    numberOfChargers?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany?:  {
    __typename: "Company",
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    companyId: string,
    createdAt: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
};

export type OnDeleteCustomerSubscription = {
  onDeleteCustomer?:  {
    __typename: "Customer",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    ClientForm?:  {
      __typename: "ModelClientFormConnection",
      nextToken?: string | null,
    } | null,
    address?: string | null,
    comune?: string | null,
    createdAt: string,
    customerId: string,
    email?: string | null,
    id: string,
    name?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteDiscountSubscriptionVariables = {
  filter?: ModelSubscriptionDiscountFilterInput | null,
};

export type OnDeleteDiscountSubscription = {
  onDeleteDiscount?:  {
    __typename: "Discount",
    ShoppingCarts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    discountId: string,
    flatAmount?: number | null,
    name?: string | null,
    percentage?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteDiscountShoppingCartSubscriptionVariables = {
  filter?: ModelSubscriptionDiscountShoppingCartFilterInput | null,
};

export type OnDeleteDiscountShoppingCartSubscription = {
  onDeleteDiscountShoppingCart?:  {
    __typename: "DiscountShoppingCart",
    Discount?:  {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    discountId: string,
    shoppingCartId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEstimateSubscriptionVariables = {
  filter?: ModelSubscriptionEstimateFilterInput | null,
};

export type OnDeleteEstimateSubscription = {
  onDeleteEstimate?:  {
    __typename: "Estimate",
    ClientForm?:  {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null,
    EstimateDetail?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ModelShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    TE6Cost?: number | null,
    boardAndAssemblyCost?: number | null,
    cableingCost?: number | null,
    canalizationCost?: number | null,
    chargerBrand?: string | null,
    chargerCost?: number | null,
    chargerModel?: string | null,
    chargerPotence?: number | null,
    createdAt: string,
    distanceBPC?: number | null,
    distanceExposed?: number | null,
    distanceUnderground?: number | null,
    electricRoomFloorNumber?: string | null,
    electricalProtectionCost?: number | null,
    energicaMargin?: number | null,
    energicaMarginCost?: number | null,
    energicaNetCost?: number | null,
    estimateId: string,
    formId?: string | null,
    groundWebMeasurementCost?: number | null,
    hasTireStops?: boolean | null,
    installationRecipeId?: string | null,
    installedFromAppartment?: boolean | null,
    isApproved?: boolean | null,
    isHouse?: boolean | null,
    isUnderground?: boolean | null,
    manpowerCost?: number | null,
    materialsCost?: number | null,
    needsElectricPoles?: boolean | null,
    netCost?: number | null,
    numberOfBends?: number | null,
    numberOfChargers?: number | null,
    numberOfInstallers?: number | null,
    numberOfManDays?: number | null,
    numberOfWallBreaches?: number | null,
    otherInstallationCosts?: number | null,
    parkingFloorNumber?: string | null,
    preChanneledDistance?: number | null,
    stateValidation?: EstimateStateValidation | null,
    totalInstallationGross?: number | null,
    undergroundDistance?: number | null,
    updatedAt: string,
    vat?: number | null,
    vatPercentage?: number | null,
    vehicleBrand?: string | null,
    vehicleModel?: string | null,
  } | null,
};

export type OnDeleteEstimateDetailSubscriptionVariables = {
  filter?: ModelSubscriptionEstimateDetailFilterInput | null,
};

export type OnDeleteEstimateDetailSubscription = {
  onDeleteEstimateDetail?:  {
    __typename: "EstimateDetail",
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetail?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateDetailId: string,
    estimateId?: string | null,
    installationInputId?: string | null,
    priceId?: string | null,
    productId?: string | null,
    quantity?: number | null,
    state?: EstimateDetailState | null,
    totalPrice?: number | null,
    type?: string | null,
    unit?: string | null,
    unitPrice?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteInstallationInputSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationInputFilterInput | null,
};

export type OnDeleteInstallationInputSubscription = {
  onDeleteInstallationInput?:  {
    __typename: "InstallationInput",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    conductorCrossSection?: number | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    installationInputId: string,
    installationRecipeId?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteInstallationInputRelSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationInputRelFilterInput | null,
};

export type OnDeleteInstallationInputRelSubscription = {
  onDeleteInstallationInputRel?:  {
    __typename: "InstallationInputRel",
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    amountPerInstallationMeter?: number | null,
    createdAt: string,
    installationInputId: string,
    installationRecipeId: string,
    quantity?: number | null,
    type: string,
    updatedAt: string,
    usagePercentage?: number | null,
  } | null,
};

export type OnDeleteInstallationProductRelSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationProductRelFilterInput | null,
};

export type OnDeleteInstallationProductRelSubscription = {
  onDeleteInstallationProductRel?:  {
    __typename: "InstallationProductRel",
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    productId: string,
    quantity?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteInstallationRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationRecipeFilterInput | null,
};

export type OnDeleteInstallationRecipeSubscription = {
  onDeleteInstallationRecipe?:  {
    __typename: "InstallationRecipe",
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    InstallationInputs?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    InstallationProducts?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    isHouse: boolean,
    isUnderground: boolean,
    name: string,
    potence: number,
    updatedAt: string,
  } | null,
};

export type OnDeleteMetadataSubscriptionVariables = {
  filter?: ModelSubscriptionMetadataFilterInput | null,
};

export type OnDeleteMetadataSubscription = {
  onDeleteMetadata?:  {
    __typename: "Metadata",
    Parameter?:  {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null,
    createdAt: string,
    key?: string | null,
    metadataId: string,
    parameterId?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type OnDeleteParameterSubscriptionVariables = {
  filter?: ModelSubscriptionParameterFilterInput | null,
};

export type OnDeleteParameterSubscription = {
  onDeleteParameter?:  {
    __typename: "Parameter",
    Metadata?:  {
      __typename: "ModelMetadataConnection",
      nextToken?: string | null,
    } | null,
    ParameterEnc?:  {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    label: string,
    parameterEncId?: string | null,
    parameterId: string,
    updatedAt: string,
    value: string,
  } | null,
};

export type OnDeleteParameterEncSubscriptionVariables = {
  filter?: ModelSubscriptionParameterEncFilterInput | null,
};

export type OnDeleteParameterEncSubscription = {
  onDeleteParameterEnc?:  {
    __typename: "ParameterEnc",
    Parameters?:  {
      __typename: "ModelParameterConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    description: string,
    parameterEncId: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePaymentTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentTransactionFilterInput | null,
};

export type OnDeletePaymentTransactionSubscription = {
  onDeletePaymentTransaction?:  {
    __typename: "PaymentTransaction",
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    accounting_date?: string | null,
    amount?: number | null,
    authorization_code?: string | null,
    buy_order?: string | null,
    card_detail?: string | null,
    card_number?: string | null,
    createdAt: string,
    date?: string | null,
    glosa?: string | null,
    installments_amount?: string | null,
    installments_number?: string | null,
    paymentTransactionId: string,
    payment_type_code?: string | null,
    paymentsProcessorCommission?: number | null,
    response_code?: string | null,
    session_id?: string | null,
    shoppingCartId?: string | null,
    status?: string | null,
    token?: string | null,
    transaction_date?: string | null,
    updatedAt: string,
    usersPaymentTransactionsId?: string | null,
    vci?: string | null,
  } | null,
};

export type OnDeletePermissionSubscriptionVariables = {
  filter?: ModelSubscriptionPermissionFilterInput | null,
};

export type OnDeletePermissionSubscription = {
  onDeletePermission?:  {
    __typename: "Permission",
    Padre?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    Submenu?:  {
      __typename: "ModelPermissionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    isLeaf?: boolean | null,
    isVisible?: boolean | null,
    name: string,
    order?: number | null,
    padreId?: string | null,
    permissionId: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePermissionPerRoleSubscriptionVariables = {
  filter?: ModelSubscriptionPermissionPerRoleFilterInput | null,
};

export type OnDeletePermissionPerRoleSubscription = {
  onDeletePermissionPerRole?:  {
    __typename: "PermissionPerRole",
    Permissions?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    Roles?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    permissionId: string,
    roleId: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePriceSubscriptionVariables = {
  filter?: ModelSubscriptionPriceFilterInput | null,
};

export type OnDeletePriceSubscription = {
  onDeletePrice?:  {
    __typename: "Price",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    cost?: number | null,
    createdAt: string,
    endDate?: string | null,
    installationInputId?: string | null,
    priceId: string,
    productId?: string | null,
    startDate?: string | null,
    status?: PriceStatus | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    Recipes?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    brand?: string | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    potence?: number | null,
    productId: string,
    type?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteRoleSubscriptionVariables = {
  filter?: ModelSubscriptionRoleFilterInput | null,
};

export type OnDeleteRoleSubscription = {
  onDeleteRole?:  {
    __typename: "Role",
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    name: string,
    roleId: string,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteShoppingCartSubscriptionVariables = {
  filter?: ModelSubscriptionShoppingCartFilterInput | null,
};

export type OnDeleteShoppingCartSubscription = {
  onDeleteShoppingCart?:  {
    __typename: "ShoppingCart",
    Discounts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    PaymentTransaction?:  {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateId?: string | null,
    paymentMethod?: ShoppingCartPaymentMethod | null,
    paymentTransactionId?: string | null,
    shoppingCartId: string,
    status?: ShoppingCartStatus | null,
    totalPrice?: number | null,
    updatedAt: string,
    vat?: number | null,
  } | null,
};

export type OnDeleteShoppingCartDetailSubscriptionVariables = {
  filter?: ModelSubscriptionShoppingCartDetailFilterInput | null,
};

export type OnDeleteShoppingCartDetailSubscription = {
  onDeleteShoppingCartDetail?:  {
    __typename: "ShoppingCartDetail",
    EstimateDetail?:  {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    estimateDetailId?: string | null,
    price?: number | null,
    priceId?: string | null,
    shoppingCartDetailId: string,
    shoppingCartId?: string | null,
    typeOfItem?: ShoppingCartDetailTypeOfItem | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteSupportTicketSubscriptionVariables = {
  filter?: ModelSubscriptionSupportTicketFilterInput | null,
};

export type OnDeleteSupportTicketSubscription = {
  onDeleteSupportTicket?:  {
    __typename: "SupportTicket",
    AssignedEmployee?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    Solicitant?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    date?: string | null,
    description?: string | null,
    email?: string | null,
    employeeId?: string | null,
    eveId?: string | null,
    lastModificationUser?: string | null,
    level?: SupportTicketLevel | null,
    name?: string | null,
    phoneNumber?: string | null,
    solicitantId?: string | null,
    statusTicket?: SupportTicketStatusTicket | null,
    supportTicketId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTicketCommentSubscriptionVariables = {
  filter?: ModelSubscriptionTicketCommentFilterInput | null,
};

export type OnDeleteTicketCommentSubscription = {
  onDeleteTicketComment?:  {
    __typename: "TicketComment",
    SupportTicket?:  {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    canClientSeeComment?: boolean | null,
    createdAt: string,
    isEnergica?: boolean | null,
    message: string,
    supportTicketId?: string | null,
    ticketCommentId: string,
    typeOfUser?: TicketCommentTypeOfUser | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    Company?:  {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null,
    RequestedTickets?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    ResolveTickest?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    Role?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    companyId?: string | null,
    createdAt: string,
    name: string,
    roleId?: string | null,
    updatedAt: string,
    userId: string,
    validated?: boolean | null,
  } | null,
};

export type OnUpdateCalendarVisitSubscriptionVariables = {
  filter?: ModelSubscriptionCalendarVisitFilterInput | null,
};

export type OnUpdateCalendarVisitSubscription = {
  onUpdateCalendarVisit?:  {
    __typename: "CalendarVisit",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    amount?: number | null,
    calendarId: string,
    createdAt: string,
    customerId?: string | null,
    duration?: number | null,
    endDate?: string | null,
    startDate?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnUpdateClientFormSubscriptionVariables = {
  filter?: ModelSubscriptionClientFormFilterInput | null,
};

export type OnUpdateClientFormSubscription = {
  onUpdateClientForm?:  {
    __typename: "ClientForm",
    Customer?:  {
      __typename: "Customer",
      address?: string | null,
      comune?: string | null,
      createdAt: string,
      customerId: string,
      email?: string | null,
      id: string,
      name?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    customerId?: string | null,
    distance: number,
    formId: string,
    isHouse: boolean,
    isPortable: boolean,
    isWallbox: boolean,
    numberOfChargers?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany?:  {
    __typename: "Company",
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    companyId: string,
    createdAt: string,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
};

export type OnUpdateCustomerSubscription = {
  onUpdateCustomer?:  {
    __typename: "Customer",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    ClientForm?:  {
      __typename: "ModelClientFormConnection",
      nextToken?: string | null,
    } | null,
    address?: string | null,
    comune?: string | null,
    createdAt: string,
    customerId: string,
    email?: string | null,
    id: string,
    name?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateDiscountSubscriptionVariables = {
  filter?: ModelSubscriptionDiscountFilterInput | null,
};

export type OnUpdateDiscountSubscription = {
  onUpdateDiscount?:  {
    __typename: "Discount",
    ShoppingCarts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    discountId: string,
    flatAmount?: number | null,
    name?: string | null,
    percentage?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateDiscountShoppingCartSubscriptionVariables = {
  filter?: ModelSubscriptionDiscountShoppingCartFilterInput | null,
};

export type OnUpdateDiscountShoppingCartSubscription = {
  onUpdateDiscountShoppingCart?:  {
    __typename: "DiscountShoppingCart",
    Discount?:  {
      __typename: "Discount",
      createdAt: string,
      discountId: string,
      flatAmount?: number | null,
      name?: string | null,
      percentage?: number | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    discountId: string,
    shoppingCartId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEstimateSubscriptionVariables = {
  filter?: ModelSubscriptionEstimateFilterInput | null,
};

export type OnUpdateEstimateSubscription = {
  onUpdateEstimate?:  {
    __typename: "Estimate",
    ClientForm?:  {
      __typename: "ClientForm",
      createdAt: string,
      customerId?: string | null,
      distance: number,
      formId: string,
      isHouse: boolean,
      isPortable: boolean,
      isWallbox: boolean,
      numberOfChargers?: number | null,
      updatedAt: string,
    } | null,
    EstimateDetail?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ModelShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    TE6Cost?: number | null,
    boardAndAssemblyCost?: number | null,
    cableingCost?: number | null,
    canalizationCost?: number | null,
    chargerBrand?: string | null,
    chargerCost?: number | null,
    chargerModel?: string | null,
    chargerPotence?: number | null,
    createdAt: string,
    distanceBPC?: number | null,
    distanceExposed?: number | null,
    distanceUnderground?: number | null,
    electricRoomFloorNumber?: string | null,
    electricalProtectionCost?: number | null,
    energicaMargin?: number | null,
    energicaMarginCost?: number | null,
    energicaNetCost?: number | null,
    estimateId: string,
    formId?: string | null,
    groundWebMeasurementCost?: number | null,
    hasTireStops?: boolean | null,
    installationRecipeId?: string | null,
    installedFromAppartment?: boolean | null,
    isApproved?: boolean | null,
    isHouse?: boolean | null,
    isUnderground?: boolean | null,
    manpowerCost?: number | null,
    materialsCost?: number | null,
    needsElectricPoles?: boolean | null,
    netCost?: number | null,
    numberOfBends?: number | null,
    numberOfChargers?: number | null,
    numberOfInstallers?: number | null,
    numberOfManDays?: number | null,
    numberOfWallBreaches?: number | null,
    otherInstallationCosts?: number | null,
    parkingFloorNumber?: string | null,
    preChanneledDistance?: number | null,
    stateValidation?: EstimateStateValidation | null,
    totalInstallationGross?: number | null,
    undergroundDistance?: number | null,
    updatedAt: string,
    vat?: number | null,
    vatPercentage?: number | null,
    vehicleBrand?: string | null,
    vehicleModel?: string | null,
  } | null,
};

export type OnUpdateEstimateDetailSubscriptionVariables = {
  filter?: ModelSubscriptionEstimateDetailFilterInput | null,
};

export type OnUpdateEstimateDetailSubscription = {
  onUpdateEstimateDetail?:  {
    __typename: "EstimateDetail",
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetail?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateDetailId: string,
    estimateId?: string | null,
    installationInputId?: string | null,
    priceId?: string | null,
    productId?: string | null,
    quantity?: number | null,
    state?: EstimateDetailState | null,
    totalPrice?: number | null,
    type?: string | null,
    unit?: string | null,
    unitPrice?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateInstallationInputSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationInputFilterInput | null,
};

export type OnUpdateInstallationInputSubscription = {
  onUpdateInstallationInput?:  {
    __typename: "InstallationInput",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationRecipe?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    conductorCrossSection?: number | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    installationInputId: string,
    installationRecipeId?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateInstallationInputRelSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationInputRelFilterInput | null,
};

export type OnUpdateInstallationInputRelSubscription = {
  onUpdateInstallationInputRel?:  {
    __typename: "InstallationInputRel",
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    amountPerInstallationMeter?: number | null,
    createdAt: string,
    installationInputId: string,
    installationRecipeId: string,
    quantity?: number | null,
    type: string,
    updatedAt: string,
    usagePercentage?: number | null,
  } | null,
};

export type OnUpdateInstallationProductRelSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationProductRelFilterInput | null,
};

export type OnUpdateInstallationProductRelSubscription = {
  onUpdateInstallationProductRel?:  {
    __typename: "InstallationProductRel",
    InstallationRecipe?:  {
      __typename: "InstallationRecipe",
      createdAt: string,
      installationRecipeId: string,
      isHouse: boolean,
      isUnderground: boolean,
      name: string,
      potence: number,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    productId: string,
    quantity?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateInstallationRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionInstallationRecipeFilterInput | null,
};

export type OnUpdateInstallationRecipeSubscription = {
  onUpdateInstallationRecipe?:  {
    __typename: "InstallationRecipe",
    Estimates?:  {
      __typename: "ModelEstimateConnection",
      nextToken?: string | null,
    } | null,
    InstallationInputs?:  {
      __typename: "ModelInstallationInputRelConnection",
      nextToken?: string | null,
    } | null,
    InstallationProducts?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    installationRecipeId: string,
    isHouse: boolean,
    isUnderground: boolean,
    name: string,
    potence: number,
    updatedAt: string,
  } | null,
};

export type OnUpdateMetadataSubscriptionVariables = {
  filter?: ModelSubscriptionMetadataFilterInput | null,
};

export type OnUpdateMetadataSubscription = {
  onUpdateMetadata?:  {
    __typename: "Metadata",
    Parameter?:  {
      __typename: "Parameter",
      createdAt: string,
      label: string,
      parameterEncId?: string | null,
      parameterId: string,
      updatedAt: string,
      value: string,
    } | null,
    createdAt: string,
    key?: string | null,
    metadataId: string,
    parameterId?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type OnUpdateParameterSubscriptionVariables = {
  filter?: ModelSubscriptionParameterFilterInput | null,
};

export type OnUpdateParameterSubscription = {
  onUpdateParameter?:  {
    __typename: "Parameter",
    Metadata?:  {
      __typename: "ModelMetadataConnection",
      nextToken?: string | null,
    } | null,
    ParameterEnc?:  {
      __typename: "ParameterEnc",
      createdAt: string,
      description: string,
      parameterEncId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    label: string,
    parameterEncId?: string | null,
    parameterId: string,
    updatedAt: string,
    value: string,
  } | null,
};

export type OnUpdateParameterEncSubscriptionVariables = {
  filter?: ModelSubscriptionParameterEncFilterInput | null,
};

export type OnUpdateParameterEncSubscription = {
  onUpdateParameterEnc?:  {
    __typename: "ParameterEnc",
    Parameters?:  {
      __typename: "ModelParameterConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    description: string,
    parameterEncId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePaymentTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentTransactionFilterInput | null,
};

export type OnUpdatePaymentTransactionSubscription = {
  onUpdatePaymentTransaction?:  {
    __typename: "PaymentTransaction",
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    accounting_date?: string | null,
    amount?: number | null,
    authorization_code?: string | null,
    buy_order?: string | null,
    card_detail?: string | null,
    card_number?: string | null,
    createdAt: string,
    date?: string | null,
    glosa?: string | null,
    installments_amount?: string | null,
    installments_number?: string | null,
    paymentTransactionId: string,
    payment_type_code?: string | null,
    paymentsProcessorCommission?: number | null,
    response_code?: string | null,
    session_id?: string | null,
    shoppingCartId?: string | null,
    status?: string | null,
    token?: string | null,
    transaction_date?: string | null,
    updatedAt: string,
    usersPaymentTransactionsId?: string | null,
    vci?: string | null,
  } | null,
};

export type OnUpdatePermissionSubscriptionVariables = {
  filter?: ModelSubscriptionPermissionFilterInput | null,
};

export type OnUpdatePermissionSubscription = {
  onUpdatePermission?:  {
    __typename: "Permission",
    Padre?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    Submenu?:  {
      __typename: "ModelPermissionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    isLeaf?: boolean | null,
    isVisible?: boolean | null,
    name: string,
    order?: number | null,
    padreId?: string | null,
    permissionId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePermissionPerRoleSubscriptionVariables = {
  filter?: ModelSubscriptionPermissionPerRoleFilterInput | null,
};

export type OnUpdatePermissionPerRoleSubscription = {
  onUpdatePermissionPerRole?:  {
    __typename: "PermissionPerRole",
    Permissions?:  {
      __typename: "Permission",
      createdAt: string,
      displayName: string,
      icon: string,
      isLeaf?: boolean | null,
      isVisible?: boolean | null,
      name: string,
      order?: number | null,
      padreId?: string | null,
      permissionId: string,
      updatedAt: string,
    } | null,
    Roles?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    permissionId: string,
    roleId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePriceSubscriptionVariables = {
  filter?: ModelSubscriptionPriceFilterInput | null,
};

export type OnUpdatePriceSubscription = {
  onUpdatePrice?:  {
    __typename: "Price",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    InstallationInput?:  {
      __typename: "InstallationInput",
      conductorCrossSection?: number | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      installationInputId: string,
      installationRecipeId?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    Product?:  {
      __typename: "Product",
      brand?: string | null,
      createdAt: string,
      description?: string | null,
      detail?: string | null,
      potence?: number | null,
      productId: string,
      type?: string | null,
      unit?: string | null,
      updatedAt: string,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    cost?: number | null,
    createdAt: string,
    endDate?: string | null,
    installationInputId?: string | null,
    priceId: string,
    productId?: string | null,
    startDate?: string | null,
    status?: PriceStatus | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    EstimateDetails?:  {
      __typename: "ModelEstimateDetailConnection",
      nextToken?: string | null,
    } | null,
    Prices?:  {
      __typename: "ModelPriceConnection",
      nextToken?: string | null,
    } | null,
    Recipes?:  {
      __typename: "ModelInstallationProductRelConnection",
      nextToken?: string | null,
    } | null,
    brand?: string | null,
    createdAt: string,
    description?: string | null,
    detail?: string | null,
    potence?: number | null,
    productId: string,
    type?: string | null,
    unit?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateRoleSubscriptionVariables = {
  filter?: ModelSubscriptionRoleFilterInput | null,
};

export type OnUpdateRoleSubscription = {
  onUpdateRole?:  {
    __typename: "Role",
    PermissionPerRole?:  {
      __typename: "ModelPermissionPerRoleConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    displayName: string,
    icon: string,
    name: string,
    roleId: string,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateShoppingCartSubscriptionVariables = {
  filter?: ModelSubscriptionShoppingCartFilterInput | null,
};

export type OnUpdateShoppingCartSubscription = {
  onUpdateShoppingCart?:  {
    __typename: "ShoppingCart",
    Discounts?:  {
      __typename: "ModelDiscountShoppingCartConnection",
      nextToken?: string | null,
    } | null,
    Estimate?:  {
      __typename: "Estimate",
      TE6Cost?: number | null,
      boardAndAssemblyCost?: number | null,
      cableingCost?: number | null,
      canalizationCost?: number | null,
      chargerBrand?: string | null,
      chargerCost?: number | null,
      chargerModel?: string | null,
      chargerPotence?: number | null,
      createdAt: string,
      distanceBPC?: number | null,
      distanceExposed?: number | null,
      distanceUnderground?: number | null,
      electricRoomFloorNumber?: string | null,
      electricalProtectionCost?: number | null,
      energicaMargin?: number | null,
      energicaMarginCost?: number | null,
      energicaNetCost?: number | null,
      estimateId: string,
      formId?: string | null,
      groundWebMeasurementCost?: number | null,
      hasTireStops?: boolean | null,
      installationRecipeId?: string | null,
      installedFromAppartment?: boolean | null,
      isApproved?: boolean | null,
      isHouse?: boolean | null,
      isUnderground?: boolean | null,
      manpowerCost?: number | null,
      materialsCost?: number | null,
      needsElectricPoles?: boolean | null,
      netCost?: number | null,
      numberOfBends?: number | null,
      numberOfChargers?: number | null,
      numberOfInstallers?: number | null,
      numberOfManDays?: number | null,
      numberOfWallBreaches?: number | null,
      otherInstallationCosts?: number | null,
      parkingFloorNumber?: string | null,
      preChanneledDistance?: number | null,
      stateValidation?: EstimateStateValidation | null,
      totalInstallationGross?: number | null,
      undergroundDistance?: number | null,
      updatedAt: string,
      vat?: number | null,
      vatPercentage?: number | null,
      vehicleBrand?: string | null,
      vehicleModel?: string | null,
    } | null,
    PaymentTransaction?:  {
      __typename: "PaymentTransaction",
      accounting_date?: string | null,
      amount?: number | null,
      authorization_code?: string | null,
      buy_order?: string | null,
      card_detail?: string | null,
      card_number?: string | null,
      createdAt: string,
      date?: string | null,
      glosa?: string | null,
      installments_amount?: string | null,
      installments_number?: string | null,
      paymentTransactionId: string,
      payment_type_code?: string | null,
      paymentsProcessorCommission?: number | null,
      response_code?: string | null,
      session_id?: string | null,
      shoppingCartId?: string | null,
      status?: string | null,
      token?: string | null,
      transaction_date?: string | null,
      updatedAt: string,
      usersPaymentTransactionsId?: string | null,
      vci?: string | null,
    } | null,
    ShoppingCartDetails?:  {
      __typename: "ModelShoppingCartDetailConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    estimateId?: string | null,
    paymentMethod?: ShoppingCartPaymentMethod | null,
    paymentTransactionId?: string | null,
    shoppingCartId: string,
    status?: ShoppingCartStatus | null,
    totalPrice?: number | null,
    updatedAt: string,
    vat?: number | null,
  } | null,
};

export type OnUpdateShoppingCartDetailSubscriptionVariables = {
  filter?: ModelSubscriptionShoppingCartDetailFilterInput | null,
};

export type OnUpdateShoppingCartDetailSubscription = {
  onUpdateShoppingCartDetail?:  {
    __typename: "ShoppingCartDetail",
    EstimateDetail?:  {
      __typename: "EstimateDetail",
      createdAt: string,
      estimateDetailId: string,
      estimateId?: string | null,
      installationInputId?: string | null,
      priceId?: string | null,
      productId?: string | null,
      quantity?: number | null,
      state?: EstimateDetailState | null,
      totalPrice?: number | null,
      type?: string | null,
      unit?: string | null,
      unitPrice?: number | null,
      updatedAt: string,
    } | null,
    Price?:  {
      __typename: "Price",
      cost?: number | null,
      createdAt: string,
      endDate?: string | null,
      installationInputId?: string | null,
      priceId: string,
      productId?: string | null,
      startDate?: string | null,
      status?: PriceStatus | null,
      updatedAt: string,
    } | null,
    ShoppingCart?:  {
      __typename: "ShoppingCart",
      createdAt: string,
      estimateId?: string | null,
      paymentMethod?: ShoppingCartPaymentMethod | null,
      paymentTransactionId?: string | null,
      shoppingCartId: string,
      status?: ShoppingCartStatus | null,
      totalPrice?: number | null,
      updatedAt: string,
      vat?: number | null,
    } | null,
    createdAt: string,
    estimateDetailId?: string | null,
    price?: number | null,
    priceId?: string | null,
    shoppingCartDetailId: string,
    shoppingCartId?: string | null,
    typeOfItem?: ShoppingCartDetailTypeOfItem | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateSupportTicketSubscriptionVariables = {
  filter?: ModelSubscriptionSupportTicketFilterInput | null,
};

export type OnUpdateSupportTicketSubscription = {
  onUpdateSupportTicket?:  {
    __typename: "SupportTicket",
    AssignedEmployee?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    Solicitant?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    date?: string | null,
    description?: string | null,
    email?: string | null,
    employeeId?: string | null,
    eveId?: string | null,
    lastModificationUser?: string | null,
    level?: SupportTicketLevel | null,
    name?: string | null,
    phoneNumber?: string | null,
    solicitantId?: string | null,
    statusTicket?: SupportTicketStatusTicket | null,
    supportTicketId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTicketCommentSubscriptionVariables = {
  filter?: ModelSubscriptionTicketCommentFilterInput | null,
};

export type OnUpdateTicketCommentSubscription = {
  onUpdateTicketComment?:  {
    __typename: "TicketComment",
    SupportTicket?:  {
      __typename: "SupportTicket",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      email?: string | null,
      employeeId?: string | null,
      eveId?: string | null,
      lastModificationUser?: string | null,
      level?: SupportTicketLevel | null,
      name?: string | null,
      phoneNumber?: string | null,
      solicitantId?: string | null,
      statusTicket?: SupportTicketStatusTicket | null,
      supportTicketId: string,
      updatedAt: string,
    } | null,
    User?:  {
      __typename: "User",
      companyId?: string | null,
      createdAt: string,
      name: string,
      roleId?: string | null,
      updatedAt: string,
      userId: string,
      validated?: boolean | null,
    } | null,
    canClientSeeComment?: boolean | null,
    createdAt: string,
    isEnergica?: boolean | null,
    message: string,
    supportTicketId?: string | null,
    ticketCommentId: string,
    typeOfUser?: TicketCommentTypeOfUser | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    CalendarVisits?:  {
      __typename: "ModelCalendarVisitConnection",
      nextToken?: string | null,
    } | null,
    Company?:  {
      __typename: "Company",
      companyId: string,
      createdAt: string,
      name: string,
      updatedAt: string,
    } | null,
    RequestedTickets?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    ResolveTickest?:  {
      __typename: "ModelSupportTicketConnection",
      nextToken?: string | null,
    } | null,
    Role?:  {
      __typename: "Role",
      createdAt: string,
      displayName: string,
      icon: string,
      name: string,
      roleId: string,
      updatedAt: string,
    } | null,
    TicketComments?:  {
      __typename: "ModelTicketCommentConnection",
      nextToken?: string | null,
    } | null,
    companyId?: string | null,
    createdAt: string,
    name: string,
    roleId?: string | null,
    updatedAt: string,
    userId: string,
    validated?: boolean | null,
  } | null,
};
