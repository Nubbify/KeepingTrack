import React from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
    formWrapper: {
        marginTop: '200px',
        padding: '25px 25px 45px 25px',
        justifyContent: 'center',
        borderRadius: '20px'
    },
    buttonGroup: {
        marginTop: '5px'
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
    },
}));

const Register2 = ({nextStep, prevStep, handleSubmit, values, handleChange, handleClickShowPassword, handleMouseDownPassword, handleClickShowPassword2, handleMouseDownPassword2}) => {
    const classes = useStyles();
    return (
        <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
            <Paper className={classes.formWrapper}>
                <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label={'User Name'}
                            name={'userName'}
                            variant={'outlined'}
                            onChange={handleChange}
                            defaultValue={values.userName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange}
                                name={'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword2 ? 'text' : 'password'}
                                value={values.password2}
                                onChange={handleChange}
                                name={'password2'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                        >
                                            {values.showPassword2 ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container direction={'row'} justify={'center'} alignItems={'center'} spacing={3}
                          className={classes.buttonGroup}>
                        <Grid item>
                            <Button
                                label={'Continue'}
                                variant={'contained'}
                                onClick={handleSubmit}
                                color={'secondary'}
                            >
                                <Typography variant={'button'}>
                                    Continue
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                label={'Back'}
                                variant={'contained'}
                                onClick={prevStep}
                            >
                                <Typography variant={'button'}>
                                    Back
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Register2;
