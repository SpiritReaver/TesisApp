import * as Yup from "yup";

//validacion login
export const validationSchemaLogin = Yup.object().shape({
  correo: Yup.string()
    .email("Ingresa un correo valido")
    .required("Obligatorio"),
  contraseña: Yup.string().required("Obligatorio"),
});

export const initialValuesLogin = {
  correo: "",
  contraseña: "",
};

//validacion registro
export const initialValuesRegistro = {
  Nombre: "",
  Telefono: "",
  Email: "",
  Contraseña: "",
  ConfirmarContraseña: "",
};

export const validationSchemaRegistro = Yup.object().shape({
  Nombre: Yup.string().min(3, "Demasiado corto").required("Obligatorio"),
  Telefono: Yup.number()
    .typeError("Ingresa un telefono valido")
    .required("Obligatorio"),
  Email: Yup.string().email("Ingresa un correo valido").required("Obligatorio"),
  Contraseña: Yup.string()
    .min(8, "El tamaño minimo de la contraseña debe ser 8 caracteres")
    .required("Obligatorio"),
  ConfirmarContraseña: Yup.string()
    .oneOf([Yup.ref("Contraseña")], "Las contraseñas no coinciden")
    .required("Obligatorio"),
});
