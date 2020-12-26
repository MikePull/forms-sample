import * as yup from "yup";

export interface IInputField {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

export interface IForm {
  title: String;
  fields: IInputField[];
}

export interface IFormConfig {
  [key: string]: IForm[];
}
//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// constraints commented out to debug, replacing with own functions to filter for validation
export const UserSchema = yup.object().shape({
  first_name: yup.string(), //.required("First name is required"),
  last_name: yup.string(), //.required("Last name is required"),
  email: yup.string(), //.required().email("Email is required"),
  // .typeError("Email not valid"),
  phone_number: yup.string(), //.required("Phone number is required"),
  // .matches(phoneRegExp, "Phone number is not valid"),
  street_address: yup.string(), //.required("Address is required"),
  post_code: yup.string(), //.required("Zip Code is required")
  country: yup.string() //.required("Country must be selected")
});

export type UserData = yup.InferType<typeof UserSchema>;