import { type ClientSchema, a } from "@aws-amplify/backend";
import { processEstimate } from "../resolvers/ProcessEstimate/resource";
import { removeEstimate } from "../resolvers/RemoveEstimate/resource";
import { webpayCommit } from "../resolvers/webpayCommit/resource";
import { webpayStart } from "../resolvers/webpayStart/resource";
import { webpayStatus } from "../resolvers/webpayStatus/resource";

export const ResolverSchema = a
    .schema({
        ProcessEstimate: a
            .mutation()
            .arguments({
                formId: a.string().required(),
            })
            .returns(a.string().required())
            .handler(a.handler.function(processEstimate)),

        RemoveEstimate: a
            .mutation()
            .arguments({
                estimateId: a.string().required(),
            })
            .returns(a.string().required())
            .handler(a.handler.function(removeEstimate)),

        MakeEstimateIntoCart: a
            .mutation()
            .arguments({
                estimateId: a.string().required(),
                paymentMethod: a.enum(["transbank", "bank_transfer", "cash", "on_site"])
            })
            .returns(a.string().required())
            .handler(a.handler.function(removeEstimate)),

        webpayStart: a
            .mutation()
            .arguments({
                shoppingCartId: a.id().required(),
                amount: a.integer().required(),
                glosa: a.string().required(),
                userId: a.string(),
            })
            .returns(
                a.customType({
                    order: a.string(),
                    token: a.string(),
                    url: a.string(),
                    message: a.string(),
                    buy_order: a.string(),
                    email: a.string(),
                }),
            )
            .handler(a.handler.function(webpayStart)),

        webpayCommit: a
            .mutation()
            .arguments({ token: a.string().required() })
            .returns(
                a.customType({
                    message: a.string().required(),
                    buy_order: a.string(),
                    email: a.string(),
                }),
            )
            .handler(a.handler.function(webpayCommit)),

        webpayStatus: a
            .mutation()
            .arguments({ token: a.string().required() })
            .returns(
                a.customType({
                    paymentTransactionId: a.string(),
                    payment_type_code: a.string(),
                    buy_order: a.string(),
                    amount: a.integer(),
                    glosa: a.string(),
                    card_number: a.string(),
                    usersPaymentTransactionsId: a.string(),
                    status: a.string(),
                    email: a.string(),
                    message: a.string()
                }),
            )
            .handler(a.handler.function(webpayStatus)),
    })

    .authorization((allow) => [
        allow.guest(),
        allow.publicApiKey(),
    ]);

export type ResolversTypes = ClientSchema<typeof ResolverSchema>;
