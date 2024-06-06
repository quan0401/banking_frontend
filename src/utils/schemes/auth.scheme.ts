import { ISignUpBody, ISignInBody } from "@interfaces/features/auth.interface";
import { object, ObjectSchema, string } from "yup";

const loginUserSchema: ObjectSchema<ISignInBody> = object({
  email: string()
    .required({ email: "Email is a required field" })
    .email({ email: "Invalid email." }), // Add email validation
  password: string()
    .required({ password: "Password is a required field" })
    .min(8, { password: "Password must be at least 8 characters long" }),
});

const registerUserSchema: ObjectSchema<ISignUpBody> = object({
  username: string()
    .required({ username: "Username is a required field" })
    .min(4, { username: "Username must be at least 4 characters long" }),
  password: string()
    .required({ password: "Password is a required field" })
    .min(8, { password: "Password must be at least 8 characters long" })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        password:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  email: string()
    .email({ email: "Invalid email." })
    .required({ email: "Email is a required field" }),
  phone: string()
    .required({ phone: "Phone is a required field" })
    .min(10, { phone: "Phone number must be at least 10 digits long" }),
  cccd: string()
    .required({ cccd: "CCCD is a required field" })
    .min(12, { cccd: "CCCD must be at least 12 characters long" }),
  homeAddress: string().required({
    homeAddress: "Home address is a required field",
  }),
  profilePicture: string().required({
    profilePicture: "Profile picture is a required field",
  }),
});

export { loginUserSchema, registerUserSchema };
