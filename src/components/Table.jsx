import MaterialReactTable from 'material-react-table';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";

const CustomTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("https://script.google.com/macros/s/AKfycbxXkIYhmC4EpXON-wpmfKyOGtSeJyFdqiu4RrYJb7GYdF_DxZzxEyVWmbIwB0sSPFJa/exec?action=readData")
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorKey: 'platform',
                header: 'Platform',
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                accessorKey: 'dev',
                header: 'Dev',
            },
            {
                accessorKey: 'remark',
                header: 'Remark',
            },
        ],
        [data],
    );

    return <MaterialReactTable columns={columns} data={data} />;
};

export default CustomTable;
