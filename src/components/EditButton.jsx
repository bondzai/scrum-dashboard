import React, { useState, useRef, useEffect } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, Modal, Box, TextField } from '@mui/material';

const ModalPassphrase = ({ open, onClose }) => {
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState(false);
    const [dataUrl, setDataUrl] = useState('');
    const inputRef = useRef(null);

    const DATA_URL = import.meta.env.VITE_DATA_URL;
    const PASSPHRASE = import.meta.env.VITE_PASSPHRASE;

    const openWindow = (url) => {
        window.open(url, '_blank');
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
        if (passphrase === PASSPHRASE) {
            alert('Welcome');
            setDataUrl(DATA_URL);
        } else {
            setError(true);
        }
        setPassphrase('');
    };

    useEffect(() => {
        if (dataUrl) {
            onClose();
            openWindow(dataUrl);
            setDataUrl('');
        }
    }, [dataUrl, onClose]);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 0);
        } else {
            setError(false);
            setDataUrl('');
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
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
                    inputRef={inputRef}
                />
                <Button color="primary" onClick={handleConfirm} variant="contained">Confirm</Button>
            </Box>
        </Modal>
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
            <Button color="inherit" onClick={handleOpen} startIcon={<ModeEditIcon />} variant="contained">Edit</Button>
            <ModalPassphrase open={open} onClose={handleClose} />
        </div>
    );
};

export default EditButton;
