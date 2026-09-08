import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

const CustomAlertUI = (type) => {
    return <Alert
        // onClose={handleClose}
        severity=''
        variant="filled"
    >
        {message}
    </Alert>
}


const AlertTypes = 'error'|'info'|'success'|'warning'

const SnackBarAlert = ({ message='', type='success' }) => {
    
    if(type!==AlertTypes) throw new Error(`Type mismatched. It should be one of these type ${AlertTypes}`)

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    return <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
    >
        <CustomAlertUI type/>
    </Snackbar>
}



export default SnackBarAlert