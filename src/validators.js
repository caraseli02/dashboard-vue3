import { defineRule } from "vee-validate";
import { email, required, min, max } from "@vee-validate/rules";

defineRule("email", (value) => {
  if (email(value) && required(value)) {
    return true;
  }

  return "Email no valido. Solo @apimosa se acceptan.";
});

defineRule("password", (value) => {
  if (
    required(value) &&
    min(value, { length: 6 }) &&
    max(value, { length: 30 })
  ) {
    return true;
  }

  return "La contraseña debe tener mín 6 y máx 30 caracteres";
});

defineRule("confirmPassword", (value, [target], ctx) => {
  if (required(value) && value === ctx.form[target]) {
    return true;
  }

  return "Las contraseñas no coinciden";
});

defineRule("name", (value) => {
  if (
    required(value) &&
    min(value, { length: 3 }) &&
    max(value, { length: 30 })
  ) {
    return true;
  }

  return "El nombre debe tener mín 3 y máx 30 caracteres";
});

defineRule("surname", (value) => {
  if (
    required(value) &&
    min(value, { length: 3 }) &&
    max(value, { length: 30 })
  ) {
    return true;
  }

  return "El apellido debe tener mín 3 y máx 30 caracteres";
});

defineRule("dni", (value) => {
  if (
    required(value) &&
    min(value, { length: 6 }) &&
    max(value, { length: 12 })
  ) {
    return true;
  }

  return "El DNI debe tener mín 6 y máx 12 caracteres";
});

defineRule("workplace", (value) => {
  if (required(value)) {
    return true;
  }

  return "Elige centro de trabajo";
});
