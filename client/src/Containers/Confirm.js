import React, {Component} from 'react';
import {withStyles, ThemeProvider} from '@material-ui/core/styles'
import {TextField, Typography, Button, createMuiTheme, CssBaseline} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Navbar from "./Navbar";


const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {default: '#1C313A'}
    }
});

const styles = {
    root: {
        backgroundColor: theme.palette.background.default
    },
    mainText: {
        color: theme.palette.text.primary,
        marginTop: 200,
        marginBottom: 40
    },
    email: {
        marginTop: 50,
        alignItems: 'center',
        justify: 'center',
        alignText: 'center',
        color: theme.palette.text.primary
    },
    emailText: {
        alignText: 'center'
    },
    button: {
        margin: '15',
        backgroundColor: theme.palette.primary.light
    }
};

class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const {values, handleChange} = this.props;
        const classes = this.props.classes;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar from={'success'}/>
                <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h3'} className={classes.mainText}>Submission Success!</Typography>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Confirm);
