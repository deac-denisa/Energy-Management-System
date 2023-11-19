import { HOST } from '../commons/hosts';
import RestApi from "../commons/api/rest";    

const endpoint = {
    device: '/device',
    client: '/client',
    admin: '/admin'
};

function getDevices(callback) {
    let request = new Request(HOST.device_api + endpoint.device, {
        method: 'GET',
    });
    console.log(request.url);
    RestApi.performRequest(request, callback);
}

function getDeviceById(params, callback) {
    let request = new Request(HOST.device_api + endpoint.device + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApi.performRequest(request, callback);
}

function postDevice(user, callback) {
    let request = new Request(HOST.device_api + endpoint.device, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApi.performRequest(request, callback);
}

function deleteDevice(deviceId, callback) {
    let request = new Request(HOST.device_api + endpoint.device + `/${deviceId}`, {
        method: 'DELETE',
    });

    RestApi.performRequest(request, callback);
}

function updateDevice(device, callback) {
    let request = new Request(HOST.device_api + endpoint.device, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    RestApi.performRequest(request, callback);
}


function getClients(callback) {
    let request = new Request(HOST.users_api + endpoint.client, {
        method: 'GET',
    });
    console.log(request.url);
    RestApi.performRequest(request, callback);
}

function getDevicesForClient(clientId, callback) {
    let request = new Request(HOST.device_api + endpoint.device + `/client/${clientId}`, {
        method: 'GET',
    });

    RestApi.performRequest(request, callback);
}

function getClientById(params, callback) {
    let request = new Request(HOST.users_api + endpoint.device + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApi.performRequest(request, callback);
}

function postClient(user, callback) {
    let request = new Request(HOST.users_api + endpoint.client, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApi.performRequest(request, callback);
}


function deleteClient(clientId, callback) {

    getDevicesForClient(clientId, (devices, status, err) => {
        if (devices !== null && status === 200) {
            
            let request = new Request(HOST.users_api + endpoint.client + `/${clientId}`, {
                method: 'DELETE',
            });
            RestApi.performRequest(request, (result, status, err) => {
                if (result !== null && status === 200) {
                    // Handle success (e.g., show a success message)
                } else {
                    callback(null, status, err);
                }
            });

            // Delete the devices
            devices.forEach((device) => {
                let deviceRequest = new Request(HOST.device_api + endpoint.device + `/${device.id}`, {
                    method: 'DELETE',
                });

                RestApi.performRequest(deviceRequest, (result, status, err) => {
                    // Handle the result as needed, possibly logging or ignoring any errors
                });
            });
        } else {
            callback(null, status, err);
        }
    });
}

function updateClient(client, callback) {
    let request = new Request(HOST.users_api + endpoint.client, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
    });

    RestApi.performRequest(request, callback);
}

function loginUser(user, userType, callback) {
    let requestUrl = '';

    if (userType === 'client') {
        requestUrl = HOST.users_api + endpoint.client + '/login';
    } else if (userType === 'administrator') {
        requestUrl = HOST.users_api + endpoint.admin + '/login';
    }

    // Create a query string with user data
    const queryParams = `username=${user.username}&password=${user.password}`;
    requestUrl += `?${queryParams}`;

    let request = new Request(requestUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    RestApi.performRequest(request, (result, status, err) => {
        if (result !== null && status === 201) {
            callback(result, status, null); // Pass the user's ID
        } else {
            callback(null, status, err);
        }
    });
}


function getAdmins(callback) {
    let request = new Request(HOST.users_api + endpoint.admin, {
        method: 'GET',
    });
    console.log(request.url);
    RestApi.performRequest(request, callback);
}

function getAdminById(adminId, callback) {
    let request = new Request(HOST.users_api + endpoint.admin + `/${adminId}`, {
        method: 'GET',
    });

    console.log(request.url);
    RestApi.performRequest(request, callback);
}

function postAdmin(admin, callback) {
    let request = new Request(HOST.users_api + endpoint.admin, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin)
    });

    console.log("URL: " + request.url);

    RestApi.performRequest(request, callback);
}

function deleteAdmin(adminId, callback) {
    let request = new Request(HOST.users_api + endpoint.admin + `/${adminId}`, {
        method: 'DELETE',
    });

    RestApi.performRequest(request, callback);
}

function updateAdmin(admin, callback) {
    let request = new Request(HOST.users_api + endpoint.admin, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin)
    });

    RestApi.performRequest(request, callback);
}



export {
    getDevices,
    getDeviceById,
    postDevice,
    updateDevice, 
    deleteDevice,

    getClients,
    getClientById,
    postClient,
    deleteClient,
    updateClient, 

    getAdmins,
    getAdminById,
    postAdmin,
    updateAdmin,
    deleteAdmin,

    loginUser,
    getDevicesForClient
};
