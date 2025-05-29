import { type ClientSchema, a } from "@aws-amplify/backend";

/**
 * estandares de creacion de entidades,
 * las entidades/modelos estaran en ingles singular
 * las relaciones
 *  * las relaciones tendran el mismo nombre que la entidad a la que se relacionan,
 *  * la id de referencia sera el mismo de que la id de la entidad padre
 *
 */

export const MainSchema = a
.schema({
  User: a
    .model({
      userId: a.id().required(),
      name: a.string().required(),
      validated: a.boolean().default(false),
      roleId: a.id(),
      Role: a.belongsTo("Role", "roleId"),
      TimeSlots: a.hasMany("UserTimeSlot", "userId"),
      RequestedTickets: a.hasMany("SupportTicket", "solicitantId"),
      ResolveTickest: a.hasMany("SupportTicket", "employeeId"),
      TicketComments: a.hasMany("TicketComment", "userId"),
      CalendarVisits: a.hasMany("CalendarVisit", "userId"),
      companyId: a.id(),
      Company: a.belongsTo("Company", "companyId"),
    })
    .identifier(["userId"]),

  TimeSlot: a.customType({
    start: a.time(),
    end: a.time(),
  }),

  UserTimeSlot: a.model({
    userTimeSlotId: a.id().required(),
    day: a.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]), //1 - LUNES, 2 - MARTES ...
    timeAvailable: a.ref("TimeSlot").array(), // {start: HH:mm:ss:sss, end: HH:mm:ss:ssss}[]
    userId: a.id().required(),
    User: a.belongsTo("User", "userId"),
  }).identifier(["userTimeSlotId"]),

  Company: a
    .model({
      companyId: a.id().required(),
      name: a.string().required(),
      Users: a.hasMany("User", "companyId"),
    })
    .identifier(["companyId"]),

  Role: a
    .model({
      roleId: a.id().required(),
      name: a.string().required(),
      displayName: a.string().required(),
      icon: a.string().required(),
      users: a.hasMany("User", "roleId"),
      PermissionPerRole: a.hasMany("PermissionPerRole", "roleId"),
    })
    .identifier(["roleId"]),

  Permission: a
    .model({
      permissionId: a.id().required(),
      name: a.string().required(),
      displayName: a.string().required(),
      icon: a.string().required(),
      isVisible: a.boolean().default(true),
      order: a.integer().default(99),
      isLeaf: a.boolean(),
      padreId: a.id(),
      Padre: a.belongsTo("Permission", "padreId"),
      Submenu: a.hasMany("Permission", "padreId"),
      PermissionPerRole: a.hasMany("PermissionPerRole", "permissionId"),
    })
    .identifier(["permissionId"]),

  PermissionPerRole: a
    .model({
      roleId: a.id().required(),
      permissionId: a.id().required(),
      Permissions: a.belongsTo("Permission", "permissionId"),
      Roles: a.belongsTo("Role", "roleId"),
    })
    .identifier(["roleId", "permissionId"]),

  SupportTicket: a
    .model({
      supportTicketId: a.id().required(),
      date: a.datetime(),
      name: a.string(),
      description: a.string(),
      email: a.string(),
      phoneNumber: a.string(),
      eveId: a.id(),
      level: a.enum(["one", "two", "three"]),
      statusTicket: a.enum([
        "open",
        "in_progress",
        "resolved",
        "does_not_apply",
      ]),
      lastModificationUser: a.datetime(),
      TicketComments: a.hasMany("TicketComment", "supportTicketId"),
      employeeId: a.id(),
      AssignedEmployee: a.belongsTo("User", "employeeId"),
      solicitantId: a.id(),
      Solicitant: a.belongsTo("User", "solicitantId"),
    })
    .identifier(["supportTicketId"]),

  TicketComment: a
    .model({
      ticketCommentId: a.id().required(),
      message: a.string().required(),
      typeOfUser: a.enum(["internal", "client", "test"]),
      canClientSeeComment: a.boolean().default(false),
      isEnergica: a.boolean().default(false),
      supportTicketId: a.id(),
      SupportTicket: a.belongsTo("SupportTicket", "supportTicketId"),
      userId: a.id().required(),
      User: a.belongsTo("User", "userId"),
    })
    .identifier(["ticketCommentId"]),

  CalendarVisit: a.model({
    calendarId: a.id().required(),
    summary: a.string(),
    location: a.string(),
    description: a.string(),
    startDate: a.datetime(),
    endDate: a.datetime(),
    timeZone: a.string(),
    duration: a.integer(),
    state: a.enum([
      "available", // disponible
      "reserved", // reservada lo libera webpayStatus si falla
      "payed", // pagada  
      "payedAndAgended", // pagada y se genero en google calendar
      "error", // fallo
      "occupied", // no disponible
      "stale", // paso la fecha 
    ]),
    customerId: a.id(),
    Customer: a.belongsTo("Customer", "customerId"),
    userId: a.id(),
    User: a.belongsTo("User", "userId"),
  })
    .identifier(["calendarId"])
    .secondaryIndexes(index => [
      index('state').sortKeys(['startDate']).queryField("CalendarVisitsByState"),
    ]),

  Customer: a.model({
    customerId: a.id().required(), // definido como el email
    name: a.string().required(),
    phone: a.string().required(),
    address: a.string().default(""),
    city: a.string().default(""),
    state: a.string().default(""),
    zipCode: a.string().default(""),
    lat: a.string().default(""),
    long: a.string().default(""),
    zoomLevel: a.string().default("15"),
    ClientForm: a.hasMany("ClientForm", "customerId"),
    CalendarVisits: a.hasMany("CalendarVisit", "customerId"),
    Customer: a.hasMany("ShoppingCart", "customerId"),
  }).identifier(["customerId"]),

  ClientForm: a.model({
    formId: a.id().required(),
    //form client
    isWallbox: a.boolean().required(), // cotizacion x 7 y 3.5 kw
    isPortable: a.boolean().required(), // 2.2
    isHouse: a.boolean().required(),
    distance: a.float().required(),
    numberOfChargers: a.integer().default(1),
    //siempre sobrepuesto

    //relationships
    customerId: a.id(),
    Customer: a.belongsTo("Customer", "customerId"),
    Estimates: a.hasMany("Estimate", "formId"),
  })
    .identifier(["formId"]),


  Estimate: a.model({
    estimateId: a.id().required(),
    stateValidation: a.enum(["automated", "installerVerified", "installerModified"]),
    isApproved: a.boolean().default(false),

    //form installer
    isUnderground: a.boolean(), //para la automatica siempre sobrepuesto
    isHouse: a.boolean(),
    chargerPotence: a.float(),
    numberOfChargers: a.integer(),

    //form instalador
    distanceExposed: a.float(),
    distanceUnderground: a.float(), //lo q ya esta canalizado
    preChanneledDistance: a.float(),
    hasTireStops: a.boolean().default(false),
    vehicleModel: a.string().default(""),
    vehicleBrand: a.string().default(""),
    chargerBrand: a.string().default(""),
    chargerModel: a.string().default(""),
    numberOfBends: a.integer(),
    numberOfWallBreaches: a.integer(),
    numberOfInstallers: a.integer(),
    numberOfManDays: a.float(),

    //house
    undergroundDistance: a.float(),
    needsElectricPoles: a.boolean().default(false),

    //building
    //todas las instalaciones son sobrepuestas
    distanceBPC: a.float(),
    parkingFloorNumber: a.string(),
    installedFromAppartment: a.boolean(),
    electricRoomFloorNumber: a.string(),

    //cost start from here
    chargerCost: a.integer(), //costo cargadors
    otherInstallationCosts: a.integer(), // otros costos de instalacion
    materialsCost: a.integer(), //costo de materiales
    canalizationCost: a.integer(), //costo canalizacion
    cableingCost: a.integer(), //costo cableado
    electricalProtectionCost: a.integer(), //costo protecciones electricas //tablero Variable

    manpowerCost: a.integer(), //mano de obra + uso de vehiculo
    // el menor de la mano de obra o 30% de los materiales + uso de vehiculo
    TE6Cost: a.integer(), //costo TE6
    boardAndAssemblyCost: a.integer(), ///Tablero y montaje tablero fixe
    groundWebMeasurementCost: a.integer(), //medicion malla tierra

    energicaNetCost: a.integer(),//costo de lo q le costo a energica
    energicaMargin: a.float(), //22%
    energicaMarginCost: a.integer(), //valor margen energica
    netCost: a.integer(), //costo total sin iva + energica 
    vat: a.integer(), //vat
    vatPercentage: a.float(), //19%
    totalInstallationGross: a.integer(), //lo q ve el cliente, iva incluido

    //relationships
    EstimateDetail: a.hasMany("EstimateDetail", "estimateId"),
    installationRecipeId: a.id(),
    InstallationRecipe: a.belongsTo("InstallationRecipe", "installationRecipeId"),
    ShoppingCart: a.hasMany("ShoppingCart", "estimateId"),
    formId: a.id(),
    ClientForm: a.belongsTo("ClientForm", "formId"),
  })
    .identifier(["estimateId"]),

  EstimateDetail: a.model({
    estimateDetailId: a.id().required(),
    totalPrice: a.integer(),
    unitPrice: a.integer(),
    unit: a.string(),
    quantity: a.float(),
    type: a.string(),
    state: a.enum(["automated", "installerVerified", "installerModified"]),
    estimateId: a.id(),
    Estimate: a.belongsTo("Estimate", "estimateId"),
    priceId: a.id(),
    Price: a.belongsTo("Price", "priceId"),
    installationInputId: a.id(),
    InstallationInput: a.belongsTo("InstallationInput", "installationInputId"),
    productId: a.id(),
    Product: a.belongsTo("Product", "productId"),
    ShoppingCartDetail: a.hasMany("ShoppingCartDetail", "estimateDetailId"),
  })
    .identifier(["estimateDetailId"]),

  InstallationRecipe: a.model({
    installationRecipeId: a.id().required(),
    name: a.string().required(),
    isHouse: a.boolean().required(),
    isUnderground: a.boolean().required(),
    potence: a.float().required(),
    InstallationInputs: a.hasMany("InstallationInputRel", "installationRecipeId"),
    InstallationProducts: a.hasMany("InstallationProductRel", "installationRecipeId"),
    Estimates: a.hasMany("Estimate", "installationRecipeId"),
  }).identifier(["installationRecipeId"]),

  InstallationInputRel: a.model({
    quantity: a.float(),
    amountPerInstallationMeter: a.float().default(0),
    usagePercentage: a.float().default(1),
    type: a.string().required(),
    // "installation",
    // "cablingFixed",
    // "cablingVariable",
    // "channelingUnderground",
    // "channelingExposed",
    // "channelingSuperImposed",
    // "boardFixed",
    // "boardVariable",
    // "fixed",
    // "other"
    installationRecipeId: a.id().required(),
    InstallationRecipe: a.belongsTo("InstallationRecipe", "installationRecipeId"),
    installationInputId: a.id().required(),
    InstallationInput: a.belongsTo("InstallationInput", "installationInputId"),
  }).identifier(["installationInputId", "installationRecipeId", "type"]),

  InstallationInput: a.model({
    installationInputId: a.id().required(),
    description: a.string(),
    detail: a.string(),
    unit: a.string(),
    conductorCrossSection: a.float().default(0),
    installationRecipeId: a.id(),
    InstallationRecipe: a.hasMany("InstallationInputRel", "installationInputId"),
    EstimateDetails: a.hasMany("EstimateDetail", "installationInputId"),
    Prices: a.hasMany("Price", "installationInputId"),
  }).identifier(["installationInputId"]),

  InstallationProductRel: a.model({
    quantity: a.integer(),
    productId: a.id().required(),
    Product: a.belongsTo("Product", "productId"),
    installationRecipeId: a.id().required(),
    InstallationRecipe: a.belongsTo("InstallationRecipe", "installationRecipeId"),
  }).identifier(["installationRecipeId", "productId"]),

  Product: a.model({
    productId: a.id().required(),
    description: a.string(),
    detail: a.string(),
    unit: a.string(),
    brand: a.string(),
    potence: a.float(),
    type: a.string(),
    Prices: a.hasMany("Price", "productId"),
    Recipes: a.hasMany("InstallationProductRel", "productId"),
    EstimateDetails: a.hasMany("EstimateDetail", "productId"),
  })
    .identifier(["productId"]),

  Price: a.model({
    priceId: a.id().required(),
    cost: a.integer(),
    startDate: a.datetime(),
    endDate: a.datetime(),
    status: a.enum(["active", "deleted", "archived"]),
    productId: a.id(),
    Product: a.belongsTo("Product", "productId"),
    installationInputId: a.id(),
    InstallationInput: a.belongsTo("InstallationInput", "installationInputId"),
    EstimateDetails: a.hasMany("EstimateDetail", "priceId"),
    ShoppingCartDetails: a.hasMany("ShoppingCartDetail", "priceId"),
  })
    .identifier(["priceId"])
    .secondaryIndexes(index => [
      index('productId').sortKeys(['startDate']),
      index("installationInputId").sortKeys(["startDate"])]),

  ShoppingCart: a.model({
    shoppingCartId: a.id().required(),
    total: a.integer(), //precio
    vat: a.integer(), //iva
    paymentMethod: a.enum(["transbank", "bank_transfer", "cash", "on_site"]), //metodo de pago
    status: a.enum(["pending", "completed", "cancelled"]), //status

    ShoppingCartDetails: a.hasMany("ShoppingCartDetail", "shoppingCartId"), //detalles

    customerId: a.id(),
    Customer: a.belongsTo("Customer", "customerId"),

    //cotizacion
    estimateId: a.id(),
    Estimate: a.belongsTo("Estimate", "estimateId"),

    paymentTransactionId: a.id(), //transaction transbank
    PaymentTransaction: a.hasMany("PaymentTransaction", "shoppingCartId"),

    Discounts: a.hasMany("DiscountShoppingCart", "shoppingCartId"), //descuentos
  }).identifier(["shoppingCartId"]),

  ShoppingCartDetail: a.model({
    shoppingCartDetailId: a.id().required(),
    glosa: a.string(),
    price: a.integer(),
    typeOfItem: a.enum(["product", "service", "input"]),
    shoppingCartId: a.id(),
    ShoppingCart: a.belongsTo("ShoppingCart", "shoppingCartId"),
    priceId: a.id(),
    Price: a.belongsTo("Price", "priceId"),
    estimateDetailId: a.id(),
    EstimateDetail: a.belongsTo("EstimateDetail", "estimateDetailId"),
  }).identifier(["shoppingCartDetailId"]),

  DiscountShoppingCart: a.model({
    shoppingCartId: a.id().required(),
    ShoppingCart: a.belongsTo("ShoppingCart", "shoppingCartId"),
    discountId: a.id().required(),
    Discount: a.belongsTo("Discount", "discountId"),
  }).identifier(["discountId", "shoppingCartId"]),

  Discount: a.model({
    discountId: a.id().required(),
    name: a.string(),
    percentage: a.float(),
    flatAmount: a.integer(),
    ShoppingCarts: a.hasMany("DiscountShoppingCart", "discountId"),
  }).identifier(["discountId"]),

  PaymentTransaction: a
    .model({
      paymentTransactionId: a.id().required(),
      status: a.string(),
      amount: a.float().default(0),
      paymentsProcessorCommission: a.float().default(0),
      date: a.datetime(),
      token: a.id(),
      buy_order: a.string().default(""),
      card_number: a.string().default(""),
      transaction_date: a.string().default(""),
      accounting_date: a.string().default(""),
      installments_number: a.string().default(""),
      installments_amount: a.string().default(""),
      payment_type_code: a.string().default(""),
      card_detail: a.string().default(""),
      session_id: a.string().default(""),
      authorization_code: a.string().default(""),
      response_code: a.string().default(""),
      vci: a.string().default(""),
      glosa: a.string().default(""),
      usersPaymentTransactionsId: a.id(),
      shoppingCartId: a.id(),
      ShoppingCart: a.belongsTo("ShoppingCart", "shoppingCartId"),
    })
    .secondaryIndexes((index) => [index("token")])
    .identifier(["paymentTransactionId"]),

})
  .authorization((allow) => [
    allow.publicApiKey(),
    allow.authenticated(),
    allow.guest(),
  ]);


export type MainTypes = ClientSchema<typeof MainSchema>;
