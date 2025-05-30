import util from "util";
import {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} from "transbank-sdk"; // ES6 Modules
import { WebpayPlus } from "transbank-sdk"; // ES5
import { logger } from "@log";
import { throwError } from "./error";

export interface transbankCreate {
  token: string;
  url: string;
  session_id: string;
}


export const createTransaction = async (params: {
  buyOrder: string;
  amount: number;
}): Promise<transbankCreate> => {
  const { buyOrder, amount } = params;

  const uuidSessionId = crypto.randomUUID();
  logger.info("creating transbank transaction");
  let transbankOptions: Options;
  if (process.env.enviroment === "prod") {
    transbankOptions = {
      commerceCode: process.env.WPP_CC || "",
      apiKey: process.env.WPP_KEY || "",
      environment: Environment.Production,
      timeout: 30000,
    };
  } else {
    transbankOptions = {
      commerceCode: IntegrationCommerceCodes.WEBPAY_PLUS,
      apiKey: IntegrationApiKeys.WEBPAY,
      environment: Environment.Integration,
      timeout: 30000,
    };
  }

  try {
    const createResponse = await new WebpayPlus.Transaction(
      transbankOptions,
    ).create(
      buyOrder?.toString() || "",
      uuidSessionId || "",
      amount || 0,
      process.env.RETURN_URL_WEBPAY || "",
    );

    logger.info(`createTransaction: ${JSON.stringify(createResponse)}`);
    return { ...createResponse, session_id: uuidSessionId };
  } catch (err) {
    throw throwError(`createTransaction - ${util.inspect(err)}`);
  }

};

export type WebpayCommitReturn = {
  status: string;
};

export const commitTransaction = async (params: {
  token: string;
}): Promise<WebpayCommitReturn> => {
  const { token } = params;

  logger.info("commiting transbank transaction");

  let transbankOptions: Options;
  if (process.env.enviroment === "prod") {
    transbankOptions = {
      commerceCode: process.env.WPP_CC || "",
      apiKey: process.env.WPP_KEY || "",
      environment: Environment.Production,
      timeout: 30000,
    };

  } else {
    transbankOptions = {
      commerceCode: IntegrationCommerceCodes.WEBPAY_PLUS,
      apiKey: IntegrationApiKeys.WEBPAY,
      environment: Environment.Integration,
      timeout: 30000,
    };
  }

  try {
    const commitResponse = (await new WebpayPlus.Transaction(transbankOptions).commit(token)) as WebpayCommitReturn;

    logger.info(`commitResponse: ${JSON.stringify(commitResponse)}`);

    return commitResponse;
  } catch (err) {
    throw throwError(`commitTransaction() - ${util.inspect(err)}`);
  }

};

export type statusTransactionReturnType = {
  vci: string;
  amount: number;
  status: string;
  buy_order: string;
  session_id: string;
  accounting_date: string;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_number: number;
  card_detail: {
    card_number: string;
  };
};

export const statusTransaction = async (params: {
  token: string;
}): Promise<statusTransactionReturnType> => {
  const { token } = params;

  logger.info("getting transbank transaction status");

  let transbankOptions: Options;
  if (process.env.enviroment === "prod") {
    transbankOptions = {
      commerceCode: process.env.WPP_CC || "",
      apiKey: process.env.WPP_KEY || "",
      environment: Environment.Production,
      timeout: 30000,
    };
  } else {
    transbankOptions = {
      commerceCode: IntegrationCommerceCodes.WEBPAY_PLUS,
      apiKey: IntegrationApiKeys.WEBPAY,
      environment: Environment.Integration,
      timeout: 30000,
    };
  }

  try {
    const statusResponse = await new WebpayPlus.Transaction(
      transbankOptions,
    ).status(token);

    logger.info(`statusResponse: ${JSON.stringify(statusResponse)}`);

    return { ...statusResponse };
  } catch (err) {
    throw throwError(`commitTransaction() - ${util.inspect(err)}`);
  }
};

