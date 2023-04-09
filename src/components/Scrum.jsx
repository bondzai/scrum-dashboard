import MaterialReactTable from 'material-react-table';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import { Box, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const ScrumTable = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const DATA_URL = import.meta.env.VITE_DATA_URL
    const [data, setData] = useState([]);

    const openInNewTab = (e) => {
        window.open(e, '_blank', 'noopener,noreferrer');
    };

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
                    <Button
                        color="inherit"
                        onClick={() => openInNewTab(DATA_URL)}
                        startIcon={<ModeEditIcon />}
                        variant="contained"
                    >
                        Edit
                    </Button>
                </Box>
            )}
        />
    );
};

export default ScrumTable;
