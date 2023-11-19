import React, { useState, useEffect } from 'react';
import { Col, Card } from 'reactstrap';
import APIResponseErrorMessage from '../commons/errorhandling/api-response-error-message';
import DeviceTable from './components/device-table';
import * as API from '../api/api';

function ClientDeviceContainer() {

  const [devicesData, setDevicesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState({ status: 0, errorMessage: null });

  useEffect(() => {
    fetchDevices();
  }, []);

  function fetchDevices() {
    
    const clientId = sessionStorage.getItem("userId");

    if (!clientId) {
      console.error("Client ID is missing in sessionStorage");
      return;
    }
    else{
      console.info("Client is retrieved"+clientId);
    }

    API.getDevicesForClient(clientId, (result, status, err) => {
      if (result !== null && status === 200) {
        setDevicesData(result);
        setIsLoaded(true);
      } else {
        setError({ status: status, errorMessage: err });
      }
    });
  }

  return (
    <Card>
      <Col sm={{ size: '8', offset: 2 }}>
        {isLoaded ? (
          <div>
            <h3>Devices</h3>
            {devicesData.length === 0 ? (
              <p>No devices found.</p>
            ) : (
              <DeviceTable devices={devicesData} />
            )}
          </div>
        ) : (
          <p>Loading devices...</p>
        )}
        {error.status > 0 && (
          <APIResponseErrorMessage
            errorStatus={error.status}
            error={error.errorMessage}
          />
        )}
      </Col>
    </Card>
  );
}

export default ClientDeviceContainer;
