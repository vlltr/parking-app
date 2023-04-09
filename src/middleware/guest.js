export const guest = (to, from, next) => {
  if (localStorage.getItem('access_token')) {
    return next({ name: 'parkings.active' })
  }

  next()
}
