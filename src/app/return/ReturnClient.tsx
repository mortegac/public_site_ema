'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PageContainer from '@/app/components/container/PageContainer';
import HeaderAlert from '@/app/components/shared/header/HeaderAlert';
import HpHeaderNew from '@/app/components/shared/header/HpHeaderNew';
import LoadingIcon from "@/app/components/shared/LoadingIcon";
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetCart } from "@/store/ShoppingCart/slice";
import { selectPaymentTransaction, getPaymentTransaction} from "@/store/PaymentTransaction/slice";
import { selectWebpay, getWebpayStart} from "@/store/Webpay/slice";
import { fetchWebpayCommit, fetchWebpayStatus } from "@/store/Webpay/services";
import emailjs, { init as initEmailjs } from 'emailjs-com'
import { fetchPaymentTransactionByToken } from '@/utils/queries/PaymentTransaction/fetchTransactionByToken'
import { fecthShoppingCart } from '@/store/ShoppingCart/services'
import Invoice from './components/Invoice';
import RetryTransaction from './components/RetryTransaction';

// ─── Receipt email ────────────────────────────────────────────────────────────

function fmtCLP(amount: number): string {
  return '$' + Math.round(amount).toLocaleString('es-CL')
}

function paymentMethodLabel(typeCode: string, cardNumber: string): string {
  const brands: Record<string, string> = {
    VD: 'Débito', VN: 'Visa', VC: 'Visa Cuotas', MC: 'Mastercard',
    SI: 'Sin interés', S2: 'Sin interés', NC: 'Cuotas', VP: 'Prepago',
  }
  const brand = brands[typeCode] ?? 'Tarjeta'
  return cardNumber ? `${brand} ****${cardNumber}` : brand
}

function fmtTxDate(isoStr: string): string {
  try {
    const d = new Date(isoStr)
    const p = (n: number) => String(n).padStart(2, '0')
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
  } catch {
    const d = new Date()
    const p = (n: number) => String(n).padStart(2, '0')
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
  }
}

function extractKw(name: string): string {
  const m = name.match(/(\d+(?:[.,]\d+)?)\s*kw/i)
  return m ? `${m[1].replace(',', '.')} kW` : ''
}

function buildDetailRow(label: string, value: string): string {
  return `<tr><td style="padding:12px 16px;font-size:13px;line-height:18px;color:#4B4B5C;border-bottom:1px solid #EEF0F3;">${label}</td><td align="right" style="padding:12px 16px;font-size:13px;line-height:18px;color:#1A1A2E;border-bottom:1px solid #EEF0F3;">${value}</td></tr>`
}

async function sendReceiptEmail(params: {
  token: string
  to_email: string
  amount: number
  buy_order: string
  card_number: string
  payment_type_code: string
  shoppingCartId: string
}): Promise<void> {
  const { token, to_email, amount, buy_order, card_number, payment_type_code, shoppingCartId } = params

  let sessionData: Record<string, unknown> = {}
  try {
    const raw = sessionStorage.getItem('paymentData')
    if (raw) sessionData = JSON.parse(raw)
  } catch {}

  let txDateStr = new Date().toISOString()
  let authCode = ''
  try {
    const tx = await fetchPaymentTransactionByToken({ token })
    if (tx?.transaction_date) txDateStr = tx.transaction_date
    if (tx?.authorization_code) authCode = tx.authorization_code
  } catch {}

  // Resolve real email: to_email is "sin-usuario" for charger flows — cart.customerId IS the email
  const isValidEmail = (v: string) => !!v && v !== 'sin-usuario' && v.includes('@')
  let resolvedEmail = isValidEmail(to_email) ? to_email : ''
  let customerName = resolvedEmail || to_email
  try {
    const cart = await fecthShoppingCart({ shoppingCartId })
    if (cart?.customer?.Name) customerName = cart.customer.Name
    if (!resolvedEmail) {
      const cartEmail = cart?.customer?.Email || cart?.customerId || ''
      if (isValidEmail(cartEmail)) resolvedEmail = cartEmail
    }
    if (!customerName || customerName === 'sin-usuario') customerName = resolvedEmail
  } catch {}

  const total = Number(sessionData.total ?? amount)
  const neto = Number(sessionData.neto ?? Math.round(total / 1.19))
  const iva = Number(sessionData.iva ?? (total - neto))
  const mat = Number(sessionData.mat ?? 0)
  const inst = Number(sessionData.inst ?? 0)
  const sec = Number(sessionData.sec ?? 0)
  const chargerPrice = Number(sessionData.chargerPrice ?? 0)

  const chargerName = String(sessionData.chargerName ?? '')
  const kwLabel = extractKw(chargerName)
  const tipoLabel = sessionData.tipo === 'edificio' ? 'Departamento' : sessionData.tipo === 'casa' ? 'Casa' : ''
  const distLabel = sessionData.dist ? `${sessionData.dist} m al tablero` : ''

  const paymentMethod = paymentMethodLabel(payment_type_code, card_number)
  const dateTimeLabel = fmtTxDate(txDateStr)

  let lineRows = ''
  if (mat > 0) lineRows += buildDetailRow('Materiales', fmtCLP(mat))
  if (inst > 0) lineRows += buildDetailRow('Instalaci&oacute;n', fmtCLP(inst))
  if (sec > 0) lineRows += buildDetailRow('Tr&aacute;mites SEC', fmtCLP(sec))
  if (chargerPrice > 0) lineRows += buildDetailRow('Cargador', fmtCLP(chargerPrice))
  lineRows += buildDetailRow('Neto', fmtCLP(neto))
  lineRows += buildDetailRow('IVA (19%)', fmtCLP(iva))

  const authRow = authCode ? `<tr>
    <td style="padding:11px 16px;font-size:12px;line-height:16px;color:#6B7280;border-bottom:1px solid #EEF0F3;">C&oacute;d. autorizaci&oacute;n</td>
    <td align="right" style="padding:11px 16px;font-size:12px;line-height:16px;color:#1A1A2E;font-weight:bold;border-bottom:1px solid #EEF0F3;">${authCode}</td>
  </tr>` : ''

  const chargerDomRow = (chargerName || tipoLabel) ? `<tr>
    <td style="padding:24px 36px 28px 36px;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        ${chargerName ? `<td width="50%" valign="top" style="padding:0 8px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E7EB;border-radius:10px;">
            <tr><td style="padding:14px 16px;">
              <p style="margin:0 0 6px 0;font-size:11px;line-height:14px;color:#9097A3;text-transform:uppercase;letter-spacing:0.5px;">Cargador</p>
              <p style="margin:0;font-size:13px;line-height:19px;color:#1A1A2E;font-weight:bold;">${chargerName}</p>
              ${kwLabel ? `<p style="margin:2px 0 0 0;font-size:12px;line-height:18px;color:#6B7280;">${kwLabel}</p>` : ''}
            </td></tr>
          </table>
        </td>` : '<td width="50%" style="padding:0 8px 0 0;"></td>'}
        <td width="50%" valign="top" style="padding:0 0 0 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E7EB;border-radius:10px;">
            <tr><td style="padding:14px 16px;">
              <p style="margin:0 0 6px 0;font-size:11px;line-height:14px;color:#9097A3;text-transform:uppercase;letter-spacing:0.5px;">Domicilio</p>
              <p style="margin:0;font-size:13px;line-height:19px;color:#1A1A2E;font-weight:bold;">${tipoLabel || 'Domicilio'}</p>
              ${distLabel ? `<p style="margin:2px 0 0 0;font-size:12px;line-height:18px;color:#6B7280;">${distLabel}</p>` : ''}
            </td></tr>
          </table>
        </td>
      </tr></table>
    </td>
  </tr>` : '<tr><td style="height:28px;font-size:0;line-height:0;">&nbsp;</td></tr>'

  // Generate signed agenda link (JWT) for the CTA button in the receipt email
  let agendaUrl = 'https://www.energica.city/cotizador/agenda'
  if (resolvedEmail) {
    try {
      const agendaRes = await fetch('/api/generate-agenda-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resolvedEmail,
          ...(customerName && customerName !== resolvedEmail ? { name: customerName } : {}),
          ...(sessionData.formId ? { formId: String(sessionData.formId) } : {}),
        }),
      })
      if (agendaRes.ok) {
        const agendaData = await agendaRes.json()
        agendaUrl = agendaData.url
      }
    } catch { /* keep fallback url */ }
  }

  const HTML = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F4F5F7" style="background-color:#F4F5F7;"><tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#FFFFFF" style="width:600px;max-width:600px;background-color:#FFFFFF;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:22px 36px 0 36px;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0 0 6px 0;font-size:16px;line-height:24px;color:#1A1A2E;font-weight:bold;">Hola ${customerName},</p>
      <p style="margin:0;font-size:14px;line-height:22px;color:#4B4B5C;">Tu pago fue procesado con &eacute;xito. Este es tu comprobante.</p>
    </td></tr>
    <tr><td style="padding:22px 36px 0 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFF1F5" style="background-color:#FFF1F5;border:1px solid #FBD0DE;border-radius:12px;">
        <tr><td align="center" style="padding:22px 20px;font-family:Arial,Helvetica,sans-serif;">
          <p style="margin:0 0 4px 0;font-size:12px;line-height:16px;color:#8A4A60;text-transform:uppercase;letter-spacing:1px;">Total pagado</p>
          <p style="margin:0;font-size:40px;line-height:46px;color:#F0386B;font-weight:bold;">${fmtCLP(total)}</p>
          <p style="margin:6px 0 0 0;font-size:12px;line-height:18px;color:#6B7280;">IVA incluido${kwLabel ? ' &middot; ' + kwLabel : ''}</p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:24px 36px 0 36px;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0 0 12px 0;font-size:13px;line-height:18px;color:#1A1A2E;font-weight:bold;">Datos de la transacci&oacute;n</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FAFAFB" style="background-color:#FAFAFB;border:1px solid #E5E7EB;border-radius:10px;">
        <tr>
          <td style="padding:11px 16px;font-size:12px;line-height:16px;color:#6B7280;border-bottom:1px solid #EEF0F3;">N&deg; de orden</td>
          <td align="right" style="padding:11px 16px;font-size:12px;line-height:16px;color:#1A1A2E;font-weight:bold;border-bottom:1px solid #EEF0F3;">${buy_order}</td>
        </tr>
        ${authRow}
        <tr>
          <td style="padding:11px 16px;font-size:12px;line-height:16px;color:#6B7280;border-bottom:1px solid #EEF0F3;">M&eacute;todo de pago</td>
          <td align="right" style="padding:11px 16px;font-size:12px;line-height:16px;color:#1A1A2E;font-weight:bold;border-bottom:1px solid #EEF0F3;">${paymentMethod}</td>
        </tr>
        <tr>
          <td style="padding:11px 16px;font-size:12px;line-height:16px;color:#6B7280;">Fecha y hora</td>
          <td align="right" style="padding:11px 16px;font-size:12px;line-height:16px;color:#1A1A2E;font-weight:bold;">${dateTimeLabel}</td>
        </tr>
      </table>
    </td></tr>
    <tr><td style="padding:24px 36px 0 36px;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0 0 12px 0;font-size:13px;line-height:18px;color:#1A1A2E;font-weight:bold;">Detalle de tu compra</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E7EB;border-radius:10px;">
        ${lineRows}
        <tr>
          <td bgcolor="#FAFAFB" style="padding:13px 16px;font-size:14px;line-height:18px;color:#1A1A2E;font-weight:bold;background-color:#FAFAFB;">Total pagado</td>
          <td align="right" bgcolor="#FAFAFB" style="padding:13px 16px;font-size:14px;line-height:18px;color:#F0386B;font-weight:bold;background-color:#FAFAFB;">${fmtCLP(total)}</td>
        </tr>
      </table>
    </td></tr>
    <tr><td style="padding:24px 36px 0 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F1FBF5" style="background-color:#F1FBF5;border:1px solid #CDEBD8;border-radius:10px;">
        <tr><td style="padding:18px 18px 6px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#157347;font-weight:bold;">Tu reserva protegida</td></tr>
        <tr><td style="padding:0 18px 14px 18px;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td valign="top" width="22" style="padding:5px 0;font-size:13px;color:#16A34A;font-weight:bold;">&#10003;</td><td style="padding:5px 0;font-size:12px;line-height:18px;color:#3F5A49;">Visita t&eacute;cnica de confirmaci&oacute;n sin costo.</td></tr>
            <tr><td valign="top" width="22" style="padding:5px 0;font-size:13px;color:#16A34A;font-weight:bold;">&#10003;</td><td style="padding:5px 0;font-size:12px;line-height:18px;color:#3F5A49;">Devoluci&oacute;n garantizada si decides no continuar.</td></tr>
            <tr><td valign="top" width="22" style="padding:5px 0;font-size:13px;color:#16A34A;font-weight:bold;">&#10003;</td><td style="padding:5px 0;font-size:12px;line-height:18px;color:#3F5A49;">Instalaci&oacute;n certificada SEC con garant&iacute;a de 3 meses.</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:28px 36px 8px 36px;text-align:center;">
      <a href="${agendaUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#f0386b;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 36px;border-radius:8px;min-width:220px;">Reservar instalaci&oacute;n</a>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6B7280;margin:8px 0 0 0;">Reserva tu instalaci&oacute;n y agenda la visita t&eacute;cnica de confirmaci&oacute;n.</p>
    </td></tr>
    ${chargerDomRow}
  </table>
</td></tr></table>`

  initEmailjs('UYcrSeCqLGW8xqT4S')
  await emailjs.send('service_dbrrm6b', 'template_eysyecb', {
    to_email: resolvedEmail || to_email,
    name: customerName,
    subject: 'Comprobante de tu pago en Energica',
    CONTENT_HTML: HTML,
  })
}

// ─── Loading messages ─────────────────────────────────────────────────────────
const PAYMENT_MESSAGES = [
  'Recibiendo informacion del pago',
  'Validando transaccion',
  'Generando el comprobante',
  'Redireccionando ..',
]

const MESSAGE_STYLE: React.CSSProperties = {
  fontSize: '1.6rem',
  lineHeight: '2.75rem',
  fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', Helvetica, Arial, sans-serif",
  color: 'rgb(126, 118, 121)',
  fontWeight: 800,
  textAlign: 'center',
  margin: 0,
  willChange: 'opacity',
  transition: 'opacity 0.45s ease',
}

function PaymentLoadingMessages() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (index >= PAYMENT_MESSAGES.length - 1) return

    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => prev + 1)
        setVisible(true)
      }, 450)
    }, 4000)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '350px', gap: '24px' }}>
      <p style={{ ...MESSAGE_STYLE, opacity: visible ? 1 : 0 }}>
        {PAYMENT_MESSAGES[index]}
      </p>
      <LoadingIcon icon="puff" color="#E81A68" style={{ width: '60px', height: '60px' }} />
    </div>
  )
}
// ─────────────────────────────────────────────────────────────────────────────


const ReturnPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isFirstRender = useRef(true);
  
  const searchParams = useSearchParams();
  const [resTransaction, setResTransaction] = useState(
    {
        statusRedirect: "", // PAYMENT_REJECTED  | PAYMENT_APPROVED
        token_ws: '',
        tbk_token: '',
        status: '',
        apiError: false,
        msg: '',
        total: '',
        order: '',
        card: '',
        typePay: '',
        to_email: '',
        glosa: '',
        shoppingCartId: '',
        typeOfCart: '' as "product" | "service" | "input" | "visit" | "virtualVisit" | "chargerInstallation" | "",
    }
    );
    
    
    const { paymentTransaction, status } = useAppSelector(selectPaymentTransaction);
    
    
    
    // Función alternativa usando sessionStorage
    // const redirectToInvoice = useCallback((data: any) => {
    //   // Guardar datos en sessionStorage
    //   sessionStorage.setItem('invoiceData', JSON.stringify(data));
    //   // Redirigir a la página de invoice
    //   router.push('/return/invoice');
    // }, [router]);

    const validation = async (obj:any) => {
      //Flujos:
      //1. Flujo normal (OK): solo llega token_ws
      //2. Timeout (más de 10 minutos en el formulario de Transbank): llegan TBK_ID_SESION y TBK_ORDEN_COMPRA
      //3. Pago abortado (con botón anular compra en el formulario de Webpay): llegan TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
      //4. Caso atipico: llega todos token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
      
          const { token, tbkToken, tbkOrdenCompra, tbkIdSesion } = obj;
          
          console.log(`
              token = ${token}
              tbkToken = ${tbkToken}
              tbkOrdenCompra = ${tbkOrdenCompra}
              tbkIdSesion = ${tbkIdSesion}
          `)
          try {
              // Flujo 1: Confirmar Transacción
              if (token && !tbkToken) {
                  setResTransaction(prev => ({
                      ...prev,
                      step: 1,
                      token_ws: token,
                      msg: "La transaccion confirmada",
                      apiError: false,
                      tbk_token: tbkToken
                  }));
                  
                  
    
                  const commitResponse = await fetchWebpayCommit({ token:token });
                  console.log("---commitResponse---", commitResponse)
                  if (!commitResponse) {
                      throw new Error('Error en getWPCommit');
                  }
                  
                  if (commitResponse?.status !== "AUTHORIZED" ) {
                      setResTransaction(prev => ({
                          ...prev,
                          step: 1,
                          token_ws: token,
                          msg: "Error al confirmar la transaccion",
                          apiError: true,
                          tbk_token: tbkToken
                      }));

                      const statusResponse: any = await fetchWebpayStatus({ token });
                      console.log("---statusResponse-fetchWebpayStatus (rejected)--", statusResponse);
                      if (!statusResponse || !statusResponse.status) {
                          throw new Error('Error en getWPStatus o respuesta inválida');
                      }
                      setResTransaction((prev) => ({
                          ...prev,
                          token_ws: token,
                          tbk_token: tbkToken,
                          total: statusResponse?.amount,
                          order: statusResponse?.buy_order,
                          card: statusResponse?.card_number,
                          typePay: statusResponse?.payment_type_code,
                          to_email: statusResponse?.email,
                          glosa: statusResponse?.glosa,
                          shoppingCartId: statusResponse?.shoppingCartId,
                          typeOfCart: statusResponse?.typeOfCart || "",
                          statusRedirect: "PAYMENT_REJECTED",
                      }));
                      return true;
                  }

                  const statusResponse: any = await fetchWebpayStatus({ token: token });
                  console.log("---statusResponse-fetchWebpayStatus--", statusResponse);
                  if (!statusResponse || !statusResponse.status) {
                      throw new Error('Error en getWPStatus o respuesta inválida');
                  }

                  // Resolve email: Webpay returns 'sin-usuario' for /cotizador2 flow.
                  // Fall back to email stored in sessionStorage by CotizadorWizard.
                  const rawWebpayEmail = statusResponse?.email ?? ''
                  const isValidWebpayEmail = rawWebpayEmail && rawWebpayEmail !== 'sin-usuario'
                  let resolvedEmail = rawWebpayEmail
                  if (!isValidWebpayEmail) {
                    try {
                      const stored = sessionStorage.getItem('paymentData')
                      if (stored) {
                        const storedData = JSON.parse(stored)
                        resolvedEmail = storedData?.email || storedData?.customerId || ''
                        console.log('[return] email resolved from sessionStorage:', resolvedEmail)
                      }
                    } catch { /* ignore */ }
                  }
                  console.log('[return] sendEmail to_email:', resolvedEmail, '| webpayEmail:', rawWebpayEmail)

                  try {
                    await sendReceiptEmail({
                      token,
                      to_email: resolvedEmail,
                      amount: statusResponse?.amount ?? 0,
                      buy_order: statusResponse?.buy_order ?? '',
                      card_number: statusResponse?.card_number ?? '',
                      payment_type_code: statusResponse?.payment_type_code ?? '',
                      shoppingCartId: statusResponse?.shoppingCartId ?? '',
                    })
                  } catch (emailErr) {
                    console.error('[return] receipt email failed:', emailErr)
                  }

                  setResTransaction((prev) => ({
                      ...prev,
                      token_ws: token,
                      tbk_token: tbkToken,
                      total: statusResponse?.amount,
                      order: statusResponse?.buy_order,
                      card: statusResponse?.card_number,
                      typePay: statusResponse?.payment_type_code,
                      to_email: statusResponse?.email,
                      glosa: statusResponse?.glosa,
                      shoppingCartId: statusResponse?.shoppingCartId,
                      typeOfCart: statusResponse?.typeOfCart || "",
                      statusRedirect: "PAYMENT_APPROVED",
                  }));
                  return true;
              }
              
              // Flujo 2: Transacción Anulada por tiempo de espera |   tbkOrdenCompra y tbkIdSesion
              else if (!token && !tbkToken && tbkIdSesion && tbkOrdenCompra) {
                  setResTransaction(prev => ({
                      ...prev,
                      token_ws: token,
                      step: 3,
                      msg: "La transaccion fue Anulada por tiempo de espera",
                      apiError: false,
                      tbk_token: "",
                      status:""
                  }));
    
                  const statusResponse:any = await fetchWebpayStatus({ token:tbkToken });
                  if (statusResponse?.status) {
                    //   setResTransaction(prev => ({
                    //       ...prev,
                    //       status: statusResponse.status
                    //   }));
                    setResTransaction({
                        ...resTransaction ,
                        token_ws: token,
                        tbk_token: tbkToken,
                        total: statusResponse?.amount,
                        order: statusResponse?.buy_order,
                        card: statusResponse?.card_number,
                        typePay: statusResponse?.payment_type_code,
                        to_email: statusResponse?.email,
                        glosa: statusResponse?.glosa,
                        shoppingCartId: statusResponse?.shoppingCartId,
                        typeOfCart: statusResponse?.typeOfCart || "",
                        statusRedirect: "PAYMENT_REJECTED"})
                  }

                  return true;
              }

              // Flujo 3: Pago anulado por usuario
              else if (!token && tbkToken) {
                  setResTransaction(prev => ({
                      ...prev,
                      token_ws: "",
                      step: 4,
                      msg: "El pago fue anulado por el usuario",
                      apiError: false,
                      tbk_token: tbkToken
                  }));

                  const statusResponse:any = await fetchWebpayStatus({ token:tbkToken });
                  if (statusResponse?.status) {
                    setResTransaction({
                        ...resTransaction ,
                        token_ws: token,
                        tbk_token: tbkToken,
                        total: statusResponse?.amount,
                        order: statusResponse?.buy_order,
                        card: statusResponse?.card_number,
                        typePay: statusResponse?.payment_type_code,
                        to_email: statusResponse?.email,
                        glosa: statusResponse?.glosa,
                        shoppingCartId: statusResponse?.shoppingCartId,
                        typeOfCart: statusResponse?.typeOfCart || "",
                        statusRedirect: "PAYMENT_REJECTED"})
                  }
                  return true;
              }

              // Flujo 4: Pago inválido
              else if (token && tbkToken) {
                  setResTransaction(prev => ({
                      ...prev,
                      token_ws: token,
                      step: 5,
                      msg: "El pago es inválido, contactese con su banco",
                      apiError: false,
                      tbk_token: tbkToken
                  }));

                  const statusResponse:any = await fetchWebpayStatus({ token:tbkToken });
                  if (statusResponse?.status) {
                    setResTransaction({
                        ...resTransaction ,
                        token_ws: token,
                        tbk_token: tbkToken,
                        total: statusResponse?.amount,
                        order: statusResponse?.buy_order,
                        card: statusResponse?.card_number,
                        typePay: statusResponse?.payment_type_code,
                        to_email: statusResponse?.email,
                        glosa: statusResponse?.glosa,
                        shoppingCartId: statusResponse?.shoppingCartId,
                        typeOfCart: statusResponse?.typeOfCart || "",
                        statusRedirect: "PAYMENT_REJECTED"})
                  }
                  return true;
              }

          } catch (error) {
              console.log('Error en la validación:', error);
              setResTransaction(prev => ({
                  ...prev,
                  apiError: true,
                  msg: "Error en la validación del pago",
                  status: "ERROR"
              }));
              const statusResponse:any = await fetchWebpayStatus({ token:tbkToken });
              if (statusResponse?.status) {
                setResTransaction({
                    ...resTransaction ,
                    token_ws: token,
                    tbk_token: tbkToken,
                    total: statusResponse?.amount,
                    order: statusResponse?.buy_order,
                    card: statusResponse?.card_number,
                    typePay: statusResponse?.payment_type_code,
                    to_email: statusResponse?.email,
                    glosa: statusResponse?.glosa,
                    shoppingCartId: statusResponse?.shoppingCartId,
                    typeOfCart: statusResponse?.typeOfCart || "",
                    statusRedirect: "PAYMENT_REJECTED"})
              }
              return false;
          }
          
          tbkToken && getTransaction(String(tbkToken))
          token && getTransaction(String(token))
          
          return false;
          
      };

      
    const handleValidation = useCallback(async () => {
        try {
          const token = searchParams.get("token_ws") || "";
          const tbkToken = searchParams.get("TBK_TOKEN") || "";
          const tbkOrdenCompra = searchParams.get("TBK_ORDEN_COMPRA") || "";
          const tbkIdSesion = searchParams.get("TBK_ID_SESION") || "";


          await validation({
              token: token, 
              tbkToken: tbkToken, 
              tbkOrdenCompra: tbkOrdenCompra, 
              tbkIdSesion: tbkIdSesion
          });
          
        } catch (error) {
            console.log('Error en el proceso de validación:', error);
            setResTransaction(prev => ({
                ...prev,
                apiError: true,
                msg: "Error inesperado en el proceso de pago",
                status: "ERROR"
            }));
        } 
        
    }, []);
    
    
    const getTransaction = async (token:string) => await dispatch(getPaymentTransaction({ token }));
    // const getTransaction = async () => await dispatch(getPaymentTransaction({ token: String(resTransaction?.token_ws)}));
    
    // const getRetry = async () => await dispatch(getWebpayStart({ 
    //     shoppingCartId: String(paymentTransaction?.shoppingCartId),
    //     glosa: String(paymentTransaction?.glosa),
    // }));
    
    useEffect(() => {
        if (!isFirstRender.current) return;
        isFirstRender.current = false;
        dispatch(resetCart());
        handleValidation();
 }, [handleValidation]); 
 
 
//     useEffect(() => {
//         // resTransaction?.tbk_token && 
//         // resTransaction?.token_ws && 
//         // resTransaction?.token_ws !== "" && 
//         resTransaction?.tbk_token && getTransaction(String(resTransaction?.tbk_token))
//         resTransaction?.token_ws && getTransaction(String(resTransaction?.tbk_token))
        
//  }, [resTransaction]); 
 
    // Nuevo useEffect para manejar la redirección
    // useEffect(() => {
    //     if (resTransaction?.status === "AUTHORIZED" && status === "idle") {
    //         const invoiceData = {
    //             glosa: resTransaction?.glosa,
    //             total: resTransaction?.total,
    //             order: resTransaction?.order,
    //             card: `xxxx xxxx xxxx ${resTransaction?.card}`,
    //             typePay: resTransaction?.typePay,
    //             email: resTransaction?.to_email
    //         };
            
    //         // Redirigir con datos POST
    //         redirectToInvoice(invoiceData);
    //     }
    // }, [resTransaction?.status, status, redirectToInvoice]);

    
    // Nuevo useEffect para manejar el timeout de 30 segundos y redirección sin parámetros
    useEffect(() => {
        
        // Solo ejecutar si statusRedirect está definido
        if (!resTransaction?.statusRedirect) {
            return;
        }
        
        const timeoutId = setTimeout(() => {
            const typeOfCart = resTransaction?.typeOfCart;

            const isChargerFlow =
                typeOfCart === "chargerInstallation" ||
                resTransaction?.glosa?.toLowerCase().includes('instalación cargador') ||
                resTransaction?.glosa?.toLowerCase().includes('instalacion cargador')

            const paymentConfirmFields = {
                customerId: resTransaction?.to_email ?? '',
                email: resTransaction?.to_email ?? '',
                total: resTransaction?.total ?? '',
                glosa: resTransaction?.glosa ?? '',
                shoppingCartId: resTransaction?.shoppingCartId ?? '',
                order: resTransaction?.order ?? '',
                card: resTransaction?.card ?? '',
                typePay: resTransaction?.typePay ?? '',
                typeOfCart: resTransaction?.typeOfCart ?? '',
            }

            if (isChargerFlow && resTransaction?.statusRedirect === "PAYMENT_APPROVED") {
                // READ existing paymentData (wizard fields stored by CotizadorWizard before Webpay redirect)
                // MERGE payment confirmation fields → WRITE back. Never discard wizard data.
                let existing: Record<string, unknown> = {}
                try {
                    const raw = sessionStorage.getItem('paymentData')
                    if (raw) existing = JSON.parse(raw)
                } catch {}

                // If Webpay returns "sin-usuario" or empty, keep the email the user entered in the wizard
                const webpayEmail = resTransaction?.to_email ?? ''
                const isValidEmail = webpayEmail && webpayEmail !== 'sin-usuario'
                const resolvedEmail = isValidEmail ? webpayEmail : ((existing?.email as string) ?? '')

                sessionStorage.setItem('paymentData', JSON.stringify({
                    ...existing,
                    ...paymentConfirmFields,
                    customerId: resolvedEmail,
                    email: resolvedEmail,
                }))
            } else {
                // Non-charger flows: write payment fields only (existing behavior)
                sessionStorage.setItem('paymentData', JSON.stringify({
                    glosa: resTransaction?.glosa ?? '',
                    total: resTransaction?.total ?? '',
                    shoppingCartId: resTransaction?.shoppingCartId ?? null,
                    order: resTransaction?.order ?? '',
                    card: resTransaction?.card ?? '',
                    typePay: resTransaction?.typePay ?? '',
                    email: resTransaction?.to_email ?? '',
                    typeOfCart: resTransaction?.typeOfCart ?? '',
                }))
            }
            // Clean up legacy keys
            sessionStorage.removeItem('cotizadorv2')
            sessionStorage.removeItem('wizardContext')

            console.log("---paymentData stored---", sessionStorage.getItem('paymentData'));

            const isVisitCart = typeOfCart === "visit" || typeOfCart === "virtualVisit";

            // Redirigir según el estado y tipo de carrito
            if (resTransaction?.statusRedirect === "PAYMENT_APPROVED") {
                if (typeOfCart === "virtualVisit") {
                    console.log("----REDIRECT--- /agenda/recibo-pago-virtual");
                    router.push('/agenda/recibo-pago-virtual');
                } else if (typeOfCart === "visit") {
                    console.log("----REDIRECT--- /agenda/recibo-pagado");
                    router.push('/agenda/recibo-pagado');
                } else if (
                    typeOfCart === "chargerInstallation" ||
                    resTransaction?.glosa?.toLowerCase().includes('instalación cargador') ||
                    resTransaction?.glosa?.toLowerCase().includes('instalacion cargador')
                ) {
                    console.log("----REDIRECT--- /cotizador/recibo-pago");
                    // Update ClientForm step to PAID_PENDING_SCHEDULE
                    try {
                      const rawPd = sessionStorage.getItem('paymentData')
                      const storedFormId = rawPd ? (JSON.parse(rawPd) as Record<string, unknown>)?.formId : undefined
                      if (storedFormId) {
                        fetch('/api/update-step', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ formId: storedFormId, step: '4' }),
                        }).catch(() => null)
                      }
                    } catch {}
                    router.push('/cotizador/recibo-pago');
                } else {
                    // product | service | input
                    console.log("----REDIRECT--- /cargadores/recibo-pago");
                    router.push('/cargadores/recibo-pago');
                }
            } else if (resTransaction?.statusRedirect === "PAYMENT_REJECTED") {
                if (typeOfCart === "virtualVisit") {
                    console.log("----REDIRECT--- /agenda/rechazo-pago-virtual");
                    router.push('/agenda/rechazo-pago-virtual');
                } else if (typeOfCart === "visit") {
                    console.log("----REDIRECT--- /agenda/rechazo-pago");
                    router.push('/agenda/rechazo-pago');
                } else if (
                    typeOfCart === "chargerInstallation" ||
                    resTransaction?.glosa?.toLowerCase().includes('instalación cargador') ||
                    resTransaction?.glosa?.toLowerCase().includes('instalacion cargador')
                ) {
                    console.log("----REDIRECT--- /cotizador/rechazo-pago");
                    router.push('/cotizador/rechazo-pago');
                } else {
                    // product | service | input
                    console.log("----REDIRECT--- /cargadores/rechazo-pago");
                    router.push('/cargadores/rechazo-pago');
                }
            }
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [resTransaction?.statusRedirect, resTransaction?.glosa, resTransaction?.total, resTransaction?.order, resTransaction?.to_email, resTransaction?.card, resTransaction?.typePay, resTransaction?.shoppingCartId, resTransaction?.typeOfCart, router]);
    
    // funel de ventas 
    // y atrae y finalziaa nuevos clientes 
    
    // http://localhost:3000/return?TBK_TOKEN=1131653f49ea357ae10804c04d295d9b132044d17557a1fc30f424746a3823d0
    // http://localhost:3000/return?token_ws=1131653f49ea357ae10804c04d295d9b132044d17557a1fc30f424746a3823d0
    
    
    // useEffect(() => {
    //     // Verificar si no hay parámetros en la URL
    //     const token = searchParams.get("token_ws") || "";
    //     const tbkToken = searchParams.get("TBK_TOKEN") || "";
    //     const tbkOrdenCompra = searchParams.get("TBK_ORDEN_COMPRA") || "";
    //     const tbkIdSesion = searchParams.get("TBK_ID_SESION") || "";
        
    //     const hasNoParams = !token && !tbkToken && !tbkOrdenCompra && !tbkIdSesion;
        
    //     // Redirigir inmediatamente si no hay parámetros en la URL
    //     if (hasNoParams) {
    //         router.push('/return/invoice');
    //         return;
    //     }
        
    //     // Solo activar el timeout si estamos en estado de loading (status vacío) y hay parámetros
    //     if (resTransaction?.status === "") {
    //         const timeoutId = setTimeout(() => {
    //             // Después de 30 segundos, redirigir a invoice
    //             router.push('/return/invoice');
    //         }, 30000); // 30 segundos

    //         // Cleanup del timeout si el componente se desmonta o cambia el estado
    //         return () => clearTimeout(timeoutId);
    //     }
    // }, [resTransaction?.status, router, searchParams]);

    
    
    /** TODO:  CASO BORDE 
     * El tiempo maximo es de 20 minutos para reintentar la transaccion 
     * Despues de los 20 minutos la fecha es LIBERADA y el carro de comprar queda en estado "time_out"
     * Se DEBE traer info del carro y validar
    */
  
  return (
    <PageContainer title="Retorno de Pago" description="Procesando el retorno de pago">
      <HpHeaderNew />
      {/* <pre>paymentTransaction = {JSON.stringify(paymentTransaction, null, 2 )}</pre>
      <pre>resTransaction = {JSON.stringify(resTransaction, null, 2 )}</pre>   */}
      {/* 
      */}
      {/* 
      */}
      <div
        style={{
            minHeight: 'calc(100vh - 81px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: '#f8fafc'
        }}
      >
        
          {/* <pre>{JSON.stringify(resTransaction?.statusRedirect, null, 2 )}</pre> */}
          {/* <pre>{JSON.stringify(resTransaction, null, 2 )}</pre> */}
        {resTransaction?.status === "" && <PaymentLoadingMessages />}
       
       {/* <Box id="returnPage" sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
          
            { resTransaction?.status !== "AUTHORIZED" 
                && resTransaction?.status !== "" 
                && status === "idle" 
                && <>
                    <RetryTransaction 
                     glosa={resTransaction?.glosa}
                     total={resTransaction?.total}
                     order={resTransaction?.order}
                     email={resTransaction?.to_email}
                     shoppingCartId={paymentTransaction?.shoppingCartId || null}
                    /> 
                </>
            }
       </Box> */}
        
             
             
      </div>
    </PageContainer>
  );
};

export default ReturnPage; 