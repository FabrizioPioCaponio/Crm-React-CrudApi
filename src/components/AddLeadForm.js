import React, { useEffect, useState } from 'react';

import { TextField, FormControl, Button, Grid, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';

const AddLeadForm = (props) => {

    console.log("INITIALIZING ADDLEADFORM", props);

    const [hasNameValidationError, setHasNameValidationError] = useState(false);
    const [hasOwnerNameValidationError, setHasOwnerNameValidationError] = useState(false);
    const [hasTypeValidationError, setHasTypeValidationError] = useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = useState(null)
    const [lead, setLead] = useState({
        leadId: 0,
        groupId: 0,
        name: '',
        ownerName: '',
        type: ''
    });

    useEffect(() => {
        console.log("INSIDE USEEFFECT  OF ADDLEADFORM");
        setLead(props.lead);
    }, [props.lead])

    const handleChangeLead = (name, value) => {
        let regex = (/^[A-Z a-z]+$/);
        if (value.length > 0) {
            setValidationErrorMessage(null)
        } else {
            setValidationErrorMessage("Required field");
        }
        switch (name) {
            case 'name':
                setHasNameValidationError(!regex.test(value))
                setValidationErrorMessage((!regex.test(value) && value.length > 0) ? "Formato non corretto" : validationErrorMessage);
                break;

            case 'ownerName':
                setHasOwnerNameValidationError(!regex.test(value))
                setValidationErrorMessage("Formato non corretto")
                break;

            case 'type':
                setHasTypeValidationError(!regex.test(value))
                setValidationErrorMessage("Formato non corretto")
                break;

            default:
                break;
        }
        setLead((lead) => ({ ...lead, [name]: value }));
    }
    const handleSubmitForm = (event) => {
        event.preventDefault();
        props.addLead(lead);
        setLead({
            leadId: 0,
            groupId: 0,
            name: '',
            ownerName: '',
            type: ''
        })
        // chiamata versso il backend
        // gestione eventuale del risultato
    }

    const getModalView = () => {
        return (
            <Dialog
                open={props.formDialogOpen}
                onClose={props.handleFormDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"MODIFICA LEAD"}
                </DialogTitle>
                <DialogContent>
                    {getFormView()}
                </DialogContent>
            </Dialog>

        )
    }

    const getFormView = () => {
        return (
            <Box>
                <FormControl fullWidth margin={'normal'} >
                    <TextField
                        error={hasNameValidationError}
                        helperText={validationErrorMessage ? validationErrorMessage : ""}
                        id="name"
                        label="Ragione Sociale"
                        variant="standard"
                        name='name'
                        value={lead.name}
                        onChange={(event) => handleChangeLead(event.target.name, event.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth margin={'normal'} >
                    <TextField
                        error={hasOwnerNameValidationError}
                        helperText={hasOwnerNameValidationError ? "Formato non corretto" : ""}
                        id="ownerName"
                        label="Nominativo di riferimento"
                        variant="standard"
                        name='ownerName'
                        value={lead.ownerName}
                        onChange={(event) => handleChangeLead(event.target.name, event.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth margin={'normal'}>
                    <TextField
                        error={hasTypeValidationError}
                        helperText={hasTypeValidationError ? "Formato non corretto" : ""}
                        id="type"
                        label="Tipo"
                        variant="standard"
                        name='type'
                        value={lead.type}
                        onChange={(event) => handleChangeLead(event.target.name, event.target.value)}
                    />
                </FormControl>
                <Grid container>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth margin={'normal'}>
                            <Button
                                size='large'
                                variant="contained"
                                onClick={(event) => handleSubmitForm(event)}>SALVA</Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        )
    }
    return (
        <>
            {
                props?.viewMode === 'modal' ? getModalView() : getFormView() 
            }
        </>
    )
}

export default AddLeadForm;