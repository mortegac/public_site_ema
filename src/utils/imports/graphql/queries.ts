/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCalendarVisit = /* GraphQL */ `query GetCalendarVisit($calendarId: ID!) {
  getCalendarVisit(calendarId: $calendarId) {
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
` as GeneratedQuery<
  APITypes.GetCalendarVisitQueryVariables,
  APITypes.GetCalendarVisitQuery
>;
export const getClientForm = /* GraphQL */ `query GetClientForm($formId: ID!) {
  getClientForm(formId: $formId) {
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
` as GeneratedQuery<
  APITypes.GetClientFormQueryVariables,
  APITypes.GetClientFormQuery
>;
export const getCompany = /* GraphQL */ `query GetCompany($companyId: ID!) {
  getCompany(companyId: $companyId) {
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
` as GeneratedQuery<
  APITypes.GetCompanyQueryVariables,
  APITypes.GetCompanyQuery
>;
export const getCustomer = /* GraphQL */ `query GetCustomer($id: ID!) {
  getCustomer(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCustomerQueryVariables,
  APITypes.GetCustomerQuery
>;
export const getDiscount = /* GraphQL */ `query GetDiscount($discountId: ID!) {
  getDiscount(discountId: $discountId) {
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
` as GeneratedQuery<
  APITypes.GetDiscountQueryVariables,
  APITypes.GetDiscountQuery
>;
export const getDiscountShoppingCart = /* GraphQL */ `query GetDiscountShoppingCart($discountId: ID!, $shoppingCartId: ID!) {
  getDiscountShoppingCart(
    discountId: $discountId
    shoppingCartId: $shoppingCartId
  ) {
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
` as GeneratedQuery<
  APITypes.GetDiscountShoppingCartQueryVariables,
  APITypes.GetDiscountShoppingCartQuery
>;
export const getEstimate = /* GraphQL */ `query GetEstimate($estimateId: ID!) {
  getEstimate(estimateId: $estimateId) {
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
` as GeneratedQuery<
  APITypes.GetEstimateQueryVariables,
  APITypes.GetEstimateQuery
>;
export const getEstimateDetail = /* GraphQL */ `query GetEstimateDetail($estimateDetailId: ID!) {
  getEstimateDetail(estimateDetailId: $estimateDetailId) {
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
` as GeneratedQuery<
  APITypes.GetEstimateDetailQueryVariables,
  APITypes.GetEstimateDetailQuery
>;
export const getInstallationInput = /* GraphQL */ `query GetInstallationInput($installationInputId: ID!) {
  getInstallationInput(installationInputId: $installationInputId) {
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
` as GeneratedQuery<
  APITypes.GetInstallationInputQueryVariables,
  APITypes.GetInstallationInputQuery
>;
export const getInstallationInputRel = /* GraphQL */ `query GetInstallationInputRel(
  $installationInputId: ID!
  $installationRecipeId: ID!
  $type: String!
) {
  getInstallationInputRel(
    installationInputId: $installationInputId
    installationRecipeId: $installationRecipeId
    type: $type
  ) {
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
` as GeneratedQuery<
  APITypes.GetInstallationInputRelQueryVariables,
  APITypes.GetInstallationInputRelQuery
>;
export const getInstallationProductRel = /* GraphQL */ `query GetInstallationProductRel($installationRecipeId: ID!, $productId: ID!) {
  getInstallationProductRel(
    installationRecipeId: $installationRecipeId
    productId: $productId
  ) {
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
` as GeneratedQuery<
  APITypes.GetInstallationProductRelQueryVariables,
  APITypes.GetInstallationProductRelQuery
>;
export const getInstallationRecipe = /* GraphQL */ `query GetInstallationRecipe($installationRecipeId: ID!) {
  getInstallationRecipe(installationRecipeId: $installationRecipeId) {
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
` as GeneratedQuery<
  APITypes.GetInstallationRecipeQueryVariables,
  APITypes.GetInstallationRecipeQuery
>;
export const getMetadata = /* GraphQL */ `query GetMetadata($metadataId: ID!) {
  getMetadata(metadataId: $metadataId) {
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
` as GeneratedQuery<
  APITypes.GetMetadataQueryVariables,
  APITypes.GetMetadataQuery
>;
export const getParameter = /* GraphQL */ `query GetParameter($parameterId: ID!) {
  getParameter(parameterId: $parameterId) {
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
` as GeneratedQuery<
  APITypes.GetParameterQueryVariables,
  APITypes.GetParameterQuery
>;
export const getParameterEnc = /* GraphQL */ `query GetParameterEnc($parameterEncId: ID!) {
  getParameterEnc(parameterEncId: $parameterEncId) {
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
` as GeneratedQuery<
  APITypes.GetParameterEncQueryVariables,
  APITypes.GetParameterEncQuery
>;
export const getPaymentTransaction = /* GraphQL */ `query GetPaymentTransaction($paymentTransactionId: ID!) {
  getPaymentTransaction(paymentTransactionId: $paymentTransactionId) {
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
` as GeneratedQuery<
  APITypes.GetPaymentTransactionQueryVariables,
  APITypes.GetPaymentTransactionQuery
>;
export const getPermission = /* GraphQL */ `query GetPermission($permissionId: ID!) {
  getPermission(permissionId: $permissionId) {
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
` as GeneratedQuery<
  APITypes.GetPermissionQueryVariables,
  APITypes.GetPermissionQuery
>;
export const getPermissionPerRole = /* GraphQL */ `query GetPermissionPerRole($permissionId: ID!, $roleId: ID!) {
  getPermissionPerRole(permissionId: $permissionId, roleId: $roleId) {
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
` as GeneratedQuery<
  APITypes.GetPermissionPerRoleQueryVariables,
  APITypes.GetPermissionPerRoleQuery
>;
export const getPrice = /* GraphQL */ `query GetPrice($priceId: ID!) {
  getPrice(priceId: $priceId) {
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
` as GeneratedQuery<APITypes.GetPriceQueryVariables, APITypes.GetPriceQuery>;
export const getProduct = /* GraphQL */ `query GetProduct($productId: ID!) {
  getProduct(productId: $productId) {
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
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const getRole = /* GraphQL */ `query GetRole($roleId: ID!) {
  getRole(roleId: $roleId) {
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
` as GeneratedQuery<APITypes.GetRoleQueryVariables, APITypes.GetRoleQuery>;
export const getShoppingCart = /* GraphQL */ `query GetShoppingCart($shoppingCartId: ID!) {
  getShoppingCart(shoppingCartId: $shoppingCartId) {
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
` as GeneratedQuery<
  APITypes.GetShoppingCartQueryVariables,
  APITypes.GetShoppingCartQuery
>;
export const getShoppingCartDetail = /* GraphQL */ `query GetShoppingCartDetail($shoppingCartDetailId: ID!) {
  getShoppingCartDetail(shoppingCartDetailId: $shoppingCartDetailId) {
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
` as GeneratedQuery<
  APITypes.GetShoppingCartDetailQueryVariables,
  APITypes.GetShoppingCartDetailQuery
>;
export const getSupportTicket = /* GraphQL */ `query GetSupportTicket($supportTicketId: ID!) {
  getSupportTicket(supportTicketId: $supportTicketId) {
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
` as GeneratedQuery<
  APITypes.GetSupportTicketQueryVariables,
  APITypes.GetSupportTicketQuery
>;
export const getTicketComment = /* GraphQL */ `query GetTicketComment($ticketCommentId: ID!) {
  getTicketComment(ticketCommentId: $ticketCommentId) {
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
` as GeneratedQuery<
  APITypes.GetTicketCommentQueryVariables,
  APITypes.GetTicketCommentQuery
>;
export const getUser = /* GraphQL */ `query GetUser($userId: ID!) {
  getUser(userId: $userId) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listCalendarVisits = /* GraphQL */ `query ListCalendarVisits(
  $calendarId: ID
  $filter: ModelCalendarVisitFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCalendarVisits(
    calendarId: $calendarId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCalendarVisitsQueryVariables,
  APITypes.ListCalendarVisitsQuery
>;
export const listClientForms = /* GraphQL */ `query ListClientForms(
  $filter: ModelClientFormFilterInput
  $formId: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listClientForms(
    filter: $filter
    formId: $formId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListClientFormsQueryVariables,
  APITypes.ListClientFormsQuery
>;
export const listCompanies = /* GraphQL */ `query ListCompanies(
  $companyId: ID
  $filter: ModelCompanyFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCompanies(
    companyId: $companyId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      companyId
      createdAt
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCompaniesQueryVariables,
  APITypes.ListCompaniesQuery
>;
export const listCustomers = /* GraphQL */ `query ListCustomers(
  $filter: ModelCustomerFilterInput
  $limit: Int
  $nextToken: String
) {
  listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCustomersQueryVariables,
  APITypes.ListCustomersQuery
>;
export const listDiscountShoppingCarts = /* GraphQL */ `query ListDiscountShoppingCarts(
  $discountId: ID
  $filter: ModelDiscountShoppingCartFilterInput
  $limit: Int
  $nextToken: String
  $shoppingCartId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
) {
  listDiscountShoppingCarts(
    discountId: $discountId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    shoppingCartId: $shoppingCartId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      discountId
      shoppingCartId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDiscountShoppingCartsQueryVariables,
  APITypes.ListDiscountShoppingCartsQuery
>;
export const listDiscounts = /* GraphQL */ `query ListDiscounts(
  $discountId: ID
  $filter: ModelDiscountFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDiscounts(
    discountId: $discountId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      discountId
      flatAmount
      name
      percentage
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDiscountsQueryVariables,
  APITypes.ListDiscountsQuery
>;
export const listEstimateDetails = /* GraphQL */ `query ListEstimateDetails(
  $estimateDetailId: ID
  $filter: ModelEstimateDetailFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listEstimateDetails(
    estimateDetailId: $estimateDetailId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEstimateDetailsQueryVariables,
  APITypes.ListEstimateDetailsQuery
>;
export const listEstimates = /* GraphQL */ `query ListEstimates(
  $estimateId: ID
  $filter: ModelEstimateFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listEstimates(
    estimateId: $estimateId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEstimatesQueryVariables,
  APITypes.ListEstimatesQuery
>;
export const listInstallationInputRels = /* GraphQL */ `query ListInstallationInputRels(
  $filter: ModelInstallationInputRelFilterInput
  $installationInputId: ID
  $installationRecipeIdType: ModelInstallationInputRelPrimaryCompositeKeyConditionInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listInstallationInputRels(
    filter: $filter
    installationInputId: $installationInputId
    installationRecipeIdType: $installationRecipeIdType
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInstallationInputRelsQueryVariables,
  APITypes.ListInstallationInputRelsQuery
>;
export const listInstallationInputs = /* GraphQL */ `query ListInstallationInputs(
  $filter: ModelInstallationInputFilterInput
  $installationInputId: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listInstallationInputs(
    filter: $filter
    installationInputId: $installationInputId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInstallationInputsQueryVariables,
  APITypes.ListInstallationInputsQuery
>;
export const listInstallationProductRels = /* GraphQL */ `query ListInstallationProductRels(
  $filter: ModelInstallationProductRelFilterInput
  $installationRecipeId: ID
  $limit: Int
  $nextToken: String
  $productId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
) {
  listInstallationProductRels(
    filter: $filter
    installationRecipeId: $installationRecipeId
    limit: $limit
    nextToken: $nextToken
    productId: $productId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      installationRecipeId
      productId
      quantity
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInstallationProductRelsQueryVariables,
  APITypes.ListInstallationProductRelsQuery
>;
export const listInstallationRecipes = /* GraphQL */ `query ListInstallationRecipes(
  $filter: ModelInstallationRecipeFilterInput
  $installationRecipeId: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listInstallationRecipes(
    filter: $filter
    installationRecipeId: $installationRecipeId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      installationRecipeId
      isHouse
      isUnderground
      name
      potence
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInstallationRecipesQueryVariables,
  APITypes.ListInstallationRecipesQuery
>;
export const listMetadata = /* GraphQL */ `query ListMetadata(
  $filter: ModelMetadataFilterInput
  $limit: Int
  $metadataId: ID
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMetadata(
    filter: $filter
    limit: $limit
    metadataId: $metadataId
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      key
      metadataId
      parameterId
      updatedAt
      value
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMetadataQueryVariables,
  APITypes.ListMetadataQuery
>;
export const listParameterEncs = /* GraphQL */ `query ListParameterEncs(
  $filter: ModelParameterEncFilterInput
  $limit: Int
  $nextToken: String
  $parameterEncId: ID
  $sortDirection: ModelSortDirection
) {
  listParameterEncs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    parameterEncId: $parameterEncId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      description
      parameterEncId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListParameterEncsQueryVariables,
  APITypes.ListParameterEncsQuery
>;
export const listParameters = /* GraphQL */ `query ListParameters(
  $filter: ModelParameterFilterInput
  $limit: Int
  $nextToken: String
  $parameterId: ID
  $sortDirection: ModelSortDirection
) {
  listParameters(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    parameterId: $parameterId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      label
      parameterEncId
      parameterId
      updatedAt
      value
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListParametersQueryVariables,
  APITypes.ListParametersQuery
>;
export const listPaymentTransactionByToken = /* GraphQL */ `query ListPaymentTransactionByToken(
  $filter: ModelPaymentTransactionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $token: ID!
) {
  listPaymentTransactionByToken(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    token: $token
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPaymentTransactionByTokenQueryVariables,
  APITypes.ListPaymentTransactionByTokenQuery
>;
export const listPaymentTransactions = /* GraphQL */ `query ListPaymentTransactions(
  $filter: ModelPaymentTransactionFilterInput
  $limit: Int
  $nextToken: String
  $paymentTransactionId: ID
  $sortDirection: ModelSortDirection
) {
  listPaymentTransactions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    paymentTransactionId: $paymentTransactionId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPaymentTransactionsQueryVariables,
  APITypes.ListPaymentTransactionsQuery
>;
export const listPermissionPerRoles = /* GraphQL */ `query ListPermissionPerRoles(
  $filter: ModelPermissionPerRoleFilterInput
  $limit: Int
  $nextToken: String
  $permissionId: ModelIDKeyConditionInput
  $roleId: ID
  $sortDirection: ModelSortDirection
) {
  listPermissionPerRoles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    permissionId: $permissionId
    roleId: $roleId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      permissionId
      roleId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPermissionPerRolesQueryVariables,
  APITypes.ListPermissionPerRolesQuery
>;
export const listPermissions = /* GraphQL */ `query ListPermissions(
  $filter: ModelPermissionFilterInput
  $limit: Int
  $nextToken: String
  $permissionId: ID
  $sortDirection: ModelSortDirection
) {
  listPermissions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    permissionId: $permissionId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPermissionsQueryVariables,
  APITypes.ListPermissionsQuery
>;
export const listPriceByInstallationInputIdAndStartDate = /* GraphQL */ `query ListPriceByInstallationInputIdAndStartDate(
  $filter: ModelPriceFilterInput
  $installationInputId: ID!
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $startDate: ModelStringKeyConditionInput
) {
  listPriceByInstallationInputIdAndStartDate(
    filter: $filter
    installationInputId: $installationInputId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    startDate: $startDate
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPriceByInstallationInputIdAndStartDateQueryVariables,
  APITypes.ListPriceByInstallationInputIdAndStartDateQuery
>;
export const listPriceByProductIdAndStartDate = /* GraphQL */ `query ListPriceByProductIdAndStartDate(
  $filter: ModelPriceFilterInput
  $limit: Int
  $nextToken: String
  $productId: ID!
  $sortDirection: ModelSortDirection
  $startDate: ModelStringKeyConditionInput
) {
  listPriceByProductIdAndStartDate(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    productId: $productId
    sortDirection: $sortDirection
    startDate: $startDate
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPriceByProductIdAndStartDateQueryVariables,
  APITypes.ListPriceByProductIdAndStartDateQuery
>;
export const listPrices = /* GraphQL */ `query ListPrices(
  $filter: ModelPriceFilterInput
  $limit: Int
  $nextToken: String
  $priceId: ID
  $sortDirection: ModelSortDirection
) {
  listPrices(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    priceId: $priceId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPricesQueryVariables,
  APITypes.ListPricesQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
  $productId: ID
  $sortDirection: ModelSortDirection
) {
  listProducts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    productId: $productId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
export const listRoles = /* GraphQL */ `query ListRoles(
  $filter: ModelRoleFilterInput
  $limit: Int
  $nextToken: String
  $roleId: ID
  $sortDirection: ModelSortDirection
) {
  listRoles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    roleId: $roleId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      displayName
      icon
      name
      roleId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRolesQueryVariables, APITypes.ListRolesQuery>;
export const listShoppingCartDetails = /* GraphQL */ `query ListShoppingCartDetails(
  $filter: ModelShoppingCartDetailFilterInput
  $limit: Int
  $nextToken: String
  $shoppingCartDetailId: ID
  $sortDirection: ModelSortDirection
) {
  listShoppingCartDetails(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    shoppingCartDetailId: $shoppingCartDetailId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListShoppingCartDetailsQueryVariables,
  APITypes.ListShoppingCartDetailsQuery
>;
export const listShoppingCarts = /* GraphQL */ `query ListShoppingCarts(
  $filter: ModelShoppingCartFilterInput
  $limit: Int
  $nextToken: String
  $shoppingCartId: ID
  $sortDirection: ModelSortDirection
) {
  listShoppingCarts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    shoppingCartId: $shoppingCartId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListShoppingCartsQueryVariables,
  APITypes.ListShoppingCartsQuery
>;
export const listSupportTickets = /* GraphQL */ `query ListSupportTickets(
  $filter: ModelSupportTicketFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $supportTicketId: ID
) {
  listSupportTickets(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    supportTicketId: $supportTicketId
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSupportTicketsQueryVariables,
  APITypes.ListSupportTicketsQuery
>;
export const listTicketComments = /* GraphQL */ `query ListTicketComments(
  $filter: ModelTicketCommentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $ticketCommentId: ID
) {
  listTicketComments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    ticketCommentId: $ticketCommentId
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTicketCommentsQueryVariables,
  APITypes.ListTicketCommentsQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userId: ID
) {
  listUsers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
      companyId
      createdAt
      name
      roleId
      updatedAt
      userId
      validated
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
