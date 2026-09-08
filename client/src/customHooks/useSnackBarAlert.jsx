import React, { useCallback, useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const VALID_ALERT_TYPES = ['error', 'info', 'success', 'warning'];

export const useSnackBarAlert = () => {

    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);

    const showAlert = useCallback((message, type) => {
        console.log("showAlert -- message, type >> ", message, type);

        if (!VALID_ALERT_TYPES.includes(type)) {
            throw new Error(`Type mismatched. It should be one of: ${VALID_ALERT_TYPES.join(', ')}`);
        }
        setMessage(message);
        setSeverity(type);
        setOpen(true);
    }, [])

    const hideAlert = useCallback((event, reason) => {
        console.log("hideAlert -- event, reason >> ", event, reason);

        if (reason === 'clickaway') return;

        setOpen(false);
    }, [])


    const alertUI = useMemo(() => <Snackbar open={open} autoHideDuration={6000} onClose={hideAlert}>
        <Alert
            onClose={hideAlert}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
    </Snackbar>
        , [open, severity, message, hideAlert])

    return {
        alertUI,
        showAlert,
        hideAlert
    }
}
