import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import AdminForm from "./components/admin-form";
import UpdateAdminForm from "./components/admin-update-form"
import AdminNavBar from '../navbars/adminNavbar';
import * as API from "../api/api";
import AdminTable from "./components/admin-table";

function AdminContainer(props) {
    const [isSelected, setIsSelected] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteAdminId, setDeleteAdminId] = useState('');
    const [isUpdateFormSelected, setIsUpdateFormSelected] = useState(false);
 

    // Store error status and message in the same object because we don't want 
    // to render the component twice (using setError and setErrorStatus)
    // This approach can be used for linked state variables.
    const [error, setError] = useState({ status: 0, errorMessage: null });


    // componentDidMount
    useEffect(() => {
        fetchAdmins();
    }, []);

    function fetchAdmins() {
        return API.getAdmins((result, status, err) => {
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
        fetchAdmins();
    }

    function handleDeleteClick() {
        if (deleteAdminId) {
            // Call the deleteAdmin function here
            API.deleteAdmin(deleteAdminId, (result, status, err) => {
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
                <strong> Admin Management </strong>
            </CardHeader>
            <Card>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        <Button color="primary" onClick={toggleForm}>Add Admin </Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        <div className="delete-admin-section">
                            <input
                                type="text"
                                placeholder="Admin ID to Delete"
                                value={deleteAdminId}
                                onChange={(e) => setDeleteAdminId(e.target.value)}
                            />
                            <Button color="danger" onClick={handleDeleteClick}>
                                Delete Admin
                            </Button>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                    <Button color="primary" onClick={toggleUpdateForm}>Update Admin</Button>

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        {isLoaded && <AdminTable tableData={tableData} />}
                        {error.status > 0 &&
                            <APIResponseErrorMessage
                                errorStatus={error.status}
                                error={error.errorMessage}
                            />}
                    </Col>
                </Row>
            </Card>

            <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
                <ModalHeader toggle={toggleForm}> Add Admin: </ModalHeader>
                <ModalBody>
                    <AdminForm reloadHandler={reload} />
                </ModalBody>
            </Modal>
            <Modal isOpen={isUpdateFormSelected} toggle={toggleUpdateForm} size="lg">
                <ModalHeader toggle={toggleUpdateForm}> Update Admin: </ModalHeader>
                <ModalBody>
                <UpdateAdminForm reloadHandler={reload} />
                </ModalBody>
            </Modal>                    
        </div>
    );

}

export default AdminContainer;
