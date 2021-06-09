import { defineRule } from "vee-validate";
import { email, required, min, max } from "@vee-validate/rules";

defineRule("email", (value) => {
  if (email(value) && required(value)) {
    return true;
  }

  return "Por favor introduzca un email valido";
});

defineRule("password", (value) => {
  if (
    required(value) &&
    min(value, { length: 6 }) &&
    max(value, { length: 30 })
  ) {
    return true;
  }

  return "Mínimo 6 / Máximo 30";
});

defineRule("confirmPassword", (value, [target], ctx) => {
  if (required(value) && value === ctx.form[target]) {
    return true;
  }

  return "Mínimo 6 caracteres. Máximo 30 caracteres";
});

defineRule("name", (value) => {
  if (
    required(value) &&
    min(value, { length: 3 }) &&
    max(value, { length: 30 })
  ) {
    return true;
  }

  return "Mínimo 3 caracteres. Máximo 30 caracteres";
});

defineRule("surname", (value) => {
  if (
    required(value) &&
    min(value, { length: 3 }) &&
    max(value, { length: 30 })
  ) {
    return true;
  }

  return "Mínimo 3 caracteres. Máximo 30 caracteres";
});

defineRule("dni", (value) => {
  if (
    required(value) &&
    min(value, { length: 6 }) &&
    max(value, { length: 12 })
  ) {
    return true;
  }

  return "Mínimo 6 caracteres. Máximo 12 caracteres";
});

defineRule("workplace", (value) => {
  if (required(value)) {
    return true;
  }

  return "Elige centro de trabajo";
});
