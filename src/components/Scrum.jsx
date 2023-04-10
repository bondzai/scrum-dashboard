import MaterialReactTable from 'material-react-table';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import { Box } from '@mui/material';
import EditButton from './EditButton';


const ScrumTable = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL)
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
                accessorKey: 'status',
                header: 'Status',
                size: 60,
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
            date: moment(item.date).format("YYYY-MM-DD"),
        }));
    }, [data]);

    return (
        <MaterialReactTable
            columns={columns}
            data={formattedData}
            initialState={{
                sorting: [
                    { id: 'date', desc: true, },
                ],
                pagination: { pageSize: 25 },
                density: 'compact'
            }}
            renderTopToolbarCustomActions={({ table }) => (
                <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
                    <EditButton />
                    *** Automatically purge data that is older than 2 days.    
                </Box>
            )}
        />
    );
};

export default ScrumTable;
