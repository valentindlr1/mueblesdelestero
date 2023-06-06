export default function validateLogin(data) {
  let errors = { incomplete: false, password: [] };
  if (data.email.length) {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
      errors.email = "Ingrese un email válido"
    }
  } else errors.incomplete = true;
  if (data.password.length) {
    
  } else errors.incomplete = true;
  return errors
}
