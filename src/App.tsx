import React, { useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import {
  FormContainer,
  FormContainerError,
  InputFieldsContainer,
  FormTitle,
  InputContainer,
  Input,
  Label,
  InputError,
  SubmitBtn
} from "./components/base"

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loadFormConfig } from "./service/form-config";
import {
  IFormConfig,
  IForm,
  IInputField,
  UserSchema,
  UserData
} from "./service/user-schema";

//////////////////////////
export default () => {
  const [_isFetchingFormConfig, _setIsFetchingFormConfig] = useState(false);
  const [_formConfig, _setFormConfig] = useState<IFormConfig>({});

  // const [_isSubmitting, _setIsSubmitting] = useState(false);
  // const [_isSaving, _setIsSaving] = useState(false) // automatic submits

  const [_inputFieldState, _setInputFieldState] = useState<IInputField[]>([]);
  const [_dropdownState, _setDropdownState] = useState<any>({});
  /////////////////////////////////////////////////
  const handleFetchFormConfig = () => {
    // resolve promise .then(save data to state) // eventually use lazy lodaing
    _setIsFetchingFormConfig(true);
    _setFormConfig(loadFormConfig);
    _setIsFetchingFormConfig(false)

  };
  ///////////////////////////////////////////
  // Fallback in case Formik or useForm (react-hook-form) version not working properly
  const handleFormChange = (e: any) => { 
    _setInputFieldState({
      ..._inputFieldState,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (data: UserData) => {
    // unpacking "selected" values by "value" name
    let selectData = {};
    for (let key in _dropdownState) {
      let {
        [key]: { value }
      } = _dropdownState;
      selectData = {
        ...selectData,
        [key]: value
      };
    }

    // Validation functions will go here in case yup resolvers for Formik or useForm (react-hook-form) are not compatible
    console.log("All fields passed validation", {
      ...data,
      ...selectData
    });;
  };

  // Using useForm for field registration 
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UserSchema)
  });

  //////////////////////////
  const Dropdown = ({ fieldName, options }: {fieldName: string; options: string[] | any}) => {
    return (
      <Select
        className="dropdown"
        options={options.map((option: string) => ({ name: option, label: option }))}
        value={_dropdownState[fieldName]}
        onChange={(val) => {
          _setDropdownState({ ..._dropdownState, [fieldName]: val });
        }}
      />
    );
  };

  //////////////////////////////////////////
  const bindInputFields = (inputFields: IInputField[]) => {
    _setInputFieldState(inputFields);
    return inputFields.map((field: IInputField) => {
      return field.type === "text" ? (
        <InputContainer key={field.name}>
          {" "}
          <Input {...field} ref={register} />
          {/* {errors[field.name] && (
            <InputError>*{errors[field.name].message}</InputError>
          )}{" "}*/}
          <Label>{field.label}</Label>
        </InputContainer>
      ) : field.type === "dropdown" ? (
        <InputContainer key={field.name}>
          <Dropdown fieldName={field.name} options={field.options} />
          {/* errors[field.name] && (
            <InputError>*{errors[field.name].message}</InputError>
          )*/}{" "}
          <Label>{field.label}</Label>
        </InputContainer>
      ) : (
        <></>
      );
    });
  };

  const renderFormInputGroups = (formGroups: IForm[]) => {
    return formGroups.map((formGroup: IForm) => {
      const inputFields = bindInputFields(formGroup.fields);
      return (
        <InputFieldsContainer>
          <FormTitle> {!!formGroup.title && formGroup.title} </FormTitle>
          {inputFields}
        </InputFieldsContainer>
      );
    });
  };
  ///////////////////////////////////////
  const FormGroup = () => {
    let formInputGroups: any = []; // JSX.Element[]

    useEffect(() => {
      handleFetchFormConfig();
      // Wait for config 
    }, []);

    if (!!_formConfig) {
      for (let formGroupKey in _formConfig) {
        formInputGroups = [
          ...formInputGroups,
          renderFormInputGroups(_formConfig[formGroupKey])
        ];
      }
    }
    return (
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        //onChange={e => handleFormChange(e)}
      >
        {" "}
        {!!formInputGroups ? formInputGroups : <FormContainerError />}
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </FormContainer>
    );
  };
  ////////////////////////////////////////

  return <FormGroup />;
};

// TO DO (getFormInputGroups()): function for -> if formGroup is instance of a predfined interface in list of interfaces,
// to generate custom form field state, otherwise return generic input fields or return;

// Remove focus rings and add transitions for loading, onEnter, onleave, error and active states
/*

interface and type declarations w/ Yup and Typescript --> 

--(for service inputs upon request)
interface IInputField {
  name: string,
  label: string,
  type: string
}

interface IForm {
  title: String,
  fields: IInputField[],
}

interface IFormConfig  { [key: string]: IForm[] }

--(for service output upon submission)
export const UserSchema = yup.object() or yup.object.shape({
  first_name, 
  last_name, 
  email, 
  phone_number, 
  street_address,
  post_code,
  country
})

export type UserData = InferType<typeof UserSchema>;

--Create register and error log from useForm() hook to bind input fields to a validation schema:

const { register, handleSubmit, errors } = useForm({
  validationSchema: CheckoutSchema
});

--Then using "name" prop as key to bind user input fields and update error state before output to a service: 
  
//  where IInputField.name = INPUT_NAME
  <Input ref={register} name=INPUT_NAME> { errors.INPUT_NAME && errors.INPUT_NAME.message } <Input/>

If Yup resolvers or Formik/useForm not working properly, then will validate forms separately using "dirty" input values from state 

*/

// Chain of events:
//  Component mounts,
//  call to fetch form config,
//  toggle loading state request.
//  Once finished loading,
//  the config is added to state,
//  error fetch state is reflected,
//  loading state is toggled
//
//  THEN loop over _formConfig by key to get and render formGroups: { [key]: IForm } to create <FormFroupList/>:
//    Loop over each formGroup: IForm, to get and render { title, fields }:
//      Call getInputFields(inputFields: IInputField[]) to return <Input/> list, and ** bind input event handlers and/or register input refs **
//      Wrap <Title> IForm.title <Title/> + <Input/> list in <InputFieldContainer/>
//    Wrap each <InputFieldContainer/> inside <FormContainer/>

//  Unit Tests:
//  Base case -- (Forms) should listen for events to update their respective error state for validation upon submission
//            -- If not using Formik or a different version of reac-hook-form, then check the form inputs manually within onSubmit using dirty values added to state w/ onChange
