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
                size: 50,
            },
            {
                accessorKey: 'platform',
                header: 'Platform',
                size: 40,
            },
            {
                accessorKey: 'task',
                header: 'Task',
            },
            {
                accessorKey: 'dev',
                header: 'Dev',
                size: 60,
            },
            {
                accessorKey: 'remark',
                header: 'Remark',
            },
        ],
        [data],
    );

    const formattedData = useMemo(() => {
        return data.map((item) => ({
            ...item,
            date: moment(item.date).format("DD MMMM"),
        }));
    }, [data]);

    return (
        <MaterialReactTable
            columns={columns}
            data={formattedData}
            rowsPerPage={20}
            initialState={{
                sorting: [
                    {
                        id: 'date',
                        desc: true,
                    },
                ],
                pagination: { pageSize: 25},
                density: 'compact'
            }}
        />
    );
};

export default CustomTable;
