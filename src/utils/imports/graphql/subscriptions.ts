/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCalendarVisit = /* GraphQL */ `subscription OnCreateCalendarVisit(
  $filter: ModelSubscriptionCalendarVisitFilterInput
) {
  onCreateCalendarVisit(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCalendarVisitSubscriptionVariables,
  APITypes.OnCreateCalendarVisitSubscription
>;
export const onCreateClientForm = /* GraphQL */ `subscription OnCreateClientForm(
  $filter: ModelSubscriptionClientFormFilterInput
) {
  onCreateClientForm(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateClientFormSubscriptionVariables,
  APITypes.OnCreateClientFormSubscription
>;
export const onCreateCompany = /* GraphQL */ `subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onCreateCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCompanySubscriptionVariables,
  APITypes.OnCreateCompanySubscription
>;
export const onCreateCustomer = /* GraphQL */ `subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
  onCreateCustomer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCustomerSubscriptionVariables,
  APITypes.OnCreateCustomerSubscription
>;
export const onCreateDiscount = /* GraphQL */ `subscription OnCreateDiscount($filter: ModelSubscriptionDiscountFilterInput) {
  onCreateDiscount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateDiscountSubscriptionVariables,
  APITypes.OnCreateDiscountSubscription
>;
export const onCreateDiscountShoppingCart = /* GraphQL */ `subscription OnCreateDiscountShoppingCart(
  $filter: ModelSubscriptionDiscountShoppingCartFilterInput
) {
  onCreateDiscountShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateDiscountShoppingCartSubscriptionVariables,
  APITypes.OnCreateDiscountShoppingCartSubscription
>;
export const onCreateEstimate = /* GraphQL */ `subscription OnCreateEstimate($filter: ModelSubscriptionEstimateFilterInput) {
  onCreateEstimate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEstimateSubscriptionVariables,
  APITypes.OnCreateEstimateSubscription
>;
export const onCreateEstimateDetail = /* GraphQL */ `subscription OnCreateEstimateDetail(
  $filter: ModelSubscriptionEstimateDetailFilterInput
) {
  onCreateEstimateDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEstimateDetailSubscriptionVariables,
  APITypes.OnCreateEstimateDetailSubscription
>;
export const onCreateInstallationInput = /* GraphQL */ `subscription OnCreateInstallationInput(
  $filter: ModelSubscriptionInstallationInputFilterInput
) {
  onCreateInstallationInput(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInstallationInputSubscriptionVariables,
  APITypes.OnCreateInstallationInputSubscription
>;
export const onCreateInstallationInputRel = /* GraphQL */ `subscription OnCreateInstallationInputRel(
  $filter: ModelSubscriptionInstallationInputRelFilterInput
) {
  onCreateInstallationInputRel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInstallationInputRelSubscriptionVariables,
  APITypes.OnCreateInstallationInputRelSubscription
>;
export const onCreateInstallationProductRel = /* GraphQL */ `subscription OnCreateInstallationProductRel(
  $filter: ModelSubscriptionInstallationProductRelFilterInput
) {
  onCreateInstallationProductRel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInstallationProductRelSubscriptionVariables,
  APITypes.OnCreateInstallationProductRelSubscription
>;
export const onCreateInstallationRecipe = /* GraphQL */ `subscription OnCreateInstallationRecipe(
  $filter: ModelSubscriptionInstallationRecipeFilterInput
) {
  onCreateInstallationRecipe(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInstallationRecipeSubscriptionVariables,
  APITypes.OnCreateInstallationRecipeSubscription
>;
export const onCreateMetadata = /* GraphQL */ `subscription OnCreateMetadata($filter: ModelSubscriptionMetadataFilterInput) {
  onCreateMetadata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMetadataSubscriptionVariables,
  APITypes.OnCreateMetadataSubscription
>;
export const onCreateParameter = /* GraphQL */ `subscription OnCreateParameter($filter: ModelSubscriptionParameterFilterInput) {
  onCreateParameter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateParameterSubscriptionVariables,
  APITypes.OnCreateParameterSubscription
>;
export const onCreateParameterEnc = /* GraphQL */ `subscription OnCreateParameterEnc(
  $filter: ModelSubscriptionParameterEncFilterInput
) {
  onCreateParameterEnc(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateParameterEncSubscriptionVariables,
  APITypes.OnCreateParameterEncSubscription
>;
export const onCreatePaymentTransaction = /* GraphQL */ `subscription OnCreatePaymentTransaction(
  $filter: ModelSubscriptionPaymentTransactionFilterInput
) {
  onCreatePaymentTransaction(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePaymentTransactionSubscriptionVariables,
  APITypes.OnCreatePaymentTransactionSubscription
>;
export const onCreatePermission = /* GraphQL */ `subscription OnCreatePermission(
  $filter: ModelSubscriptionPermissionFilterInput
) {
  onCreatePermission(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePermissionSubscriptionVariables,
  APITypes.OnCreatePermissionSubscription
>;
export const onCreatePermissionPerRole = /* GraphQL */ `subscription OnCreatePermissionPerRole(
  $filter: ModelSubscriptionPermissionPerRoleFilterInput
) {
  onCreatePermissionPerRole(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePermissionPerRoleSubscriptionVariables,
  APITypes.OnCreatePermissionPerRoleSubscription
>;
export const onCreatePrice = /* GraphQL */ `subscription OnCreatePrice($filter: ModelSubscriptionPriceFilterInput) {
  onCreatePrice(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePriceSubscriptionVariables,
  APITypes.OnCreatePriceSubscription
>;
export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
  onCreateProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onCreateRole = /* GraphQL */ `subscription OnCreateRole($filter: ModelSubscriptionRoleFilterInput) {
  onCreateRole(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRoleSubscriptionVariables,
  APITypes.OnCreateRoleSubscription
>;
export const onCreateShoppingCart = /* GraphQL */ `subscription OnCreateShoppingCart(
  $filter: ModelSubscriptionShoppingCartFilterInput
) {
  onCreateShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateShoppingCartSubscriptionVariables,
  APITypes.OnCreateShoppingCartSubscription
>;
export const onCreateShoppingCartDetail = /* GraphQL */ `subscription OnCreateShoppingCartDetail(
  $filter: ModelSubscriptionShoppingCartDetailFilterInput
) {
  onCreateShoppingCartDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateShoppingCartDetailSubscriptionVariables,
  APITypes.OnCreateShoppingCartDetailSubscription
>;
export const onCreateSupportTicket = /* GraphQL */ `subscription OnCreateSupportTicket(
  $filter: ModelSubscriptionSupportTicketFilterInput
) {
  onCreateSupportTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSupportTicketSubscriptionVariables,
  APITypes.OnCreateSupportTicketSubscription
>;
export const onCreateTicketComment = /* GraphQL */ `subscription OnCreateTicketComment(
  $filter: ModelSubscriptionTicketCommentFilterInput
) {
  onCreateTicketComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTicketCommentSubscriptionVariables,
  APITypes.OnCreateTicketCommentSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteCalendarVisit = /* GraphQL */ `subscription OnDeleteCalendarVisit(
  $filter: ModelSubscriptionCalendarVisitFilterInput
) {
  onDeleteCalendarVisit(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCalendarVisitSubscriptionVariables,
  APITypes.OnDeleteCalendarVisitSubscription
>;
export const onDeleteClientForm = /* GraphQL */ `subscription OnDeleteClientForm(
  $filter: ModelSubscriptionClientFormFilterInput
) {
  onDeleteClientForm(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteClientFormSubscriptionVariables,
  APITypes.OnDeleteClientFormSubscription
>;
export const onDeleteCompany = /* GraphQL */ `subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onDeleteCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCompanySubscriptionVariables,
  APITypes.OnDeleteCompanySubscription
>;
export const onDeleteCustomer = /* GraphQL */ `subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
  onDeleteCustomer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCustomerSubscriptionVariables,
  APITypes.OnDeleteCustomerSubscription
>;
export const onDeleteDiscount = /* GraphQL */ `subscription OnDeleteDiscount($filter: ModelSubscriptionDiscountFilterInput) {
  onDeleteDiscount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteDiscountSubscriptionVariables,
  APITypes.OnDeleteDiscountSubscription
>;
export const onDeleteDiscountShoppingCart = /* GraphQL */ `subscription OnDeleteDiscountShoppingCart(
  $filter: ModelSubscriptionDiscountShoppingCartFilterInput
) {
  onDeleteDiscountShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteDiscountShoppingCartSubscriptionVariables,
  APITypes.OnDeleteDiscountShoppingCartSubscription
>;
export const onDeleteEstimate = /* GraphQL */ `subscription OnDeleteEstimate($filter: ModelSubscriptionEstimateFilterInput) {
  onDeleteEstimate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEstimateSubscriptionVariables,
  APITypes.OnDeleteEstimateSubscription
>;
export const onDeleteEstimateDetail = /* GraphQL */ `subscription OnDeleteEstimateDetail(
  $filter: ModelSubscriptionEstimateDetailFilterInput
) {
  onDeleteEstimateDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEstimateDetailSubscriptionVariables,
  APITypes.OnDeleteEstimateDetailSubscription
>;
export const onDeleteInstallationInput = /* GraphQL */ `subscription OnDeleteInstallationInput(
  $filter: ModelSubscriptionInstallationInputFilterInput
) {
  onDeleteInstallationInput(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInstallationInputSubscriptionVariables,
  APITypes.OnDeleteInstallationInputSubscription
>;
export const onDeleteInstallationInputRel = /* GraphQL */ `subscription OnDeleteInstallationInputRel(
  $filter: ModelSubscriptionInstallationInputRelFilterInput
) {
  onDeleteInstallationInputRel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInstallationInputRelSubscriptionVariables,
  APITypes.OnDeleteInstallationInputRelSubscription
>;
export const onDeleteInstallationProductRel = /* GraphQL */ `subscription OnDeleteInstallationProductRel(
  $filter: ModelSubscriptionInstallationProductRelFilterInput
) {
  onDeleteInstallationProductRel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInstallationProductRelSubscriptionVariables,
  APITypes.OnDeleteInstallationProductRelSubscription
>;
export const onDeleteInstallationRecipe = /* GraphQL */ `subscription OnDeleteInstallationRecipe(
  $filter: ModelSubscriptionInstallationRecipeFilterInput
) {
  onDeleteInstallationRecipe(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInstallationRecipeSubscriptionVariables,
  APITypes.OnDeleteInstallationRecipeSubscription
>;
export const onDeleteMetadata = /* GraphQL */ `subscription OnDeleteMetadata($filter: ModelSubscriptionMetadataFilterInput) {
  onDeleteMetadata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMetadataSubscriptionVariables,
  APITypes.OnDeleteMetadataSubscription
>;
export const onDeleteParameter = /* GraphQL */ `subscription OnDeleteParameter($filter: ModelSubscriptionParameterFilterInput) {
  onDeleteParameter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteParameterSubscriptionVariables,
  APITypes.OnDeleteParameterSubscription
>;
export const onDeleteParameterEnc = /* GraphQL */ `subscription OnDeleteParameterEnc(
  $filter: ModelSubscriptionParameterEncFilterInput
) {
  onDeleteParameterEnc(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteParameterEncSubscriptionVariables,
  APITypes.OnDeleteParameterEncSubscription
>;
export const onDeletePaymentTransaction = /* GraphQL */ `subscription OnDeletePaymentTransaction(
  $filter: ModelSubscriptionPaymentTransactionFilterInput
) {
  onDeletePaymentTransaction(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePaymentTransactionSubscriptionVariables,
  APITypes.OnDeletePaymentTransactionSubscription
>;
export const onDeletePermission = /* GraphQL */ `subscription OnDeletePermission(
  $filter: ModelSubscriptionPermissionFilterInput
) {
  onDeletePermission(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePermissionSubscriptionVariables,
  APITypes.OnDeletePermissionSubscription
>;
export const onDeletePermissionPerRole = /* GraphQL */ `subscription OnDeletePermissionPerRole(
  $filter: ModelSubscriptionPermissionPerRoleFilterInput
) {
  onDeletePermissionPerRole(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePermissionPerRoleSubscriptionVariables,
  APITypes.OnDeletePermissionPerRoleSubscription
>;
export const onDeletePrice = /* GraphQL */ `subscription OnDeletePrice($filter: ModelSubscriptionPriceFilterInput) {
  onDeletePrice(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePriceSubscriptionVariables,
  APITypes.OnDeletePriceSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
  onDeleteProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
export const onDeleteRole = /* GraphQL */ `subscription OnDeleteRole($filter: ModelSubscriptionRoleFilterInput) {
  onDeleteRole(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRoleSubscriptionVariables,
  APITypes.OnDeleteRoleSubscription
>;
export const onDeleteShoppingCart = /* GraphQL */ `subscription OnDeleteShoppingCart(
  $filter: ModelSubscriptionShoppingCartFilterInput
) {
  onDeleteShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteShoppingCartSubscriptionVariables,
  APITypes.OnDeleteShoppingCartSubscription
>;
export const onDeleteShoppingCartDetail = /* GraphQL */ `subscription OnDeleteShoppingCartDetail(
  $filter: ModelSubscriptionShoppingCartDetailFilterInput
) {
  onDeleteShoppingCartDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteShoppingCartDetailSubscriptionVariables,
  APITypes.OnDeleteShoppingCartDetailSubscription
>;
export const onDeleteSupportTicket = /* GraphQL */ `subscription OnDeleteSupportTicket(
  $filter: ModelSubscriptionSupportTicketFilterInput
) {
  onDeleteSupportTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSupportTicketSubscriptionVariables,
  APITypes.OnDeleteSupportTicketSubscription
>;
export const onDeleteTicketComment = /* GraphQL */ `subscription OnDeleteTicketComment(
  $filter: ModelSubscriptionTicketCommentFilterInput
) {
  onDeleteTicketComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTicketCommentSubscriptionVariables,
  APITypes.OnDeleteTicketCommentSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateCalendarVisit = /* GraphQL */ `subscription OnUpdateCalendarVisit(
  $filter: ModelSubscriptionCalendarVisitFilterInput
) {
  onUpdateCalendarVisit(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCalendarVisitSubscriptionVariables,
  APITypes.OnUpdateCalendarVisitSubscription
>;
export const onUpdateClientForm = /* GraphQL */ `subscription OnUpdateClientForm(
  $filter: ModelSubscriptionClientFormFilterInput
) {
  onUpdateClientForm(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateClientFormSubscriptionVariables,
  APITypes.OnUpdateClientFormSubscription
>;
export const onUpdateCompany = /* GraphQL */ `subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onUpdateCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCompanySubscriptionVariables,
  APITypes.OnUpdateCompanySubscription
>;
export const onUpdateCustomer = /* GraphQL */ `subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
  onUpdateCustomer(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCustomerSubscriptionVariables,
  APITypes.OnUpdateCustomerSubscription
>;
export const onUpdateDiscount = /* GraphQL */ `subscription OnUpdateDiscount($filter: ModelSubscriptionDiscountFilterInput) {
  onUpdateDiscount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateDiscountSubscriptionVariables,
  APITypes.OnUpdateDiscountSubscription
>;
export const onUpdateDiscountShoppingCart = /* GraphQL */ `subscription OnUpdateDiscountShoppingCart(
  $filter: ModelSubscriptionDiscountShoppingCartFilterInput
) {
  onUpdateDiscountShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateDiscountShoppingCartSubscriptionVariables,
  APITypes.OnUpdateDiscountShoppingCartSubscription
>;
export const onUpdateEstimate = /* GraphQL */ `subscription OnUpdateEstimate($filter: ModelSubscriptionEstimateFilterInput) {
  onUpdateEstimate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEstimateSubscriptionVariables,
  APITypes.OnUpdateEstimateSubscription
>;
export const onUpdateEstimateDetail = /* GraphQL */ `subscription OnUpdateEstimateDetail(
  $filter: ModelSubscriptionEstimateDetailFilterInput
) {
  onUpdateEstimateDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEstimateDetailSubscriptionVariables,
  APITypes.OnUpdateEstimateDetailSubscription
>;
export const onUpdateInstallationInput = /* GraphQL */ `subscription OnUpdateInstallationInput(
  $filter: ModelSubscriptionInstallationInputFilterInput
) {
  onUpdateInstallationInput(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInstallationInputSubscriptionVariables,
  APITypes.OnUpdateInstallationInputSubscription
>;
export const onUpdateInstallationInputRel = /* GraphQL */ `subscription OnUpdateInstallationInputRel(
  $filter: ModelSubscriptionInstallationInputRelFilterInput
) {
  onUpdateInstallationInputRel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInstallationInputRelSubscriptionVariables,
  APITypes.OnUpdateInstallationInputRelSubscription
>;
export const onUpdateInstallationProductRel = /* GraphQL */ `subscription OnUpdateInstallationProductRel(
  $filter: ModelSubscriptionInstallationProductRelFilterInput
) {
  onUpdateInstallationProductRel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInstallationProductRelSubscriptionVariables,
  APITypes.OnUpdateInstallationProductRelSubscription
>;
export const onUpdateInstallationRecipe = /* GraphQL */ `subscription OnUpdateInstallationRecipe(
  $filter: ModelSubscriptionInstallationRecipeFilterInput
) {
  onUpdateInstallationRecipe(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInstallationRecipeSubscriptionVariables,
  APITypes.OnUpdateInstallationRecipeSubscription
>;
export const onUpdateMetadata = /* GraphQL */ `subscription OnUpdateMetadata($filter: ModelSubscriptionMetadataFilterInput) {
  onUpdateMetadata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMetadataSubscriptionVariables,
  APITypes.OnUpdateMetadataSubscription
>;
export const onUpdateParameter = /* GraphQL */ `subscription OnUpdateParameter($filter: ModelSubscriptionParameterFilterInput) {
  onUpdateParameter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateParameterSubscriptionVariables,
  APITypes.OnUpdateParameterSubscription
>;
export const onUpdateParameterEnc = /* GraphQL */ `subscription OnUpdateParameterEnc(
  $filter: ModelSubscriptionParameterEncFilterInput
) {
  onUpdateParameterEnc(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateParameterEncSubscriptionVariables,
  APITypes.OnUpdateParameterEncSubscription
>;
export const onUpdatePaymentTransaction = /* GraphQL */ `subscription OnUpdatePaymentTransaction(
  $filter: ModelSubscriptionPaymentTransactionFilterInput
) {
  onUpdatePaymentTransaction(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePaymentTransactionSubscriptionVariables,
  APITypes.OnUpdatePaymentTransactionSubscription
>;
export const onUpdatePermission = /* GraphQL */ `subscription OnUpdatePermission(
  $filter: ModelSubscriptionPermissionFilterInput
) {
  onUpdatePermission(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePermissionSubscriptionVariables,
  APITypes.OnUpdatePermissionSubscription
>;
export const onUpdatePermissionPerRole = /* GraphQL */ `subscription OnUpdatePermissionPerRole(
  $filter: ModelSubscriptionPermissionPerRoleFilterInput
) {
  onUpdatePermissionPerRole(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePermissionPerRoleSubscriptionVariables,
  APITypes.OnUpdatePermissionPerRoleSubscription
>;
export const onUpdatePrice = /* GraphQL */ `subscription OnUpdatePrice($filter: ModelSubscriptionPriceFilterInput) {
  onUpdatePrice(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePriceSubscriptionVariables,
  APITypes.OnUpdatePriceSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
  onUpdateProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onUpdateRole = /* GraphQL */ `subscription OnUpdateRole($filter: ModelSubscriptionRoleFilterInput) {
  onUpdateRole(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRoleSubscriptionVariables,
  APITypes.OnUpdateRoleSubscription
>;
export const onUpdateShoppingCart = /* GraphQL */ `subscription OnUpdateShoppingCart(
  $filter: ModelSubscriptionShoppingCartFilterInput
) {
  onUpdateShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateShoppingCartSubscriptionVariables,
  APITypes.OnUpdateShoppingCartSubscription
>;
export const onUpdateShoppingCartDetail = /* GraphQL */ `subscription OnUpdateShoppingCartDetail(
  $filter: ModelSubscriptionShoppingCartDetailFilterInput
) {
  onUpdateShoppingCartDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateShoppingCartDetailSubscriptionVariables,
  APITypes.OnUpdateShoppingCartDetailSubscription
>;
export const onUpdateSupportTicket = /* GraphQL */ `subscription OnUpdateSupportTicket(
  $filter: ModelSubscriptionSupportTicketFilterInput
) {
  onUpdateSupportTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSupportTicketSubscriptionVariables,
  APITypes.OnUpdateSupportTicketSubscription
>;
export const onUpdateTicketComment = /* GraphQL */ `subscription OnUpdateTicketComment(
  $filter: ModelSubscriptionTicketCommentFilterInput
) {
  onUpdateTicketComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTicketCommentSubscriptionVariables,
  APITypes.OnUpdateTicketCommentSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
