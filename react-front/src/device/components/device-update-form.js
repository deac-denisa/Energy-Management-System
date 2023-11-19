import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';
import Button from "react-bootstrap/Button";

import Validate from "./validators/device-validators";
import * as API_DEVICES from "../../api/api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";


const formControlsInit = {
    id: { 
        value: '',
        placeholder: 'Enter ID...',
        valid: true, 
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
    description: {
        value: '',
        placeholder: 'Enter description...',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
    address: {
        value: '',
        placeholder: 'Enter address...',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
    consumption: {
        value: '',
        placeholder: 'Enter consumption...',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
    clientId: {
        value: '', 
        placeholder: 'Enter client ID...',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
};


function UpdateDeviceForm(props) {
    const [error, setError] = useState({ status: 0, errorMessage: null });
    const [formIsValid, setFormIsValid] = useState(false);
    const [formControls, setFormControls] = useState(formControlsInit);
    const [deviceId, setDeviceId] = useState(''); // New state variable for device ID


    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
    
        let updatedControls = { ...formControls };
    
        if (name === 'id') {
            setDeviceId(value); // Update the device ID state
        } else {
            let updatedFormElement = updatedControls[name];
    
            updatedFormElement.value = value;
            updatedFormElement.touched = true;
            updatedFormElement.valid = Validate(value, updatedFormElement.validationRules);
            updatedControls[name] = updatedFormElement;
        }
    
        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }
    
        setFormControls((formControls) => (updatedControls));
        setFormIsValid((formIsValidPrev) => (formIsValid));
    }
    

    function updateDevice(device) {
        return API_DEVICES.updateDevice(device, (result, status, err) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updateddevice with id: " + result);
                props.reloadHandler();
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }

    function handleSubmit() {

        let device = {
            id: deviceId,
            description: formControls.description.value,
            address: formControls.address.value,
            consumption: formControls.consumption.value,
            clientId: formControls.clientId.value
        };
        updateDevice(device);

    }
    
    return (
        <div>
        <FormGroup id="id"> {/* ID field */}
            <Label for="idField"> Device ID: </Label>
            <Input
                type="text"
                name="id"
                id="idField"
                placeholder={formControls.id.placeholder}
                onChange={handleChange}
                 defaultValue={formControls.description.value}
                 touched={formControls.description.touched ? 1 : 0}
                 valid={formControls.description.valid}
                 required
            />
        </FormGroup>
        <FormGroup id='description'>
             <Label for='descriptionField'> Description: </Label>
             <Input name='description' id='descriptionField' placeholder={formControls.description.placeholder}
                 onChange={handleChange}
                 defaultValue={formControls.description.value}
                 touched={formControls.description.touched ? 1 : 0}
                 valid={formControls.description.valid}
                 required
             />
             {formControls.description.touched && !formControls.description.valid &&
                 <div className={"error-message row"}> * Introduce valid data </div>}
         </FormGroup>

         <FormGroup id='address'>
             <Label for='addressField'> Address: </Label>
             <Input name='address' id='addressField' placeholder={formControls.address.placeholder}
                 onChange={handleChange}
                 defaultValue={formControls.address.value}
                 touched={formControls.address.touched ? 1 : 0}
                 valid={formControls.address.valid}
                 required
             />
             {formControls.address.touched && !formControls.address.valid &&
                 <div className={"error-message"}> * Password must have a valid format</div>}
         </FormGroup>
         <FormGroup id='consumption'>
             <Label for='consumptionField'> Consumption: </Label>
             <Input name='consumption' id='consumptionField' placeholder={formControls.consumption.placeholder}
                 onChange={handleChange}
                 defaultValue={formControls.consumption.value}
                 touched={formControls.consumption.touched ? 1 : 0}
                 valid={formControls.consumption.valid}
                 required
             />
             {formControls.consumption.touched && !formControls.consumption.valid &&
                 <div className={"error-message row"}> * Introduce valid data </div>}
         </FormGroup>
         <FormGroup id='clientId'>
             <Label for='clientIdField'> Client id: </Label>
             <Input name='clientId' id='clientIdField' placeholder={formControls.clientId.placeholder}
                 onChange={handleChange}
                 defaultValue={formControls.clientId.value}device
                 touched={formControls.clientId.touched ? 1 : 0}
                 valid={formControls.clientId.valid}
                 required
             />
             {formControls.clientId.touched && !formControls.clientId.valid &&
                 <div className={"error-message row"}> * Introduce valid data </div>}
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

export default UpdateDeviceForm;
