/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const ProcessEstimate = /* GraphQL */ `mutation ProcessEstimate($formId: String!) {
  ProcessEstimate(formId: $formId)
}
` as GeneratedMutation<
  APITypes.ProcessEstimateMutationVariables,
  APITypes.ProcessEstimateMutation
>;
export const RemoveEstimate = /* GraphQL */ `mutation RemoveEstimate($estimateId: String!) {
  RemoveEstimate(estimateId: $estimateId)
}
` as GeneratedMutation<
  APITypes.RemoveEstimateMutationVariables,
  APITypes.RemoveEstimateMutation
>;
export const createCalendarVisit = /* GraphQL */ `mutation CreateCalendarVisit(
  $condition: ModelCalendarVisitConditionInput
  $input: CreateCalendarVisitInput!
) {
  createCalendarVisit(condition: $condition, input: $input) {
    Customer {
      address
      comune
      createdAt
      customerId
      email
      id
      name
      phone
      updatedAt
      __typename
    }
    User {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    amount
    calendarId
    createdAt
    customerId
    duration
    endDate
    startDate
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCalendarVisitMutationVariables,
  APITypes.CreateCalendarVisitMutation
>;
export const createClientForm = /* GraphQL */ `mutation CreateClientForm(
  $condition: ModelClientFormConditionInput
  $input: CreateClientFormInput!
) {
  createClientForm(condition: $condition, input: $input) {
    Customer {
      address
      comune
      createdAt
      customerId
      email
      id
      name
      phone
      updatedAt
      __typename
    }
    Estimates {
      nextToken
      __typename
    }
    createdAt
    customerId
    distance
    formId
    isHouse
    isPortable
    isWallbox
    numberOfChargers
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateClientFormMutationVariables,
  APITypes.CreateClientFormMutation
>;
export const createCompany = /* GraphQL */ `mutation CreateCompany(
  $condition: ModelCompanyConditionInput
  $input: CreateCompanyInput!
) {
  createCompany(condition: $condition, input: $input) {
    Users {
      nextToken
      __typename
    }
    companyId
    createdAt
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCompanyMutationVariables,
  APITypes.CreateCompanyMutation
>;
export const createCustomer = /* GraphQL */ `mutation CreateCustomer(
  $condition: ModelCustomerConditionInput
  $input: CreateCustomerInput!
) {
  createCustomer(condition: $condition, input: $input) {
    CalendarVisits {
      nextToken
      __typename
    }
    ClientForm {
      nextToken
      __typename
    }
    address
    comune
    createdAt
    customerId
    email
    id
    name
    phone
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCustomerMutationVariables,
  APITypes.CreateCustomerMutation
>;
export const createDiscount = /* GraphQL */ `mutation CreateDiscount(
  $condition: ModelDiscountConditionInput
  $input: CreateDiscountInput!
) {
  createDiscount(condition: $condition, input: $input) {
    ShoppingCarts {
      nextToken
      __typename
    }
    createdAt
    discountId
    flatAmount
    name
    percentage
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDiscountMutationVariables,
  APITypes.CreateDiscountMutation
>;
export const createDiscountShoppingCart = /* GraphQL */ `mutation CreateDiscountShoppingCart(
  $condition: ModelDiscountShoppingCartConditionInput
  $input: CreateDiscountShoppingCartInput!
) {
  createDiscountShoppingCart(condition: $condition, input: $input) {
    Discount {
      createdAt
      discountId
      flatAmount
      name
      percentage
      updatedAt
      __typename
    }
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    createdAt
    discountId
    shoppingCartId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDiscountShoppingCartMutationVariables,
  APITypes.CreateDiscountShoppingCartMutation
>;
export const createEstimate = /* GraphQL */ `mutation CreateEstimate(
  $condition: ModelEstimateConditionInput
  $input: CreateEstimateInput!
) {
  createEstimate(condition: $condition, input: $input) {
    ClientForm {
      createdAt
      customerId
      distance
      formId
      isHouse
      isPortable
      isWallbox
      numberOfChargers
      updatedAt
      __typename
    }
    EstimateDetail {
      nextToken
      __typename
    }
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    ShoppingCart {
      nextToken
      __typename
    }
    TE6Cost
    boardAndAssemblyCost
    cableingCost
    canalizationCost
    chargerBrand
    chargerCost
    chargerModel
    chargerPotence
    createdAt
    distanceBPC
    distanceExposed
    distanceUnderground
    electricRoomFloorNumber
    electricalProtectionCost
    energicaMargin
    energicaMarginCost
    energicaNetCost
    estimateId
    formId
    groundWebMeasurementCost
    hasTireStops
    installationRecipeId
    installedFromAppartment
    isApproved
    isHouse
    isUnderground
    manpowerCost
    materialsCost
    needsElectricPoles
    netCost
    numberOfBends
    numberOfChargers
    numberOfInstallers
    numberOfManDays
    numberOfWallBreaches
    otherInstallationCosts
    parkingFloorNumber
    preChanneledDistance
    stateValidation
    totalInstallationGross
    undergroundDistance
    updatedAt
    vat
    vatPercentage
    vehicleBrand
    vehicleModel
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEstimateMutationVariables,
  APITypes.CreateEstimateMutation
>;
export const createEstimateDetail = /* GraphQL */ `mutation CreateEstimateDetail(
  $condition: ModelEstimateDetailConditionInput
  $input: CreateEstimateDetailInput!
) {
  createEstimateDetail(condition: $condition, input: $input) {
    Estimate {
      TE6Cost
      boardAndAssemblyCost
      cableingCost
      canalizationCost
      chargerBrand
      chargerCost
      chargerModel
      chargerPotence
      createdAt
      distanceBPC
      distanceExposed
      distanceUnderground
      electricRoomFloorNumber
      electricalProtectionCost
      energicaMargin
      energicaMarginCost
      energicaNetCost
      estimateId
      formId
      groundWebMeasurementCost
      hasTireStops
      installationRecipeId
      installedFromAppartment
      isApproved
      isHouse
      isUnderground
      manpowerCost
      materialsCost
      needsElectricPoles
      netCost
      numberOfBends
      numberOfChargers
      numberOfInstallers
      numberOfManDays
      numberOfWallBreaches
      otherInstallationCosts
      parkingFloorNumber
      preChanneledDistance
      stateValidation
      totalInstallationGross
      undergroundDistance
      updatedAt
      vat
      vatPercentage
      vehicleBrand
      vehicleModel
      __typename
    }
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    Price {
      cost
      createdAt
      endDate
      installationInputId
      priceId
      productId
      startDate
      status
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    ShoppingCartDetail {
      nextToken
      __typename
    }
    createdAt
    estimateDetailId
    estimateId
    installationInputId
    priceId
    productId
    quantity
    state
    totalPrice
    type
    unit
    unitPrice
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEstimateDetailMutationVariables,
  APITypes.CreateEstimateDetailMutation
>;
export const createInstallationInput = /* GraphQL */ `mutation CreateInstallationInput(
  $condition: ModelInstallationInputConditionInput
  $input: CreateInstallationInputInput!
) {
  createInstallationInput(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    InstallationRecipe {
      nextToken
      __typename
    }
    Prices {
      nextToken
      __typename
    }
    conductorCrossSection
    createdAt
    description
    detail
    installationInputId
    installationRecipeId
    unit
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInstallationInputMutationVariables,
  APITypes.CreateInstallationInputMutation
>;
export const createInstallationInputRel = /* GraphQL */ `mutation CreateInstallationInputRel(
  $condition: ModelInstallationInputRelConditionInput
  $input: CreateInstallationInputRelInput!
) {
  createInstallationInputRel(condition: $condition, input: $input) {
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    amountPerInstallationMeter
    createdAt
    installationInputId
    installationRecipeId
    quantity
    type
    updatedAt
    usagePercentage
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInstallationInputRelMutationVariables,
  APITypes.CreateInstallationInputRelMutation
>;
export const createInstallationProductRel = /* GraphQL */ `mutation CreateInstallationProductRel(
  $condition: ModelInstallationProductRelConditionInput
  $input: CreateInstallationProductRelInput!
) {
  createInstallationProductRel(condition: $condition, input: $input) {
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    createdAt
    installationRecipeId
    productId
    quantity
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInstallationProductRelMutationVariables,
  APITypes.CreateInstallationProductRelMutation
>;
export const createInstallationRecipe = /* GraphQL */ `mutation CreateInstallationRecipe(
  $condition: ModelInstallationRecipeConditionInput
  $input: CreateInstallationRecipeInput!
) {
  createInstallationRecipe(condition: $condition, input: $input) {
    Estimates {
      nextToken
      __typename
    }
    InstallationInputs {
      nextToken
      __typename
    }
    InstallationProducts {
      nextToken
      __typename
    }
    createdAt
    installationRecipeId
    isHouse
    isUnderground
    name
    potence
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInstallationRecipeMutationVariables,
  APITypes.CreateInstallationRecipeMutation
>;
export const createMetadata = /* GraphQL */ `mutation CreateMetadata(
  $condition: ModelMetadataConditionInput
  $input: CreateMetadataInput!
) {
  createMetadata(condition: $condition, input: $input) {
    Parameter {
      createdAt
      label
      parameterEncId
      parameterId
      updatedAt
      value
      __typename
    }
    createdAt
    key
    metadataId
    parameterId
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMetadataMutationVariables,
  APITypes.CreateMetadataMutation
>;
export const createParameter = /* GraphQL */ `mutation CreateParameter(
  $condition: ModelParameterConditionInput
  $input: CreateParameterInput!
) {
  createParameter(condition: $condition, input: $input) {
    Metadata {
      nextToken
      __typename
    }
    ParameterEnc {
      createdAt
      description
      parameterEncId
      updatedAt
      __typename
    }
    createdAt
    label
    parameterEncId
    parameterId
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateParameterMutationVariables,
  APITypes.CreateParameterMutation
>;
export const createParameterEnc = /* GraphQL */ `mutation CreateParameterEnc(
  $condition: ModelParameterEncConditionInput
  $input: CreateParameterEncInput!
) {
  createParameterEnc(condition: $condition, input: $input) {
    Parameters {
      nextToken
      __typename
    }
    createdAt
    description
    parameterEncId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateParameterEncMutationVariables,
  APITypes.CreateParameterEncMutation
>;
export const createPaymentTransaction = /* GraphQL */ `mutation CreatePaymentTransaction(
  $condition: ModelPaymentTransactionConditionInput
  $input: CreatePaymentTransactionInput!
) {
  createPaymentTransaction(condition: $condition, input: $input) {
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    accounting_date
    amount
    authorization_code
    buy_order
    card_detail
    card_number
    createdAt
    date
    glosa
    installments_amount
    installments_number
    paymentTransactionId
    payment_type_code
    paymentsProcessorCommission
    response_code
    session_id
    shoppingCartId
    status
    token
    transaction_date
    updatedAt
    usersPaymentTransactionsId
    vci
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePaymentTransactionMutationVariables,
  APITypes.CreatePaymentTransactionMutation
>;
export const createPermission = /* GraphQL */ `mutation CreatePermission(
  $condition: ModelPermissionConditionInput
  $input: CreatePermissionInput!
) {
  createPermission(condition: $condition, input: $input) {
    Padre {
      createdAt
      displayName
      icon
      isLeaf
      isVisible
      name
      order
      padreId
      permissionId
      updatedAt
      __typename
    }
    PermissionPerRole {
      nextToken
      __typename
    }
    Submenu {
      nextToken
      __typename
    }
    createdAt
    displayName
    icon
    isLeaf
    isVisible
    name
    order
    padreId
    permissionId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePermissionMutationVariables,
  APITypes.CreatePermissionMutation
>;
export const createPermissionPerRole = /* GraphQL */ `mutation CreatePermissionPerRole(
  $condition: ModelPermissionPerRoleConditionInput
  $input: CreatePermissionPerRoleInput!
) {
  createPermissionPerRole(condition: $condition, input: $input) {
    Permissions {
      createdAt
      displayName
      icon
      isLeaf
      isVisible
      name
      order
      padreId
      permissionId
      updatedAt
      __typename
    }
    Roles {
      createdAt
      displayName
      icon
      name
      roleId
      updatedAt
      __typename
    }
    createdAt
    permissionId
    roleId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePermissionPerRoleMutationVariables,
  APITypes.CreatePermissionPerRoleMutation
>;
export const createPrice = /* GraphQL */ `mutation CreatePrice(
  $condition: ModelPriceConditionInput
  $input: CreatePriceInput!
) {
  createPrice(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    ShoppingCartDetails {
      nextToken
      __typename
    }
    cost
    createdAt
    endDate
    installationInputId
    priceId
    productId
    startDate
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePriceMutationVariables,
  APITypes.CreatePriceMutation
>;
export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $condition: ModelProductConditionInput
  $input: CreateProductInput!
) {
  createProduct(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    Prices {
      nextToken
      __typename
    }
    Recipes {
      nextToken
      __typename
    }
    brand
    createdAt
    description
    detail
    potence
    productId
    type
    unit
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const createRole = /* GraphQL */ `mutation CreateRole(
  $condition: ModelRoleConditionInput
  $input: CreateRoleInput!
) {
  createRole(condition: $condition, input: $input) {
    PermissionPerRole {
      nextToken
      __typename
    }
    createdAt
    displayName
    icon
    name
    roleId
    updatedAt
    users {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRoleMutationVariables,
  APITypes.CreateRoleMutation
>;
export const createShoppingCart = /* GraphQL */ `mutation CreateShoppingCart(
  $condition: ModelShoppingCartConditionInput
  $input: CreateShoppingCartInput!
) {
  createShoppingCart(condition: $condition, input: $input) {
    Discounts {
      nextToken
      __typename
    }
    Estimate {
      TE6Cost
      boardAndAssemblyCost
      cableingCost
      canalizationCost
      chargerBrand
      chargerCost
      chargerModel
      chargerPotence
      createdAt
      distanceBPC
      distanceExposed
      distanceUnderground
      electricRoomFloorNumber
      electricalProtectionCost
      energicaMargin
      energicaMarginCost
      energicaNetCost
      estimateId
      formId
      groundWebMeasurementCost
      hasTireStops
      installationRecipeId
      installedFromAppartment
      isApproved
      isHouse
      isUnderground
      manpowerCost
      materialsCost
      needsElectricPoles
      netCost
      numberOfBends
      numberOfChargers
      numberOfInstallers
      numberOfManDays
      numberOfWallBreaches
      otherInstallationCosts
      parkingFloorNumber
      preChanneledDistance
      stateValidation
      totalInstallationGross
      undergroundDistance
      updatedAt
      vat
      vatPercentage
      vehicleBrand
      vehicleModel
      __typename
    }
    PaymentTransaction {
      accounting_date
      amount
      authorization_code
      buy_order
      card_detail
      card_number
      createdAt
      date
      glosa
      installments_amount
      installments_number
      paymentTransactionId
      payment_type_code
      paymentsProcessorCommission
      response_code
      session_id
      shoppingCartId
      status
      token
      transaction_date
      updatedAt
      usersPaymentTransactionsId
      vci
      __typename
    }
    ShoppingCartDetails {
      nextToken
      __typename
    }
    createdAt
    estimateId
    paymentMethod
    paymentTransactionId
    shoppingCartId
    status
    totalPrice
    updatedAt
    vat
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateShoppingCartMutationVariables,
  APITypes.CreateShoppingCartMutation
>;
export const createShoppingCartDetail = /* GraphQL */ `mutation CreateShoppingCartDetail(
  $condition: ModelShoppingCartDetailConditionInput
  $input: CreateShoppingCartDetailInput!
) {
  createShoppingCartDetail(condition: $condition, input: $input) {
    EstimateDetail {
      createdAt
      estimateDetailId
      estimateId
      installationInputId
      priceId
      productId
      quantity
      state
      totalPrice
      type
      unit
      unitPrice
      updatedAt
      __typename
    }
    Price {
      cost
      createdAt
      endDate
      installationInputId
      priceId
      productId
      startDate
      status
      updatedAt
      __typename
    }
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    createdAt
    estimateDetailId
    price
    priceId
    shoppingCartDetailId
    shoppingCartId
    typeOfItem
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateShoppingCartDetailMutationVariables,
  APITypes.CreateShoppingCartDetailMutation
>;
export const createSupportTicket = /* GraphQL */ `mutation CreateSupportTicket(
  $condition: ModelSupportTicketConditionInput
  $input: CreateSupportTicketInput!
) {
  createSupportTicket(condition: $condition, input: $input) {
    AssignedEmployee {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    Solicitant {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    TicketComments {
      nextToken
      __typename
    }
    createdAt
    date
    description
    email
    employeeId
    eveId
    lastModificationUser
    level
    name
    phoneNumber
    solicitantId
    statusTicket
    supportTicketId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSupportTicketMutationVariables,
  APITypes.CreateSupportTicketMutation
>;
export const createTicketComment = /* GraphQL */ `mutation CreateTicketComment(
  $condition: ModelTicketCommentConditionInput
  $input: CreateTicketCommentInput!
) {
  createTicketComment(condition: $condition, input: $input) {
    SupportTicket {
      createdAt
      date
      description
      email
      employeeId
      eveId
      lastModificationUser
      level
      name
      phoneNumber
      solicitantId
      statusTicket
      supportTicketId
      updatedAt
      __typename
    }
    User {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    canClientSeeComment
    createdAt
    isEnergica
    message
    supportTicketId
    ticketCommentId
    typeOfUser
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTicketCommentMutationVariables,
  APITypes.CreateTicketCommentMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
    CalendarVisits {
      nextToken
      __typename
    }
    Company {
      companyId
      createdAt
      name
      updatedAt
      __typename
    }
    RequestedTickets {
      nextToken
      __typename
    }
    ResolveTickest {
      nextToken
      __typename
    }
    Role {
      createdAt
      displayName
      icon
      name
      roleId
      updatedAt
      __typename
    }
    TicketComments {
      nextToken
      __typename
    }
    companyId
    createdAt
    name
    roleId
    updatedAt
    userId
    validated
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteCalendarVisit = /* GraphQL */ `mutation DeleteCalendarVisit(
  $condition: ModelCalendarVisitConditionInput
  $input: DeleteCalendarVisitInput!
) {
  deleteCalendarVisit(condition: $condition, input: $input) {
    Customer {
      address
      comune
      createdAt
      customerId
      email
      id
      name
      phone
      updatedAt
      __typename
    }
    User {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    amount
    calendarId
    createdAt
    customerId
    duration
    endDate
    startDate
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCalendarVisitMutationVariables,
  APITypes.DeleteCalendarVisitMutation
>;
export const deleteClientForm = /* GraphQL */ `mutation DeleteClientForm(
  $condition: ModelClientFormConditionInput
  $input: DeleteClientFormInput!
) {
  deleteClientForm(condition: $condition, input: $input) {
    Customer {
      address
      comune
      createdAt
      customerId
      email
      id
      name
      phone
      updatedAt
      __typename
    }
    Estimates {
      nextToken
      __typename
    }
    createdAt
    customerId
    distance
    formId
    isHouse
    isPortable
    isWallbox
    numberOfChargers
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteClientFormMutationVariables,
  APITypes.DeleteClientFormMutation
>;
export const deleteCompany = /* GraphQL */ `mutation DeleteCompany(
  $condition: ModelCompanyConditionInput
  $input: DeleteCompanyInput!
) {
  deleteCompany(condition: $condition, input: $input) {
    Users {
      nextToken
      __typename
    }
    companyId
    createdAt
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCompanyMutationVariables,
  APITypes.DeleteCompanyMutation
>;
export const deleteCustomer = /* GraphQL */ `mutation DeleteCustomer(
  $condition: ModelCustomerConditionInput
  $input: DeleteCustomerInput!
) {
  deleteCustomer(condition: $condition, input: $input) {
    CalendarVisits {
      nextToken
      __typename
    }
    ClientForm {
      nextToken
      __typename
    }
    address
    comune
    createdAt
    customerId
    email
    id
    name
    phone
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCustomerMutationVariables,
  APITypes.DeleteCustomerMutation
>;
export const deleteDiscount = /* GraphQL */ `mutation DeleteDiscount(
  $condition: ModelDiscountConditionInput
  $input: DeleteDiscountInput!
) {
  deleteDiscount(condition: $condition, input: $input) {
    ShoppingCarts {
      nextToken
      __typename
    }
    createdAt
    discountId
    flatAmount
    name
    percentage
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDiscountMutationVariables,
  APITypes.DeleteDiscountMutation
>;
export const deleteDiscountShoppingCart = /* GraphQL */ `mutation DeleteDiscountShoppingCart(
  $condition: ModelDiscountShoppingCartConditionInput
  $input: DeleteDiscountShoppingCartInput!
) {
  deleteDiscountShoppingCart(condition: $condition, input: $input) {
    Discount {
      createdAt
      discountId
      flatAmount
      name
      percentage
      updatedAt
      __typename
    }
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    createdAt
    discountId
    shoppingCartId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDiscountShoppingCartMutationVariables,
  APITypes.DeleteDiscountShoppingCartMutation
>;
export const deleteEstimate = /* GraphQL */ `mutation DeleteEstimate(
  $condition: ModelEstimateConditionInput
  $input: DeleteEstimateInput!
) {
  deleteEstimate(condition: $condition, input: $input) {
    ClientForm {
      createdAt
      customerId
      distance
      formId
      isHouse
      isPortable
      isWallbox
      numberOfChargers
      updatedAt
      __typename
    }
    EstimateDetail {
      nextToken
      __typename
    }
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    ShoppingCart {
      nextToken
      __typename
    }
    TE6Cost
    boardAndAssemblyCost
    cableingCost
    canalizationCost
    chargerBrand
    chargerCost
    chargerModel
    chargerPotence
    createdAt
    distanceBPC
    distanceExposed
    distanceUnderground
    electricRoomFloorNumber
    electricalProtectionCost
    energicaMargin
    energicaMarginCost
    energicaNetCost
    estimateId
    formId
    groundWebMeasurementCost
    hasTireStops
    installationRecipeId
    installedFromAppartment
    isApproved
    isHouse
    isUnderground
    manpowerCost
    materialsCost
    needsElectricPoles
    netCost
    numberOfBends
    numberOfChargers
    numberOfInstallers
    numberOfManDays
    numberOfWallBreaches
    otherInstallationCosts
    parkingFloorNumber
    preChanneledDistance
    stateValidation
    totalInstallationGross
    undergroundDistance
    updatedAt
    vat
    vatPercentage
    vehicleBrand
    vehicleModel
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEstimateMutationVariables,
  APITypes.DeleteEstimateMutation
>;
export const deleteEstimateDetail = /* GraphQL */ `mutation DeleteEstimateDetail(
  $condition: ModelEstimateDetailConditionInput
  $input: DeleteEstimateDetailInput!
) {
  deleteEstimateDetail(condition: $condition, input: $input) {
    Estimate {
      TE6Cost
      boardAndAssemblyCost
      cableingCost
      canalizationCost
      chargerBrand
      chargerCost
      chargerModel
      chargerPotence
      createdAt
      distanceBPC
      distanceExposed
      distanceUnderground
      electricRoomFloorNumber
      electricalProtectionCost
      energicaMargin
      energicaMarginCost
      energicaNetCost
      estimateId
      formId
      groundWebMeasurementCost
      hasTireStops
      installationRecipeId
      installedFromAppartment
      isApproved
      isHouse
      isUnderground
      manpowerCost
      materialsCost
      needsElectricPoles
      netCost
      numberOfBends
      numberOfChargers
      numberOfInstallers
      numberOfManDays
      numberOfWallBreaches
      otherInstallationCosts
      parkingFloorNumber
      preChanneledDistance
      stateValidation
      totalInstallationGross
      undergroundDistance
      updatedAt
      vat
      vatPercentage
      vehicleBrand
      vehicleModel
      __typename
    }
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    Price {
      cost
      createdAt
      endDate
      installationInputId
      priceId
      productId
      startDate
      status
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    ShoppingCartDetail {
      nextToken
      __typename
    }
    createdAt
    estimateDetailId
    estimateId
    installationInputId
    priceId
    productId
    quantity
    state
    totalPrice
    type
    unit
    unitPrice
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEstimateDetailMutationVariables,
  APITypes.DeleteEstimateDetailMutation
>;
export const deleteInstallationInput = /* GraphQL */ `mutation DeleteInstallationInput(
  $condition: ModelInstallationInputConditionInput
  $input: DeleteInstallationInputInput!
) {
  deleteInstallationInput(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    InstallationRecipe {
      nextToken
      __typename
    }
    Prices {
      nextToken
      __typename
    }
    conductorCrossSection
    createdAt
    description
    detail
    installationInputId
    installationRecipeId
    unit
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInstallationInputMutationVariables,
  APITypes.DeleteInstallationInputMutation
>;
export const deleteInstallationInputRel = /* GraphQL */ `mutation DeleteInstallationInputRel(
  $condition: ModelInstallationInputRelConditionInput
  $input: DeleteInstallationInputRelInput!
) {
  deleteInstallationInputRel(condition: $condition, input: $input) {
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    amountPerInstallationMeter
    createdAt
    installationInputId
    installationRecipeId
    quantity
    type
    updatedAt
    usagePercentage
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInstallationInputRelMutationVariables,
  APITypes.DeleteInstallationInputRelMutation
>;
export const deleteInstallationProductRel = /* GraphQL */ `mutation DeleteInstallationProductRel(
  $condition: ModelInstallationProductRelConditionInput
  $input: DeleteInstallationProductRelInput!
) {
  deleteInstallationProductRel(condition: $condition, input: $input) {
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    createdAt
    installationRecipeId
    productId
    quantity
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInstallationProductRelMutationVariables,
  APITypes.DeleteInstallationProductRelMutation
>;
export const deleteInstallationRecipe = /* GraphQL */ `mutation DeleteInstallationRecipe(
  $condition: ModelInstallationRecipeConditionInput
  $input: DeleteInstallationRecipeInput!
) {
  deleteInstallationRecipe(condition: $condition, input: $input) {
    Estimates {
      nextToken
      __typename
    }
    InstallationInputs {
      nextToken
      __typename
    }
    InstallationProducts {
      nextToken
      __typename
    }
    createdAt
    installationRecipeId
    isHouse
    isUnderground
    name
    potence
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInstallationRecipeMutationVariables,
  APITypes.DeleteInstallationRecipeMutation
>;
export const deleteMetadata = /* GraphQL */ `mutation DeleteMetadata(
  $condition: ModelMetadataConditionInput
  $input: DeleteMetadataInput!
) {
  deleteMetadata(condition: $condition, input: $input) {
    Parameter {
      createdAt
      label
      parameterEncId
      parameterId
      updatedAt
      value
      __typename
    }
    createdAt
    key
    metadataId
    parameterId
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMetadataMutationVariables,
  APITypes.DeleteMetadataMutation
>;
export const deleteParameter = /* GraphQL */ `mutation DeleteParameter(
  $condition: ModelParameterConditionInput
  $input: DeleteParameterInput!
) {
  deleteParameter(condition: $condition, input: $input) {
    Metadata {
      nextToken
      __typename
    }
    ParameterEnc {
      createdAt
      description
      parameterEncId
      updatedAt
      __typename
    }
    createdAt
    label
    parameterEncId
    parameterId
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteParameterMutationVariables,
  APITypes.DeleteParameterMutation
>;
export const deleteParameterEnc = /* GraphQL */ `mutation DeleteParameterEnc(
  $condition: ModelParameterEncConditionInput
  $input: DeleteParameterEncInput!
) {
  deleteParameterEnc(condition: $condition, input: $input) {
    Parameters {
      nextToken
      __typename
    }
    createdAt
    description
    parameterEncId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteParameterEncMutationVariables,
  APITypes.DeleteParameterEncMutation
>;
export const deletePaymentTransaction = /* GraphQL */ `mutation DeletePaymentTransaction(
  $condition: ModelPaymentTransactionConditionInput
  $input: DeletePaymentTransactionInput!
) {
  deletePaymentTransaction(condition: $condition, input: $input) {
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    accounting_date
    amount
    authorization_code
    buy_order
    card_detail
    card_number
    createdAt
    date
    glosa
    installments_amount
    installments_number
    paymentTransactionId
    payment_type_code
    paymentsProcessorCommission
    response_code
    session_id
    shoppingCartId
    status
    token
    transaction_date
    updatedAt
    usersPaymentTransactionsId
    vci
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePaymentTransactionMutationVariables,
  APITypes.DeletePaymentTransactionMutation
>;
export const deletePermission = /* GraphQL */ `mutation DeletePermission(
  $condition: ModelPermissionConditionInput
  $input: DeletePermissionInput!
) {
  deletePermission(condition: $condition, input: $input) {
    Padre {
      createdAt
      displayName
      icon
      isLeaf
      isVisible
      name
      order
      padreId
      permissionId
      updatedAt
      __typename
    }
    PermissionPerRole {
      nextToken
      __typename
    }
    Submenu {
      nextToken
      __typename
    }
    createdAt
    displayName
    icon
    isLeaf
    isVisible
    name
    order
    padreId
    permissionId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePermissionMutationVariables,
  APITypes.DeletePermissionMutation
>;
export const deletePermissionPerRole = /* GraphQL */ `mutation DeletePermissionPerRole(
  $condition: ModelPermissionPerRoleConditionInput
  $input: DeletePermissionPerRoleInput!
) {
  deletePermissionPerRole(condition: $condition, input: $input) {
    Permissions {
      createdAt
      displayName
      icon
      isLeaf
      isVisible
      name
      order
      padreId
      permissionId
      updatedAt
      __typename
    }
    Roles {
      createdAt
      displayName
      icon
      name
      roleId
      updatedAt
      __typename
    }
    createdAt
    permissionId
    roleId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePermissionPerRoleMutationVariables,
  APITypes.DeletePermissionPerRoleMutation
>;
export const deletePrice = /* GraphQL */ `mutation DeletePrice(
  $condition: ModelPriceConditionInput
  $input: DeletePriceInput!
) {
  deletePrice(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    ShoppingCartDetails {
      nextToken
      __typename
    }
    cost
    createdAt
    endDate
    installationInputId
    priceId
    productId
    startDate
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePriceMutationVariables,
  APITypes.DeletePriceMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $condition: ModelProductConditionInput
  $input: DeleteProductInput!
) {
  deleteProduct(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    Prices {
      nextToken
      __typename
    }
    Recipes {
      nextToken
      __typename
    }
    brand
    createdAt
    description
    detail
    potence
    productId
    type
    unit
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const deleteRole = /* GraphQL */ `mutation DeleteRole(
  $condition: ModelRoleConditionInput
  $input: DeleteRoleInput!
) {
  deleteRole(condition: $condition, input: $input) {
    PermissionPerRole {
      nextToken
      __typename
    }
    createdAt
    displayName
    icon
    name
    roleId
    updatedAt
    users {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRoleMutationVariables,
  APITypes.DeleteRoleMutation
>;
export const deleteShoppingCart = /* GraphQL */ `mutation DeleteShoppingCart(
  $condition: ModelShoppingCartConditionInput
  $input: DeleteShoppingCartInput!
) {
  deleteShoppingCart(condition: $condition, input: $input) {
    Discounts {
      nextToken
      __typename
    }
    Estimate {
      TE6Cost
      boardAndAssemblyCost
      cableingCost
      canalizationCost
      chargerBrand
      chargerCost
      chargerModel
      chargerPotence
      createdAt
      distanceBPC
      distanceExposed
      distanceUnderground
      electricRoomFloorNumber
      electricalProtectionCost
      energicaMargin
      energicaMarginCost
      energicaNetCost
      estimateId
      formId
      groundWebMeasurementCost
      hasTireStops
      installationRecipeId
      installedFromAppartment
      isApproved
      isHouse
      isUnderground
      manpowerCost
      materialsCost
      needsElectricPoles
      netCost
      numberOfBends
      numberOfChargers
      numberOfInstallers
      numberOfManDays
      numberOfWallBreaches
      otherInstallationCosts
      parkingFloorNumber
      preChanneledDistance
      stateValidation
      totalInstallationGross
      undergroundDistance
      updatedAt
      vat
      vatPercentage
      vehicleBrand
      vehicleModel
      __typename
    }
    PaymentTransaction {
      accounting_date
      amount
      authorization_code
      buy_order
      card_detail
      card_number
      createdAt
      date
      glosa
      installments_amount
      installments_number
      paymentTransactionId
      payment_type_code
      paymentsProcessorCommission
      response_code
      session_id
      shoppingCartId
      status
      token
      transaction_date
      updatedAt
      usersPaymentTransactionsId
      vci
      __typename
    }
    ShoppingCartDetails {
      nextToken
      __typename
    }
    createdAt
    estimateId
    paymentMethod
    paymentTransactionId
    shoppingCartId
    status
    totalPrice
    updatedAt
    vat
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteShoppingCartMutationVariables,
  APITypes.DeleteShoppingCartMutation
>;
export const deleteShoppingCartDetail = /* GraphQL */ `mutation DeleteShoppingCartDetail(
  $condition: ModelShoppingCartDetailConditionInput
  $input: DeleteShoppingCartDetailInput!
) {
  deleteShoppingCartDetail(condition: $condition, input: $input) {
    EstimateDetail {
      createdAt
      estimateDetailId
      estimateId
      installationInputId
      priceId
      productId
      quantity
      state
      totalPrice
      type
      unit
      unitPrice
      updatedAt
      __typename
    }
    Price {
      cost
      createdAt
      endDate
      installationInputId
      priceId
      productId
      startDate
      status
      updatedAt
      __typename
    }
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    createdAt
    estimateDetailId
    price
    priceId
    shoppingCartDetailId
    shoppingCartId
    typeOfItem
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteShoppingCartDetailMutationVariables,
  APITypes.DeleteShoppingCartDetailMutation
>;
export const deleteSupportTicket = /* GraphQL */ `mutation DeleteSupportTicket(
  $condition: ModelSupportTicketConditionInput
  $input: DeleteSupportTicketInput!
) {
  deleteSupportTicket(condition: $condition, input: $input) {
    AssignedEmployee {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    Solicitant {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    TicketComments {
      nextToken
      __typename
    }
    createdAt
    date
    description
    email
    employeeId
    eveId
    lastModificationUser
    level
    name
    phoneNumber
    solicitantId
    statusTicket
    supportTicketId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSupportTicketMutationVariables,
  APITypes.DeleteSupportTicketMutation
>;
export const deleteTicketComment = /* GraphQL */ `mutation DeleteTicketComment(
  $condition: ModelTicketCommentConditionInput
  $input: DeleteTicketCommentInput!
) {
  deleteTicketComment(condition: $condition, input: $input) {
    SupportTicket {
      createdAt
      date
      description
      email
      employeeId
      eveId
      lastModificationUser
      level
      name
      phoneNumber
      solicitantId
      statusTicket
      supportTicketId
      updatedAt
      __typename
    }
    User {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    canClientSeeComment
    createdAt
    isEnergica
    message
    supportTicketId
    ticketCommentId
    typeOfUser
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTicketCommentMutationVariables,
  APITypes.DeleteTicketCommentMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
    CalendarVisits {
      nextToken
      __typename
    }
    Company {
      companyId
      createdAt
      name
      updatedAt
      __typename
    }
    RequestedTickets {
      nextToken
      __typename
    }
    ResolveTickest {
      nextToken
      __typename
    }
    Role {
      createdAt
      displayName
      icon
      name
      roleId
      updatedAt
      __typename
    }
    TicketComments {
      nextToken
      __typename
    }
    companyId
    createdAt
    name
    roleId
    updatedAt
    userId
    validated
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateCalendarVisit = /* GraphQL */ `mutation UpdateCalendarVisit(
  $condition: ModelCalendarVisitConditionInput
  $input: UpdateCalendarVisitInput!
) {
  updateCalendarVisit(condition: $condition, input: $input) {
    Customer {
      address
      comune
      createdAt
      customerId
      email
      id
      name
      phone
      updatedAt
      __typename
    }
    User {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    amount
    calendarId
    createdAt
    customerId
    duration
    endDate
    startDate
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCalendarVisitMutationVariables,
  APITypes.UpdateCalendarVisitMutation
>;
export const updateClientForm = /* GraphQL */ `mutation UpdateClientForm(
  $condition: ModelClientFormConditionInput
  $input: UpdateClientFormInput!
) {
  updateClientForm(condition: $condition, input: $input) {
    Customer {
      address
      comune
      createdAt
      customerId
      email
      id
      name
      phone
      updatedAt
      __typename
    }
    Estimates {
      nextToken
      __typename
    }
    createdAt
    customerId
    distance
    formId
    isHouse
    isPortable
    isWallbox
    numberOfChargers
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateClientFormMutationVariables,
  APITypes.UpdateClientFormMutation
>;
export const updateCompany = /* GraphQL */ `mutation UpdateCompany(
  $condition: ModelCompanyConditionInput
  $input: UpdateCompanyInput!
) {
  updateCompany(condition: $condition, input: $input) {
    Users {
      nextToken
      __typename
    }
    companyId
    createdAt
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCompanyMutationVariables,
  APITypes.UpdateCompanyMutation
>;
export const updateCustomer = /* GraphQL */ `mutation UpdateCustomer(
  $condition: ModelCustomerConditionInput
  $input: UpdateCustomerInput!
) {
  updateCustomer(condition: $condition, input: $input) {
    CalendarVisits {
      nextToken
      __typename
    }
    ClientForm {
      nextToken
      __typename
    }
    address
    comune
    createdAt
    customerId
    email
    id
    name
    phone
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCustomerMutationVariables,
  APITypes.UpdateCustomerMutation
>;
export const updateDiscount = /* GraphQL */ `mutation UpdateDiscount(
  $condition: ModelDiscountConditionInput
  $input: UpdateDiscountInput!
) {
  updateDiscount(condition: $condition, input: $input) {
    ShoppingCarts {
      nextToken
      __typename
    }
    createdAt
    discountId
    flatAmount
    name
    percentage
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDiscountMutationVariables,
  APITypes.UpdateDiscountMutation
>;
export const updateDiscountShoppingCart = /* GraphQL */ `mutation UpdateDiscountShoppingCart(
  $condition: ModelDiscountShoppingCartConditionInput
  $input: UpdateDiscountShoppingCartInput!
) {
  updateDiscountShoppingCart(condition: $condition, input: $input) {
    Discount {
      createdAt
      discountId
      flatAmount
      name
      percentage
      updatedAt
      __typename
    }
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    createdAt
    discountId
    shoppingCartId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDiscountShoppingCartMutationVariables,
  APITypes.UpdateDiscountShoppingCartMutation
>;
export const updateEstimate = /* GraphQL */ `mutation UpdateEstimate(
  $condition: ModelEstimateConditionInput
  $input: UpdateEstimateInput!
) {
  updateEstimate(condition: $condition, input: $input) {
    ClientForm {
      createdAt
      customerId
      distance
      formId
      isHouse
      isPortable
      isWallbox
      numberOfChargers
      updatedAt
      __typename
    }
    EstimateDetail {
      nextToken
      __typename
    }
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    ShoppingCart {
      nextToken
      __typename
    }
    TE6Cost
    boardAndAssemblyCost
    cableingCost
    canalizationCost
    chargerBrand
    chargerCost
    chargerModel
    chargerPotence
    createdAt
    distanceBPC
    distanceExposed
    distanceUnderground
    electricRoomFloorNumber
    electricalProtectionCost
    energicaMargin
    energicaMarginCost
    energicaNetCost
    estimateId
    formId
    groundWebMeasurementCost
    hasTireStops
    installationRecipeId
    installedFromAppartment
    isApproved
    isHouse
    isUnderground
    manpowerCost
    materialsCost
    needsElectricPoles
    netCost
    numberOfBends
    numberOfChargers
    numberOfInstallers
    numberOfManDays
    numberOfWallBreaches
    otherInstallationCosts
    parkingFloorNumber
    preChanneledDistance
    stateValidation
    totalInstallationGross
    undergroundDistance
    updatedAt
    vat
    vatPercentage
    vehicleBrand
    vehicleModel
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEstimateMutationVariables,
  APITypes.UpdateEstimateMutation
>;
export const updateEstimateDetail = /* GraphQL */ `mutation UpdateEstimateDetail(
  $condition: ModelEstimateDetailConditionInput
  $input: UpdateEstimateDetailInput!
) {
  updateEstimateDetail(condition: $condition, input: $input) {
    Estimate {
      TE6Cost
      boardAndAssemblyCost
      cableingCost
      canalizationCost
      chargerBrand
      chargerCost
      chargerModel
      chargerPotence
      createdAt
      distanceBPC
      distanceExposed
      distanceUnderground
      electricRoomFloorNumber
      electricalProtectionCost
      energicaMargin
      energicaMarginCost
      energicaNetCost
      estimateId
      formId
      groundWebMeasurementCost
      hasTireStops
      installationRecipeId
      installedFromAppartment
      isApproved
      isHouse
      isUnderground
      manpowerCost
      materialsCost
      needsElectricPoles
      netCost
      numberOfBends
      numberOfChargers
      numberOfInstallers
      numberOfManDays
      numberOfWallBreaches
      otherInstallationCosts
      parkingFloorNumber
      preChanneledDistance
      stateValidation
      totalInstallationGross
      undergroundDistance
      updatedAt
      vat
      vatPercentage
      vehicleBrand
      vehicleModel
      __typename
    }
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    Price {
      cost
      createdAt
      endDate
      installationInputId
      priceId
      productId
      startDate
      status
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    ShoppingCartDetail {
      nextToken
      __typename
    }
    createdAt
    estimateDetailId
    estimateId
    installationInputId
    priceId
    productId
    quantity
    state
    totalPrice
    type
    unit
    unitPrice
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEstimateDetailMutationVariables,
  APITypes.UpdateEstimateDetailMutation
>;
export const updateInstallationInput = /* GraphQL */ `mutation UpdateInstallationInput(
  $condition: ModelInstallationInputConditionInput
  $input: UpdateInstallationInputInput!
) {
  updateInstallationInput(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    InstallationRecipe {
      nextToken
      __typename
    }
    Prices {
      nextToken
      __typename
    }
    conductorCrossSection
    createdAt
    description
    detail
    installationInputId
    installationRecipeId
    unit
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInstallationInputMutationVariables,
  APITypes.UpdateInstallationInputMutation
>;
export const updateInstallationInputRel = /* GraphQL */ `mutation UpdateInstallationInputRel(
  $condition: ModelInstallationInputRelConditionInput
  $input: UpdateInstallationInputRelInput!
) {
  updateInstallationInputRel(condition: $condition, input: $input) {
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    amountPerInstallationMeter
    createdAt
    installationInputId
    installationRecipeId
    quantity
    type
    updatedAt
    usagePercentage
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInstallationInputRelMutationVariables,
  APITypes.UpdateInstallationInputRelMutation
>;
export const updateInstallationProductRel = /* GraphQL */ `mutation UpdateInstallationProductRel(
  $condition: ModelInstallationProductRelConditionInput
  $input: UpdateInstallationProductRelInput!
) {
  updateInstallationProductRel(condition: $condition, input: $input) {
    InstallationRecipe {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    createdAt
    installationRecipeId
    productId
    quantity
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInstallationProductRelMutationVariables,
  APITypes.UpdateInstallationProductRelMutation
>;
export const updateInstallationRecipe = /* GraphQL */ `mutation UpdateInstallationRecipe(
  $condition: ModelInstallationRecipeConditionInput
  $input: UpdateInstallationRecipeInput!
) {
  updateInstallationRecipe(condition: $condition, input: $input) {
    Estimates {
      nextToken
      __typename
    }
    InstallationInputs {
      nextToken
      __typename
    }
    InstallationProducts {
      nextToken
      __typename
    }
    createdAt
    installationRecipeId
    isHouse
    isUnderground
    name
    potence
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInstallationRecipeMutationVariables,
  APITypes.UpdateInstallationRecipeMutation
>;
export const updateMetadata = /* GraphQL */ `mutation UpdateMetadata(
  $condition: ModelMetadataConditionInput
  $input: UpdateMetadataInput!
) {
  updateMetadata(condition: $condition, input: $input) {
    Parameter {
      createdAt
      label
      parameterEncId
      parameterId
      updatedAt
      value
      __typename
    }
    createdAt
    key
    metadataId
    parameterId
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMetadataMutationVariables,
  APITypes.UpdateMetadataMutation
>;
export const updateParameter = /* GraphQL */ `mutation UpdateParameter(
  $condition: ModelParameterConditionInput
  $input: UpdateParameterInput!
) {
  updateParameter(condition: $condition, input: $input) {
    Metadata {
      nextToken
      __typename
    }
    ParameterEnc {
      createdAt
      description
      parameterEncId
      updatedAt
      __typename
    }
    createdAt
    label
    parameterEncId
    parameterId
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateParameterMutationVariables,
  APITypes.UpdateParameterMutation
>;
export const updateParameterEnc = /* GraphQL */ `mutation UpdateParameterEnc(
  $condition: ModelParameterEncConditionInput
  $input: UpdateParameterEncInput!
) {
  updateParameterEnc(condition: $condition, input: $input) {
    Parameters {
      nextToken
      __typename
    }
    createdAt
    description
    parameterEncId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateParameterEncMutationVariables,
  APITypes.UpdateParameterEncMutation
>;
export const updatePaymentTransaction = /* GraphQL */ `mutation UpdatePaymentTransaction(
  $condition: ModelPaymentTransactionConditionInput
  $input: UpdatePaymentTransactionInput!
) {
  updatePaymentTransaction(condition: $condition, input: $input) {
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    accounting_date
    amount
    authorization_code
    buy_order
    card_detail
    card_number
    createdAt
    date
    glosa
    installments_amount
    installments_number
    paymentTransactionId
    payment_type_code
    paymentsProcessorCommission
    response_code
    session_id
    shoppingCartId
    status
    token
    transaction_date
    updatedAt
    usersPaymentTransactionsId
    vci
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePaymentTransactionMutationVariables,
  APITypes.UpdatePaymentTransactionMutation
>;
export const updatePermission = /* GraphQL */ `mutation UpdatePermission(
  $condition: ModelPermissionConditionInput
  $input: UpdatePermissionInput!
) {
  updatePermission(condition: $condition, input: $input) {
    Padre {
      createdAt
      displayName
      icon
      isLeaf
      isVisible
      name
      order
      padreId
      permissionId
      updatedAt
      __typename
    }
    PermissionPerRole {
      nextToken
      __typename
    }
    Submenu {
      nextToken
      __typename
    }
    createdAt
    displayName
    icon
    isLeaf
    isVisible
    name
    order
    padreId
    permissionId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePermissionMutationVariables,
  APITypes.UpdatePermissionMutation
>;
export const updatePermissionPerRole = /* GraphQL */ `mutation UpdatePermissionPerRole(
  $condition: ModelPermissionPerRoleConditionInput
  $input: UpdatePermissionPerRoleInput!
) {
  updatePermissionPerRole(condition: $condition, input: $input) {
    Permissions {
      createdAt
      displayName
      icon
      isLeaf
      isVisible
      name
      order
      padreId
      permissionId
      updatedAt
      __typename
    }
    Roles {
      createdAt
      displayName
      icon
      name
      roleId
      updatedAt
      __typename
    }
    createdAt
    permissionId
    roleId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePermissionPerRoleMutationVariables,
  APITypes.UpdatePermissionPerRoleMutation
>;
export const updatePrice = /* GraphQL */ `mutation UpdatePrice(
  $condition: ModelPriceConditionInput
  $input: UpdatePriceInput!
) {
  updatePrice(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    InstallationInput {
      conductorCrossSection
      createdAt
      description
      detail
      installationInputId
      installationRecipeId
      unit
      updatedAt
      __typename
    }
    Product {
      brand
      createdAt
      description
      detail
      potence
      productId
      type
      unit
      updatedAt
      __typename
    }
    ShoppingCartDetails {
      nextToken
      __typename
    }
    cost
    createdAt
    endDate
    installationInputId
    priceId
    productId
    startDate
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePriceMutationVariables,
  APITypes.UpdatePriceMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $condition: ModelProductConditionInput
  $input: UpdateProductInput!
) {
  updateProduct(condition: $condition, input: $input) {
    EstimateDetails {
      nextToken
      __typename
    }
    Prices {
      nextToken
      __typename
    }
    Recipes {
      nextToken
      __typename
    }
    brand
    createdAt
    description
    detail
    potence
    productId
    type
    unit
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const updateRole = /* GraphQL */ `mutation UpdateRole(
  $condition: ModelRoleConditionInput
  $input: UpdateRoleInput!
) {
  updateRole(condition: $condition, input: $input) {
    PermissionPerRole {
      nextToken
      __typename
    }
    createdAt
    displayName
    icon
    name
    roleId
    updatedAt
    users {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRoleMutationVariables,
  APITypes.UpdateRoleMutation
>;
export const updateShoppingCart = /* GraphQL */ `mutation UpdateShoppingCart(
  $condition: ModelShoppingCartConditionInput
  $input: UpdateShoppingCartInput!
) {
  updateShoppingCart(condition: $condition, input: $input) {
    Discounts {
      nextToken
      __typename
    }
    Estimate {
      TE6Cost
      boardAndAssemblyCost
      cableingCost
      canalizationCost
      chargerBrand
      chargerCost
      chargerModel
      chargerPotence
      createdAt
      distanceBPC
      distanceExposed
      distanceUnderground
      electricRoomFloorNumber
      electricalProtectionCost
      energicaMargin
      energicaMarginCost
      energicaNetCost
      estimateId
      formId
      groundWebMeasurementCost
      hasTireStops
      installationRecipeId
      installedFromAppartment
      isApproved
      isHouse
      isUnderground
      manpowerCost
      materialsCost
      needsElectricPoles
      netCost
      numberOfBends
      numberOfChargers
      numberOfInstallers
      numberOfManDays
      numberOfWallBreaches
      otherInstallationCosts
      parkingFloorNumber
      preChanneledDistance
      stateValidation
      totalInstallationGross
      undergroundDistance
      updatedAt
      vat
      vatPercentage
      vehicleBrand
      vehicleModel
      __typename
    }
    PaymentTransaction {
      accounting_date
      amount
      authorization_code
      buy_order
      card_detail
      card_number
      createdAt
      date
      glosa
      installments_amount
      installments_number
      paymentTransactionId
      payment_type_code
      paymentsProcessorCommission
      response_code
      session_id
      shoppingCartId
      status
      token
      transaction_date
      updatedAt
      usersPaymentTransactionsId
      vci
      __typename
    }
    ShoppingCartDetails {
      nextToken
      __typename
    }
    createdAt
    estimateId
    paymentMethod
    paymentTransactionId
    shoppingCartId
    status
    totalPrice
    updatedAt
    vat
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateShoppingCartMutationVariables,
  APITypes.UpdateShoppingCartMutation
>;
export const updateShoppingCartDetail = /* GraphQL */ `mutation UpdateShoppingCartDetail(
  $condition: ModelShoppingCartDetailConditionInput
  $input: UpdateShoppingCartDetailInput!
) {
  updateShoppingCartDetail(condition: $condition, input: $input) {
    EstimateDetail {
      createdAt
      estimateDetailId
      estimateId
      installationInputId
      priceId
      productId
      quantity
      state
      totalPrice
      type
      unit
      unitPrice
      updatedAt
      __typename
    }
    Price {
      cost
      createdAt
      endDate
      installationInputId
      priceId
      productId
      startDate
      status
      updatedAt
      __typename
    }
    ShoppingCart {
      createdAt
      estimateId
      paymentMethod
      paymentTransactionId
      shoppingCartId
      status
      totalPrice
      updatedAt
      vat
      __typename
    }
    createdAt
    estimateDetailId
    price
    priceId
    shoppingCartDetailId
    shoppingCartId
    typeOfItem
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateShoppingCartDetailMutationVariables,
  APITypes.UpdateShoppingCartDetailMutation
>;
export const updateSupportTicket = /* GraphQL */ `mutation UpdateSupportTicket(
  $condition: ModelSupportTicketConditionInput
  $input: UpdateSupportTicketInput!
) {
  updateSupportTicket(condition: $condition, input: $input) {
    AssignedEmployee {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    Solicitant {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    TicketComments {
      nextToken
      __typename
    }
    createdAt
    date
    description
    email
    employeeId
    eveId
    lastModificationUser
    level
    name
    phoneNumber
    solicitantId
    statusTicket
    supportTicketId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSupportTicketMutationVariables,
  APITypes.UpdateSupportTicketMutation
>;
export const updateTicketComment = /* GraphQL */ `mutation UpdateTicketComment(
  $condition: ModelTicketCommentConditionInput
  $input: UpdateTicketCommentInput!
) {
  updateTicketComment(condition: $condition, input: $input) {
    SupportTicket {
      createdAt
      date
      description
      email
      employeeId
      eveId
      lastModificationUser
      level
      name
      phoneNumber
      solicitantId
      statusTicket
      supportTicketId
      updatedAt
      __typename
    }
    User {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    canClientSeeComment
    createdAt
    isEnergica
    message
    supportTicketId
    ticketCommentId
    typeOfUser
    updatedAt
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTicketCommentMutationVariables,
  APITypes.UpdateTicketCommentMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
    CalendarVisits {
      nextToken
      __typename
    }
    Company {
      companyId
      createdAt
      name
      updatedAt
      __typename
    }
    RequestedTickets {
      nextToken
      __typename
    }
    ResolveTickest {
      nextToken
      __typename
    }
    Role {
      createdAt
      displayName
      icon
      name
      roleId
      updatedAt
      __typename
    }
    TicketComments {
      nextToken
      __typename
    }
    companyId
    createdAt
    name
    roleId
    updatedAt
    userId
    validated
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const webpayCommit = /* GraphQL */ `mutation WebpayCommit($token: String!) {
  webpayCommit(token: $token) {
    buy_order
    email
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.WebpayCommitMutationVariables,
  APITypes.WebpayCommitMutation
>;
export const webpayStart = /* GraphQL */ `mutation WebpayStart($amount: Int!, $glosa: String!, $userId: String) {
  webpayStart(amount: $amount, glosa: $glosa, userId: $userId) {
    order
    token
    url
    __typename
  }
}
` as GeneratedMutation<
  APITypes.WebpayStartMutationVariables,
  APITypes.WebpayStartMutation
>;
export const webpayStatus = /* GraphQL */ `mutation WebpayStatus($token: String!) {
  webpayStatus(token: $token) {
    amount
    buy_order
    card_number
    email
    glosa
    message
    paymentTransactionId
    payment_type_code
    status
    usersPaymentTransactionsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.WebpayStatusMutationVariables,
  APITypes.WebpayStatusMutation
>;
