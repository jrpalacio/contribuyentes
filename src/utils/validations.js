import { ValidationError } from './errors'

export function validateLogin({ email, password }) {
  if (!email) throw new ValidationError('El correo electrónico es requerido')
  if (!password) throw new ValidationError('La contraseña es requerida')
}
