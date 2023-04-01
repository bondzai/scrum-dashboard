import MaterialReactTable from 'material-react-table';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';

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
            date: moment(item.date).format("DD MMMM"),
        }));
    }, [data]);


    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
    };

    const csvExporter = new ExportToCsv(csvOptions);

    const handleExportData = () => {
        csvExporter.generateCsv(data);
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={formattedData}
            initialState={{
                sorting: [
                    {
                        id: 'date',
                        desc: true,
                    },
                ],
                pagination: { pageSize: 25 },
                density: 'compact'
            }}
            renderTopToolbarCustomActions={({ table }) => (
                <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
                    <Button
                        color="primary"
                        onClick={handleExportData}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                    >
                        Export All Data
                    </Button>
                </Box>
            )}
        />
    );
};

export default CustomTable;
