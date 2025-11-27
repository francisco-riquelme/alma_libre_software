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

