import { formatString } from '../Strings'

export const formatErrString = (
  template: string,
  templateFr: string,
  templateAr: string,
  data: Record<string, any>
) => {
  const msg = formatString(template, data)
  const Frmsg = formatString(templateFr, data)
  const Armsg = formatString(templateAr, data)

  return { msg, Frmsg, Armsg }
}
