import React from 'react';
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Button from "@material-ui/core/Button";
import {createNote, editNote, saveNote} from "../../actions/noteActions";
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        padding: '12px'
    },
    title: {
        width: '100%',
    },
    body: {
        width: '100%'
    }
}));


const Note = ({saveNote, note}) => {
    const classes = useStyles();

    const [noteCur, updateNote] = React.useState(note);

    const handleDateChange = date => {
        const mm = date.getMonth()+1;
        const dd = date.getDate();
        const yyyy = date.getFullYear();
        const goaldate = mm + '/' + dd + '/' + yyyy;
        updateNote({...noteCur, 'goal_date': goaldate});
    };

    const handleNoteChange = e => {
        updateNote({...noteCur, [e.target.name]: e.target.value});
    };

    const save = e => {
        e.preventDefault();
        saveNote(noteCur);
    };

    if (note === null) {
        return (
            ''
        )
    } else {
        return (
            <Paper className={classes.root}>
                <Grid container direction={'column'} spacing={2}>
                    <Grid item xs={12}>
                        <TextField label={"title"}
                                   name={"title"}
                                   onChange={handleNoteChange}
                                   value={noteCur.title}
                                   className={classes.title}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction={'row'}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        name="goal_date"
                                        format="MM/dd/yyyy"
                                        value={noteCur.goal_date}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                {/*<Grid item>*/}
                                {/*    <KeyboardTimePicker*/}
                                {/*        margin="normal"*/}
                                {/*        id="time-picker"*/}
                                {/*        label="Time picker"*/}
                                {/*        value={selectedDate}*/}
                                {/*        onChange={handleDateChange}*/}
                                {/*        KeyboardButtonProps={{*/}
                                {/*            'aria-label': 'change time',*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.body}
                            onChange={handleNoteChange}
                            label={'data'}
                            name={'data'}
                            multiline
                            rows={'10'}
                            value={noteCur.data}
                        />
                    </Grid>
                </Grid>
                <Button onClick={save}>Save</Button>
            </Paper>
        )
    }
};

Note.propTypes = {
    note: PropTypes.object,
    saveNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    note: state.notes.note,
});

export default connect(
    mapStateToProps,
    {saveNote})(Note);
