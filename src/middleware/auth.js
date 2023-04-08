export const auth = (to, from, next) => {
  if (!localStorage.getItem('access_token')) {
    return next({ name: 'register' })
  }

  next()
}
