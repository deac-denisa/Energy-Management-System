import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';
import Button from "react-bootstrap/Button";

import Validate from "./validators/client-validators";
import * as API_USERS from "../../api/api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

const formControlsInit = {
    username: {
        value: '',
        placeholder: 'What is your username?...',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    password: {
        value: '',
        placeholder: 'Create a good password :)',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
   
};

function ClientForm(props) {
    const [error, setError] = useState({ status: 0, errorMessage: null });
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        let updatedControls = { ...formControls };

        let updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = Validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        setFormControls((formControls) => (updatedControls));
        setFormIsValid((formIsValidPrev) => (formIsValid));
    }


    function registerClient(client) {
        return API_USERS.postClient(client, (result, status, err) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted client with id: " + result);
                props.reloadHandler();
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }

    function handleSubmit() {
        let client = {
            username: formControls.username.value,
            password: formControls.password.value,
        };
        registerClient(client);
    }

    return (
        <div>
           <FormGroup id='username'>
                <Label for='usernameField'> Username: </Label>
                <Input name='username' id='usernameField' placeholder={formControls.username.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.username.value}
                    touched={formControls.username.touched ? 1 : 0}
                    valid={formControls.username.valid}
                    required
                />
                {formControls.username.touched && !formControls.username.valid &&
                    <div className={"error-message row"}> * Username must have at least 3 characters </div>}
            </FormGroup>

            <FormGroup id='password'>
                <Label for='passwordField'> Password: </Label>
                <Input name='password' id='passwordField' placeholder={formControls.password.placeholder}
                    onChange={handleChange}
                    defaultValue={formControls.password.value}
                    touched={formControls.password.touched ? 1 : 0}
                    valid={formControls.password.valid}
                    required
                />
                {formControls.password.touched && !formControls.password.valid &&
                    <div className={"error-message"}> * Password must have a valid format</div>}
            </FormGroup>

          
            <Row>
                <Col sm={{ size: '4', offset: 8 }}>
                    <Button type={"submit"} disabled={!formIsValid} onClick={handleSubmit}>  Submit </Button>
                </Col>
            </Row>

            {
                error.status > 0 &&
                <APIResponseErrorMessage errorStatus={error.status} error={error.errorMessage} />
            }
        </div>
    );
}

export default ClientForm;
