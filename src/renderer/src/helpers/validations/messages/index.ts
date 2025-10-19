import { FieldErrors, FieldError } from 'react-hook-form'

/**
 * Recursively flattens FieldErrors into a single string
 */
export function getAllErrorMessages(errors: FieldErrors): string {
  const messages: string[] = []

  const extractMessages = (obj: FieldErrors | FieldError | undefined): void => {
    if (!obj) return

    // Si es FieldError con message
    if ('message' in obj && obj.message) {
      if (typeof obj.message === 'string') messages.push(`<p style="margin:0;">➡️ ${obj.message}</p><br/>`)
      return
    }

    // Si es objeto, recorremos sus propiedades
    if (typeof obj === 'object') {
      Object.values(obj).forEach(extractMessages)
    }
  }

  extractMessages(errors)

  return messages.join('')
}
