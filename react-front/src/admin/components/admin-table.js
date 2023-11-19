import React from "react";

import Table from "../../commons/tables/table";

const columns = [
    {
        Header: 'ID', 
        accessor: 'id', 
    },
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Password',
        accessor: 'password',
    }
];

const filters = [
    {
        accessor: 'username',
    }
];

function ClientTable(props) {
    return (
        <Table
            data={props.tableData}
            columns={columns}
            search={filters}
            pageSize={5}
        />
    );
}

export default ClientTable;
