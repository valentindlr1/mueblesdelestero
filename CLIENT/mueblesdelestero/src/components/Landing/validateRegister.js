export default function validateRegister(data) {
  let errors = { incomplete: false, password: [] };
  if (data.email.length) {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
      errors.email = "Ingrese un email válido"
    }
  } else errors.incomplete = true;
  if (data.password.length) {
    if (data.password.length < 4){
        errors.password = [...errors.password, "Al menos 4 caracteres"]
    }
    if (data.password.length > 16){
        errors.password = [...errors.password, "Hasta 16 caracteres"]
    }
    if (!/(?=.*[0-9])/.test(data.password)){
        errors.password = [...errors.password, "Al menos un número"]
    }
    if (!/(?=.*[a-z])/.test(data.password) && !/(?=.*[A-Z])/.test(data.password)){
        errors.password = [...errors.password, "Al menos una letra"]
    }
  } else errors.incomplete = true;
  if (data.phone.length){
    if (data.phone.length > 10){
        errors.phone = "Sin 0 ni 15. Ej 385-4081874"
    }
  } else errors.incomplete = true
  if (data.confirmPass.length){
    if (data.password !== data.confirmPass){
        errors.confirmPass = "Las contraseñas no coinciden"
    }
  }else errors.incomplete = true
  if (!data.name.length || !data.dni.length || !data.lName.length) errors.incomplete = true
  return errors
}