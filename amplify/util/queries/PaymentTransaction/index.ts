import { QueryFactory } from "../QueryFactory";
import { fetchPaymentTransactionByToken } from "./fetchTransactionByToken";

export const PaymentTransaction = QueryFactory<"PaymentTransaction">({ name: "PaymentTransaction" });
export { fetchPaymentTransactionByToken };

