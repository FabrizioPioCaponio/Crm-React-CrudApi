import React, { useState } from 'react';

import {
    List,
    ListItem,
    ListItemText,
    Typography,
    ListItemIcon,
    ListItemButton,
    Button,
    Box,
    Divider,
    Card,
    CardContent,
    CardActions,
    Grid
} from '@mui/material';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import AppsIcon from '@mui/icons-material/Apps';

import LeadDetailsDialog from './LeadDetailsDialog';
import { Link } from 'react-router-dom';

const LeadList = (props) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentLead, setCurrentLead] = useState(null);
    const [listViewMode, setListViewMode] = useState('list');

    const handleCurrentLead = (entry) => {
        setCurrentLead(entry);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleListItemEditClick = (lead) => {
        props.retrieveLead(lead);
        props.openFormDialog();
    }

    const showList = () => {
        return (
            <List>
                {
                    props.leads.map((entry, index) => (
                        <ListItem
                            key={'lead-' + index}

                            style={{ borderBottom: '1px solid lightgrey' }}>
                            <ListItemIcon>
                                <WorkOutlineIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    onClick={() => handleCurrentLead(entry)}
                                    variant='h6'>{entry.name}
                                </Typography>
                            </ListItemText>
                            <ListItemButton
                                style={{ maxWidth: '60px' }}>
                                <ListItemIcon>
                                    <Link to={'/lead-details/' + entry.leadId}><InfoOutlinedIcon /></Link>
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton
                                style={{ maxWidth: '60px' }}
                                onClick={() => handleListItemEditClick(entry)} >
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton
                                style={{ maxWidth: '60px' }}
                                onClick={() => props.deleteLead(entry.leadId)} >
                                <ListItemIcon>
                                    <DeleteOutlineIcon />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    const showCards = () => {
        return (
            <>
                <Grid container spacing={2}>
                    {
                        props.leads.map((entry, index) => (
                            <Grid item xs={4} key={entry.leadId}>
                                <Card>
                                    <CardContent>
                                        <Typography variant={'h3'}>{entry.name}</Typography>
                                        <Typography variant={'h6'}>({entry.type})</Typography>
                                        <Typography variant={'h5'}>{entry.ownerName}</Typography>
                                        <Divider />
                                    </CardContent>

                                    <CardActions>

                                        <Button onClick={() => handleListItemEditClick(entry)}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => props.deleteLead(entry.leadId)} >
                                            <DeleteOutlineIcon />
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </>
        )
    }

    return (
        <>
            <LeadDetailsDialog
                dialogOpen={dialogOpen}
                lead={currentLead}
                handleDialogClose={handleDialogClose} />
            <Box style={{ textAlign: 'right' }}>
                <Divider />
                {
                    listViewMode === 'list' ?
                        <>
                            <Button disabled onClick={() => setListViewMode('list')}>
                                <ViewListIcon />
                            </Button>
                            <Button onClick={() => setListViewMode('cards')}>
                                <AppsIcon />
                            </Button>
                        </>
                        :
                        <>
                            <Button onClick={() => setListViewMode('list')}>
                                <ViewListIcon />
                            </Button>
                            <Button disabled onClick={() => setListViewMode('cards')}>
                                <AppsIcon />
                            </Button>
                        </>
                }
                <Divider />
            </Box>
            {
                listViewMode === 'list' ? showList() : showCards()
            }
        </>
    )
}

export default LeadList;