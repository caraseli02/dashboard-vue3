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

  return "Las contraseñas no coinciden";
});

defineRule("name", (value) => {
  return max(value, { length: 60 })
    ? true
    : "Name may not exceed 60 characters";
});
