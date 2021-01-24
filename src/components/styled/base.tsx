import styled from "styled-components";

export const FormContainer = styled.form`
  max-width: 80%;
  width: 60vw;
  min-height: 90vh;
  height: auto;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: calc(25vh + 5em);
  padding-top: 5em;
  position: relative;
  background: linear-gradient(to bottom left, #eff1ed, #ffefd3);
`;

const FormContainerLoading = styled.div``;

export const FormContainerError = styled.div``;
////////////////////////
export const InputFieldsContainer = styled.div`
  height: 95%;
  width: 56%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 40%;
    height: 5px;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 0%;
    background: #536976;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

export const FormTitle = styled.h3`
  width: 5em;
  position: absolute;
  font-size: 32px;
  top: 0%;
  right: 100%;
  height: 5em;
  z-index: 1;
  transform: rotate(-90deg);
  margin-left: 3em;
  color: #001b2e;
  letter-spacing: 1px;
  font-family: "Abril Fatface";
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.8em;
  margin-top: 1em;
  z-index: 2;
  height: 50%;
`;

export const Input = styled.input`
  background: transparent;
  height: 2.4em;
  border-bottom: 2px solid #001b2e;
  border-radius: 5px;
  min-width: 10em;
  width: 60%;
  color: #a53f2b;
  font-family: "Open Sans";

  &:focus {
    border: 2px solid #001b2e;
  }
`;

export const SelectMenu = styled.select`
  height: 3em;
  width: 90%;
  padding: .25em;
`

export const Label = styled.label`
  color: #a53f2b;
  font-family: "Open Sans";
  font-size: 11px;
`;

export const InputError = styled.p`
  color: #a53f2b;
  transition: all 0.45s ease-in-out;
`;

export const Btn = styled.button`
  margin-top: 3em;
  padding: 0.1em 0.7em;
  background: transparent;
  border-radius: 15px;
  border: 2px solid #001b2e;
  font-size: 18px;
  letter-spacing: 1px;
  font-family: "Open Sans";
  transition: all 0.45s ease-in-out;
  &:hover {
    cursor: pointer;
    background: #001b2e;
    color: #fbf2c0;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`