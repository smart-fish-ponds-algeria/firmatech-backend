import { ValidationChain } from 'express-validator'

export default function makeValidationOptional(validators: ValidationChain[]): ValidationChain[] {
  return validators.map((validator) => {
    // NOTE: express-validator is chainable, but we can't programmatically remove `.exists()` cleanly,
    // so this pattern works when we treat it like a black box and simply add `.optional()`
    const clone = validator.optional({ checkFalsy: false })
    return clone
  })
}
