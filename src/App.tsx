import React, { useState, useEffect } from "react";
import "./App.css";

import {
  FormContainer,
  FormContainerError,
  InputFieldsContainer,
  FormTitle,
  InputContainer,
  Input,
  InputError,
  Label,
  SelectMenu,
  Btn,
  Container
} from "./components/styled/base"

import { useForm } from "react-hook-form";
import usePersistForm from "./hooks/usePersistForm"
import { yupResolver } from "@hookform/resolvers/yup";
import { loadFormConfig } from "./service/form-config";
import {
  IFormConfig,
  IForm,
  IInputField,
  UserSchema,
  UserData
} from "./service/user-schema";
import PersistedForm from './components/PersistedForm'

//////////////////////////
export default () => {
  const [_isFetchingFormConfig, _setIsFetchingFormConfig] = useState(false);
  const [_formConfig, _setFormConfig] = useState<IFormConfig>({});

  // const [_isSubmitting, _setIsSubmitting] = useState(false);
  // const [_isSaving, _setIsSaving] = useState(false) // automatic submits

  //const [_inputFieldState, _setInputFieldState] = useState<IInputField[]>([]);
  const [_dropdownState, _setDropdownState] = useState<any>({});

  const [_autoSaveFormActive, _setAutoSaveFormActive] = useState<boolean>(false)

  const { _inputFieldState, _setInputFieldState } = usePersistForm()
  /////////////////////////////////////////////////
  const handleFetchFormConfig = () => {
    // resolve promise .then(save data to state)
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
    // Validation functions will go here in case yup resolvers for Formik or useForm (react-hook-form) are not compatible
    console.log("All fields passed validation", {
      ...data,
    });
  };

  // Using useForm for field registration 
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(UserSchema)
  });

  //////////////////////////
  const Dropdown = ({ fieldName, options }: {fieldName: string; options: string[] | any}) => {
    return (
      <SelectMenu name={fieldName}>
        {options.map((option: string) => <option value={option}>{option}</option>)}
      </SelectMenu>
    );
  };

  //////////////////////////////////////////
  const bindInputFields = (inputFields: IInputField[]) => {
    _setInputFieldState(inputFields);
    return inputFields.map((field: IInputField) => {
      return field.type === "text" ? (
        <InputContainer key={field.name}>
          {" "}
          <Input {...field} />
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
      console.log(register)
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
        onChange={e => handleFormChange(e)}
      >
        Registered Form w/ Yup Resolver
        {!!formInputGroups ? formInputGroups : <FormContainerError />}
        <Btn type="submit"> Submit </Btn>
      </FormContainer>
    );
  };
  return  <Container>
            <FormGroup />
            <PersistedForm />
          </Container>
};