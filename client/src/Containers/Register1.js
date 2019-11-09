import React, {Component} from 'react';
import {withStyles, ThemeProvider} from '@material-ui/core/styles'
import {TextField, Typography, Button, createMuiTheme, CssBaseline} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";


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

class Register1 extends Component {
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
                <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} className={classes.mainText}>Get
                            Organized</Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.email}
                            label={'Enter email here'}
                            floatingLabelText={'Email'}
                            onChange={handleChange('email')}
                            defaultValue={values.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            label={'Start'}
                            variant={'contained'}
                            onClick={this.continue}
                            className={classes.button}
                        >
                            <Typography variant={'button'}>
                                Start
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Register1);
