import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { JWT_SECRET_KEY } from '../../config/EnvProvider'

interface TokenPayload {
  [key: string]: any
  iat?: number
  exp?: number
}

interface TokenOptions {
  expiresIn?: string | number
  audience?: string | string[]
  issuer?: string
  subject?: string
  includeJwtId?: boolean
}

interface TokenValidationResult {
  valid: boolean
  reason: string
  payload?: TokenPayload
}

class TokenService {
  private static instance: TokenService
  private readonly algorithm = 'HS512'
  private secretKey: string

  private constructor(secretKey?: string) {
    this.secretKey = secretKey || JWT_SECRET_KEY

    if (!secretKey && !JWT_SECRET_KEY) {
      console.warn('WARNING: No JWT secret key provided. Generated secure random key.')
    }
  }

  public static getInstance(secretKey?: string): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService(secretKey)
    }
    return TokenService.instance
  }

  public generateToken(payload: TokenPayload, options: TokenOptions = {}): string {
    if (!payload || Object.keys(payload).length === 0) {
      throw new Error('Payload is required to generate token')
    }

    const signOptions: jwt.SignOptions = {
      algorithm: this.algorithm,
      expiresIn: (options.expiresIn as jwt.SignOptions['expiresIn']) || '24h',
      notBefore: '0s',
    }

    if (options.audience) signOptions.audience = options.audience
    if (options.issuer) signOptions.issuer = options.issuer
    if (options.subject) signOptions.subject = options.subject
    if (options.includeJwtId) {
      signOptions.jwtid = crypto.randomBytes(16).toString('hex')
    }

    return jwt.sign(payload, this.secretKey, signOptions)
  }

  public validateToken(
    token: string,
    options: {
      audience?: string | string[]
      issuer?: string
      subject?: string
    } = {}
  ): TokenValidationResult {
    if (!token) {
      return {
        valid: false,
        reason: 'Token is required',
      }
    }

    try {
      const verifyOptions: jwt.VerifyOptions = {
        algorithms: [this.algorithm],
        ...options,
        audience: Array.isArray(options.audience)
          ? options.audience.length === 1
            ? options.audience[0]
            : (options.audience as [string | RegExp, ...(string | RegExp)[]])
          : options.audience,
      }

      const decoded = jwt.verify(token, this.secretKey, verifyOptions) as TokenPayload

      return {
        valid: true,
        payload: decoded,
        reason: 'Token is valid',
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          valid: false,
          reason: `Token expired at ${new Date(error.expiredAt).toISOString()}`,
        }
      } else if (error instanceof jwt.JsonWebTokenError) {
        return {
          valid: false,
          reason: 'Invalid token signature or format',
        }
      } else if (error instanceof jwt.NotBeforeError) {
        return {
          valid: false,
          reason: 'Token not yet active',
        }
      } else {
        return {
          valid: false,
          reason: 'Token validation failed',
        }
      }
    }
  }

  // Utility method to decode token without verification
  public decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload
    } catch {
      return null
    }
  }

  // Allow changing the secret key if needed
  public updateSecretKey(newSecretKey: string): void {
    if (!newSecretKey) {
      throw new Error('New secret key cannot be empty')
    }
    this.secretKey = newSecretKey
  }
}

export const tokenService = TokenService.getInstance()
