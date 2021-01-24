import React, { useState, useEffect } from 'react'
import { FormContainer, Input } from './styled/base'
//import { IInputField } from '../service/user-schema'

export default () => {

    const [_inputFieldState, _setInputFieldState] = useState<any>({});

    useEffect(() => {
        let formData = JSON.parse(localStorage.getItem('formData') || '{}')
        if (Object.keys(formData).length) {
            console.log("some state persisted", formData)
            _setInputFieldState(formData)
            //localStorage.clear() Toggle for clearing state on new tab
        }
    }, [])

    const handleFormChange = (e: any) => { 
        _setInputFieldState({
          ..._inputFieldState,
          [e.target.name]: e.target.value
        });
        localStorage.setItem('formData', JSON.stringify(_inputFieldState))
    };

    return  <FormContainer onChange={handleFormChange}>
                Persisted Form
                <Input type="text" name="test"  defaultValue={_inputFieldState.test || ""}/>
            </FormContainer>
}