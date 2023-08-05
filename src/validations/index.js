export const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: true, stripUnknown: true });
