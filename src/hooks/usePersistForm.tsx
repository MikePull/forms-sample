import React, { useState, useEffect } from "react";
import { IInputField } from "../service/user-schema";
import { createGlobalStyle } from "styled-components";

export default () => {
    
    const [_inputFieldState, _setInputFieldState] = useState<IInputField[]>([]);
    const [_autoSaveFormActive, _setAutoSaveFormActive] = useState<boolean>(true)

    useEffect(() => {
        let formData = JSON.parse(localStorage.getItem('formData') || '{}')
        console.log(formData)

        if (localStorage.getItem('formData')) {
            _setInputFieldState({
                ...formData
            })
            console.log(_inputFieldState)
        }
        
    }, [])

    const handleFormChange = (e: any) => {
        
        _setInputFieldState({
          ..._inputFieldState,
          [e.target.name]: e.target.value
        });

        if (_autoSaveFormActive) {
            localStorage.setItem('formData', JSON.stringify(_inputFieldState))
            console.log(JSON.parse(localStorage.getItem('formData') || '{}'))
        }
    };
    return { handleFormChange, _inputFieldState, _setInputFieldState }
}