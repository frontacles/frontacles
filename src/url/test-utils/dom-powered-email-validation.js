/**
 * This function should always correctly validate. We should benchmark it
 * against `Email.canParse` in order to either keep it as a test util
 * either promote it as main validation function.
 */
export const validateEmail = address => {
  const input = document.createElement('input')
  input.type = 'email'
  input.value = address
  return input.checkValidity()
}
