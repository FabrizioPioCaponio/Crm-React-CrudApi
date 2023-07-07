import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

const LeadDetailsDialog = (props) => {

    return (
        <Dialog
            open={props.dialogOpen}
            onClose={props.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"DETTAGLIO DEL SINGOLO LEAD"}
            </DialogTitle>
            <DialogContent>
                <h3>{props?.lead?.name}</h3>
                <h5>({props?.lead?.type})</h5>
                <h4>{props?.lead?.ownerName}</h4>
            </DialogContent>
        </Dialog>
    )
}

export default LeadDetailsDialog;