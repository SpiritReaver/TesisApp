import {
  Paper,
  Grid,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@mui/material";

import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import React, { useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import {
  validationSchemaLogin,
  initialValuesLogin,
} from "../../ValidationInicioSesion/formvalidation";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: 50,
    height: "70vh",
    width: 300,
    margin: "0 auto",
  };

  const avatarStyle = {
    backgroundColor: "#23871abf",
  };

  const btnstyle = {
    margin: "8px 0",
  };

  const margField = {
    margin: "8px 0",
  };
  const navigate = useNavigate();
  const { login, isLogged } = useUser();

  useEffect(() => {
    console.log(isLogged);
    if (isLogged) navigate("/inicio");
  }, [isLogged, navigate]);

  const onSubmitLogin = (values, props) => {
    ////Aca imprimo los datos que esta tomando
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    login({ correo: values.correo, contraseña: values.contraseña });

    console.log(isLogged);
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            {" "}
            <DinnerDiningIcon />
          </Avatar>
          <h2>Iniciar Sesión</h2>
        </Grid>

        <Formik
          initialValues={initialValuesLogin}
          onSubmit={onSubmitLogin}
          validationSchema={validationSchemaLogin}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                style={margField}
                name="correo"
                variant="outlined"
                label="correo"
                placeholder="Ingresa tu usuario o correo "
                fullWidth
                helperText={<ErrorMessage name="Usuario" />}
              />
              <Field
                as={TextField}
                style={margField}
                name="contraseña"
                variant="outlined"
                label="contraseña"
                placeholder="Ingresa tu usuario o correo "
                type="password"
                fullWidth
                helperText={<ErrorMessage name="contraseña" />}
              />
              <Field
                name="Recuerdame"
                as={FormControlLabel}
                control={<Checkbox name="checkedB" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Cargando" : "Ingresar"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Olvidé la contraseña</Link>
        </Typography>
        <Typography>
          {" "}
          ¿Ya tienes una cuenta?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Registrate
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
