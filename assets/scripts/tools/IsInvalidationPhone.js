export default function IsInvalidationPhone (phone) {
  if (phone.length < 6) {
    return true
  }
  if (/[^0-9-+()\s]/g.test(phone)) {
    return true
  }
  if (phone.length > 40) {
    return true
  }
  return false
}
