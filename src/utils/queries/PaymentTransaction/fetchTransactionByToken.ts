import { MainTypes } from "../../../../amplify/data/resource";
import type { SelectionSet, } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";
import { throwError } from "../../error";

const client = generateClient<MainTypes>();


const selectionSet = [
    "paymentTransactionId",
    "status",
    "amount",
    "paymentsProcessorCommission",
    "date",
    "token",
    "buy_order",
    "card_number",
    "transaction_date",
    "accounting_date",
    "installments_number",
    "installments_amount",
    "payment_type_code",
    "card_detail",
    "session_id",
    "authorization_code",
    "response_code",
    "vci",
    "glosa",
    "usersPaymentTransactionsId",
] as const;

export type FetchedPaymentTransaction = SelectionSet<
    MainTypes["PaymentTransaction"]["type"],
    typeof selectionSet
>;

export const fetchPaymentTransactionByToken = async (
    props: {
        token: string,
    }): Promise<FetchedPaymentTransaction> => {

    const { token } = props;

    const { data, errors } = await client.models.PaymentTransaction.listPaymentTransactionByToken({ token }, {
        selectionSet
    });

    if (data === null || errors !== undefined) {
        throwError(`PaymentTransaction with token: '${token}' was not found `);
    }

    return data[0];
};