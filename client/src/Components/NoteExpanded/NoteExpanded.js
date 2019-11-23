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


const NoteExpanded = ({note, editNote, createNote, saveNote, mode}) => {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [noteCur, updateNote] = React.useState(note);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleNoteChange = e => {
        updateNote({...noteCur, [e.target.name]: e.target.value});
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
                                   handleChange={handleNoteChange}
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
                                        name="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Time picker"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.body}
                            handleChange={handleNoteChange}
                            label={'data'}
                            name={'data'}
                            multiline
                            rows={'10'}
                        />
                    </Grid>
                </Grid>
                <Button onClick={mode === 'create' ? createNote(note) : saveNote(note)}>Save</Button>
            </Paper>
        )
    }
};

NoteExpanded.propTypes = {
    note: PropTypes.object,
    editNote: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    note: state.notes.note,
});

export default connect(
    mapStateToProps,
    {editNote, saveNote, createNote})(NoteExpanded);
