export default function validateShippingInfo(data) {
    console.log("DATA: ",data)
    let errors = {};
    if (data.dni){
        errors = {...errors, dni: ""}
        if (data.dni === "Sin DNI") {
            errors = {...errors, dni: "Introduzca un número de DNI"}
        } else if (data.dni.length < 7 || !/\d+$/.test(data.dni)){
            errors = {...errors, dni: "Introduzca un DNI válido"}
        }
    }
    if (data.phone){
        errors = {...errors, phone: ""}
        if (data.phone === "Sin Telefono"){
            errors = {...errors, phone: "Introduzca un número de teléfono"}
        } else if (data.phone.length > 10) {
            errors = {...errors, phone: "Sin 0 ni 15 iniciales. Ejemplo 0385154 -> 3854"}
        } else if (data.phone.length < 10) {
            errors = {...errors, phone: "Introduzca un teléfono válido"}
        }
    }
    if (data.province){
        errors = {...errors, province: ""}
        if (data.province.length < 3){
            errors = {...errors, province: "Escriba una provincia"}
        }
    }
    if (data.location){
        errors = {...errors, location: ""}
        if (data.location.length < 3){
            errors = {...errors, location: "Escriba una localidad o distrito"}
        }
    }
    if (data.ZIPcode){
        errors = {...errors, ZIPcode: ""}
        if (data.ZIPcode.length < 4){
            errors = {...errors, ZIPcode: "Escriba el código postal"}
        }
    }
    console.log(errors)
    return errors
  }
  