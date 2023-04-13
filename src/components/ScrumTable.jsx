import MaterialReactTable from 'material-react-table';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import { Box } from '@mui/material';
import EditButton from './EditButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

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
                Cell: ({ cell }) => {
                    const value = cell.getValue();
                    let color;
                    let icon;
                    if (value === 'Done') {
                        icon = <CheckCircleOutlineIcon />;
                        color = 'green';
                    } else if (value === 'In progress') {
                        icon = <AutorenewIcon />;
                        color = 'orange';
                    } else if (value === 'Pending') {
                        icon = <PendingActionsIcon />;
                        color = 'red';
                    } else {
                        color = 'black';
                    }
                    return (
                        <div style={{ color, display: 'flex', alignItems: 'center' }}>
                            {icon}
                            <span style={{ marginLeft: '0.5rem' }}>{value}</span>
                        </div>
                    );
                },
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
            enablePinning
            initialState={{
                sorting: [
                    { id: 'date', desc: true, },
                ],
                pagination: { pageSize: 25 },
                density: 'compact',
            }}
            renderTopToolbarCustomActions={({ table }) => (
                <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
                    <EditButton />
                    *** Automatically purge data every Sunday.
                </Box>
            )}
        />
    );
};

export default ScrumTable;
