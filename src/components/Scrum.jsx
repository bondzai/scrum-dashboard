import MaterialReactTable from 'material-react-table';
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';


const ScrumTable = () => {
    const URL = import.meta.env.VITE_SHEET_URL
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(URL)
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

    const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => row.original));
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={formattedData}
            enableRowSelection
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
                        onClick={handleExportData}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                    >
                        Export All Data
                    </Button>
                    <Button
                        disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        color="inherit"
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                    >
                        Export Selected Data
                    </Button>
                </Box>
            )}
        />
    );
};

export default ScrumTable;
