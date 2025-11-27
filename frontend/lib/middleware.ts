import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, extractTokenFromHeader } from './auth'
import { UserRole } from './types'

export interface AuthRequest extends NextRequest {
  user?: {
    userId: string
    role: UserRole
  }
}

export function requireAuth(request: NextRequest): { userId: string; role: UserRole } | null {
  const authHeader = request.headers.get('authorization')
  const token = extractTokenFromHeader(authHeader)

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  return {
    userId: decoded.userId,
    role: decoded.role as UserRole,
  }
}

export function requireRole(allowedRoles: UserRole[]) {
  return (request: NextRequest): { userId: string; role: UserRole } | null => {
    const auth = requireAuth(request)
    if (!auth) {
      return null
    }

    if (!allowedRoles.includes(auth.role)) {
      return null
    }

    return auth
  }
}

