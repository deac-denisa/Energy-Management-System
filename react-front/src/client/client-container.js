import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import ClientForm from "./components/client-form";
import UpdateClientForm from "./components/client-update-form"
import AdminNavBar from '../navbars/adminNavbar';
import * as API_USERS from "../api/api";
import ClientTable from "./components/client-table";

function ClientContainer(props) {
    const [isSelected, setIsSelected] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteClientId, setDeleteClientId] = useState('');
    const [isUpdateFormSelected, setIsUpdateFormSelected] = useState(false);
 

    // Store error status and message in the same object because we don't want 
    // to render the component twice (using setError and setErrorStatus)
    // This approach can be used for linked state variables.
    const [error, setError] = useState({ status: 0, errorMessage: null });


    // componentDidMount
    useEffect(() => {
        fetchClients();
    }, []);

    function fetchClients() {
        return API_USERS.getClients((result, status, err) => {
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
        fetchClients();
    }

    function handleDeleteClick() {
        if (deleteClientId) {
            // Call the deleteClient function here
            API_USERS.deleteClient(deleteClientId, (result, status, err) => {
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
                <strong> Client Management </strong>
            </CardHeader>
            <Card>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        <Button color="primary" onClick={toggleForm}>Add Client </Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        <div className="delete-client-section">
                            <input
                                type="text"
                                placeholder="Client ID to Delete"
                                value={deleteClientId}
                                onChange={(e) => setDeleteClientId(e.target.value)}
                            />
                            <Button color="danger" onClick={handleDeleteClick}>
                                Delete Client
                            </Button>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                    <Button color="primary" onClick={toggleUpdateForm}>Update Client</Button>

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        {isLoaded && <ClientTable tableData={tableData} />}
                        {error.status > 0 &&
                            <APIResponseErrorMessage
                                errorStatus={error.status}
                                error={error.errorMessage}
                            />}
                    </Col>
                </Row>
            </Card>

            <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
                <ModalHeader toggle={toggleForm}> Add Client: </ModalHeader>
                <ModalBody>
                    <ClientForm reloadHandler={reload} />
                </ModalBody>
            </Modal>
            <Modal isOpen={isUpdateFormSelected} toggle={toggleUpdateForm} size="lg">
                <ModalHeader toggle={toggleUpdateForm}> Update Client: </ModalHeader>
                <ModalBody>
                <UpdateClientForm reloadHandler={reload} />
                </ModalBody>
            </Modal>                    
        </div>
    );

}

export default ClientContainer;
