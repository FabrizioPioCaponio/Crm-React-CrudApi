import { Grid, Container, Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

import { findAll, updateLead, deleteLead } from "../api/LeadApi";
import AddLeadForm from "./AddLeadForm";
import LeadList from "./LeadList";

const emptyLead = {
    leadId: 0,
    groupId: 0,
    name: '',
    ownerName: '',
    type: ''
}
const Dashboard = (props) => {

    const [leads, setLeads] = useState([])
    const [currentLead, setCurrentLead] = useState(emptyLead);
    const [formDialogOpen, setFormDialogOpen] = useState(false);

    useEffect(() => {
        //setInterval(getLeadList, 5000)
        getLeadList();
    }, [])

    const getLeadList = () => {
        findAll({})
            .then(result => {
                if (Array.isArray(result)) {
                    setLeads(result);
                }
                console.log("FINDALL RESULT", result);
            })
    }

    const addLead = (params) => {
        updateLead(params)
            .then(result => {
                setFormDialogOpen(false);
                console.log("RESULT FORM LEAD INSERTION", result);
                getLeadList();
            })
    }

    /*
        funzione che ricarica il form con il lead valorizzato
    */
    const retrieveLead = (lead) => {
        console.log("RETRIEVING LEAD", lead);
        setCurrentLead(lead);
    }

    const handleDeleteLead = (leadId) => {
        deleteLead({
            leadId: leadId
        })
            .then(result => {
                getLeadList();
            })
    }

    const handleFormDialogClose = () => {
        setFormDialogOpen(false);
    }

    const openFormDialog = () => {
        setFormDialogOpen(true);
    }

    return (
        <>
            <Box>
                <Grid container spacing={5}>
                    <Grid item xs={12} className='customTitle'>
                        <h1>DASHBOARD</h1>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Paper elevation={1} style={{ minHeight: '500px', padding: '15px' }}>
                            <h2>LISTA DEI LEAD ESISTENTI</h2>
                            <LeadList
                                leads={leads}
                                mode={'basic'}
                                getLeadList={getLeadList}
                                deleteLead={handleDeleteLead}
                                retrieveLead={retrieveLead}
                                openFormDialog={openFormDialog}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={1} style={{ minHeight: '500px', padding: '15px' }}>
                            <h2>MODULO DI INSERIMENTO LEAD</h2>
                            <AddLeadForm
                                viewMode={'form'}
                                addLead={addLead}
                                lead={emptyLead}
                                handleFormDialogClose={handleFormDialogClose}
                                formDialogOpen={formDialogOpen} />
                            <AddLeadForm
                                viewMode={'modal'}
                                addLead={addLead}
                                lead={currentLead}
                                handleFormDialogClose={handleFormDialogClose}
                                formDialogOpen={formDialogOpen} />
                        </Paper>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Dashboard;