import { useState } from "react";
import { Schema, ValidationError } from "yup";

interface AuthSchemeProps {
  schema: Schema<any>;
  info: any;
}

const useScheme = ({
  schema,
  info,
}: AuthSchemeProps): [() => Promise<boolean>, Record<string, string>[]] => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>[]
  >([]);

  const schemaValidation = async (): Promise<boolean> => {
    try {
      await schema.validate(info, { abortEarly: false });
      setValidationErrors([]);
    } catch (err) {
      if (err instanceof ValidationError) {
        // @ts-ignore
        setValidationErrors(err.errors);
      } else {
        throw err;
      }
    }

    const validation: boolean = await schema.isValid(info, {
      abortEarly: false,
    });

    return validation;
  };

  return [schemaValidation, validationErrors];
};

export { useScheme };
