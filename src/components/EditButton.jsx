import React, { useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, Modal, Box, TextField } from '@mui/material';

const SimpleModal = ({ open, onClose }) => {
    console.log("start")
    console.log(open)
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState(false);

    const DATA_URL = import.meta.env.VITE_DATA_URL

    const openWindow = (e) => {
        window.open(e, '_self');
    };

    const handleChange = (event) => {
        setPassphrase(event.target.value);
        setError(false);
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleConfirm();
        }
    };

    const handleConfirm = () => {
        if (passphrase === import.meta.env.VITE_PASSPHRASE) {
            alert('Welcome');
            openWindow(DATA_URL);
        } else {
            setError(true);
        }
        setPassphrase('');
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <TextField
                    error={error}
                    id="outlined-error-helper-text"
                    label="Fill the passphrase."
                    type='password'
                    helperText={error ? 'Incorrect passphrase.' : null}
                    value={passphrase}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    color="primary"
                    onClick={handleConfirm}
                    variant="contained"
                >
                    Confirm
                </Button>
            </Box>
        </Modal >
    );
};

const EditButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                color="inherit"
                onClick={handleOpen}
                startIcon={<ModeEditIcon />}
                variant="contained"
            >
                Edit
            </Button>
            <SimpleModal open={open} onClose={handleClose} />
        </div>
    );
};

export default EditButton;
