import parsePhoneNumberFromString, { CountryCode, getCountryCallingCode } from 'libphonenumber-js'

export function normalizePhoneNumber(phone: string, countryCode: string): string {
  const phoneCode = getCountryCallingCode(countryCode as unknown as CountryCode)

  const parsed = parsePhoneNumberFromString(phone)

  if (!parsed || !parsed.isValid()) {
    const strippedPhone = phone.replace(/^0|\+/g, '')
    return `${phoneCode}${strippedPhone}`
  } else {
    const strippedPhone = phone.replace(/^0|\+/g, '')
    return strippedPhone
  }
}
