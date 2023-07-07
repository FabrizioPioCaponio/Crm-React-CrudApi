import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

import Dashboard from './Dashboard';
import LeadDetailsPage from './LeadDetailsPage';

const Navigation = (props) => {

    return (
        <>
            <BrowserRouter>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to='/'>DASHBOARD</Link>
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to='/lead-details'>DETTAGLIO LEAD</Link>
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Routes>
                    <Route path={'/'} element={<Dashboard />} />
                    <Route path={'/lead-details'} element={<LeadDetailsPage />} />
                    <Route path={'/lead-details/:leadId'} element={<LeadDetailsPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Navigation;