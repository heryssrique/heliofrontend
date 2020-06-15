import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function Header() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    Agenda
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
