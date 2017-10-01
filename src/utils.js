export const round = (val, dec) => {
  return Number(Math.round(val + 'e' + dec) + 'e-' + dec)
}
