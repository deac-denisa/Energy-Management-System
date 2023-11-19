import React from "react";
import Table from "../../commons/tables/table";

const columns = [
    {
        Header: 'ID', 
        accessor: 'id', 
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Consumption',
        accessor: 'consumption',
    },
    
];

const filters = [
    {
        accessor: 'description',
    }
];

function DeviceTable(props) {
    console.log(props.devices);
    return (       
        <Table
            data={props.devices}
            columns={columns}
            search={filters}
            pageSize={5}
        />
    );
}

export default DeviceTable;
