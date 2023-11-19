import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import DeviceForm from "./components/device-form";
import * as API_DEVICES from "../api/api";
import DeviceTable from "./components/device-table";
import AdminNavBar from '../navbars/adminNavbar';
import DeviceUpdateForm from './components/device-update-form';

function DeviceContainer(props) {
    const [isSelected, setIsSelected] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteDeviceId, setDeleteDeviceId] = useState('');
    const [isUpdateFormSelected, setIsUpdateFormSelected] = useState(false);

   
    const [error, setError] = useState({ status: 0, errorMessage: null });

    useEffect(() => {
        fetchDevices();
    }, []);

    function fetchDevices() {
        return API_DEVICES.getDevices((result, status, err) => {
            if (result !== null && status === 200) {
                setTableData((tableData) => (result));
                setIsLoaded((isLoaded) => (true));
            } else {
                setError((error) => ({ status: status, errorMessage: err }));
            }
        });
    }

    function toggleForm() {
        setIsSelected((isSelected) => (!isSelected));
    }

    
    function toggleUpdateForm() {
        setIsUpdateFormSelected((isSelected) => !isSelected);
      } 

    function reload() {
        setIsLoaded((isLoaded) => (false));

        toggleForm();
        fetchDevices();
    }

    function handleDeleteClick() {
        if (deleteDeviceId) {
            // Call the deleteClient function here
            API_DEVICES.deleteDevice(deleteDeviceId, (result, status, err) => {
                if (result !== null && status === 200) {
                    // Handle success (e.g., show a success message)
                } else {
                    setError((error) => ({ status: status, errorMessage: err }));
                }
            });
        }
    }

    return (
        <div>
            <CardHeader>
                <strong> Device Management </strong>
            </CardHeader>
            <Card>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        <Button color="primary" onClick={toggleForm}>Add Device </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        <div className="delete-device-section">
                            <input
                                type="text"
                                placeholder="Device ID to Delete"
                                value={deleteDeviceId}
                                onChange={(e) => setDeleteDeviceId(e.target.value)}
                            />
                            <Button color="danger" onClick={handleDeleteClick}>
                                Delete Device
                            </Button>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                    <Button color="primary" onClick={toggleUpdateForm}>Update Device</Button>

                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        {isLoaded && <DeviceTable tableData={tableData} />}
                        {error.status > 0 &&
                            <APIResponseErrorMessage
                                errorStatus={error.status}
                                error={error.errorMessage}
                            />}
                    </Col>
                </Row>
            </Card>

            <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
                <ModalHeader toggle={toggleForm}> Add Device: </ModalHeader>
                <ModalBody>
                    <DeviceForm reloadHandler={reload} />
                </ModalBody>
            </Modal>
            <Modal isOpen={isUpdateFormSelected} toggle={toggleUpdateForm} size="lg">
                <ModalHeader toggle={toggleUpdateForm}> Update Device: </ModalHeader>
                <ModalBody>
                <DeviceUpdateForm reloadHandler={reload} />
                </ModalBody>
            </Modal>   

        </div>
    );

}

export default DeviceContainer;
