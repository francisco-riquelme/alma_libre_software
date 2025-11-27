// Tipos base para las colecciones de AlmaLibre

export interface Post {
  _id?: string
  content: string
  createdAt: Date
  updatedAt?: Date
  isAnonymous: boolean
  authorId?: string
  status: 'active' | 'moderated' | 'deleted'
}

export interface Comment {
  _id?: string
  postId: string
  content: string
  createdAt: Date
  updatedAt?: Date
  isAnonymous: boolean
  authorId?: string
  status: 'active' | 'moderated' | 'deleted'
}

export interface Reaction {
  _id?: string
  postId?: string
  commentId?: string
  type: 'support' | 'empathy' | 'love' | 'strength'
  createdAt: Date
  authorId?: string
}

export interface ModerationAction {
  _id?: string
  targetType: 'post' | 'comment'
  targetId: string
  action: 'approve' | 'reject' | 'delete' | 'flag'
  reason?: string
  moderatorId?: string
  createdAt: Date
}

export type UserRole = 'admin' | 'user' | 'mentor'

export interface User {
  _id?: string
  email: string
  password: string // Hash bcrypt
  username: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
  lastLogin?: Date
}

export interface UserPublic {
  _id?: string
  email: string
  username: string
  role: UserRole
  createdAt: Date
}

