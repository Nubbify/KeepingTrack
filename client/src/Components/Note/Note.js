import React, {useEffect} from 'react';
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {saveNote} from "../../actions/noteActions";
import PropTypes from 'prop-types'
import {
    Button, CardActions,
    Checkbox,
    Chip,
    Grid,
    GridList,
    GridListTile,
    IconButton,
    InputBase,
    Paper,
    TextField
} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab'
import {AttachFile, CheckBox, CheckBoxOutlineBlank, Filter} from "@material-ui/icons"
import {fade} from "@material-ui/core/styles";
import {assignCategory, createCategory, unassignCategory} from "../../actions/categoryActions";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        padding: '12px',
        backgroundColor: theme.palette.background.default,
    },
    title: {
        width: '100%',
    },
    body: {
        width: '100%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        // marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            width: '100%',
        },
    },
    filterIcon: {
        // width: theme.spacing(0),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 4),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    catList: {
        width: '100%'
    },
    attach: {
        display: 'none',
    },

}));


const Note = ({saveNote, note, categories, createCategory, assignCategory, unassignCategory}) => {
    const classes = useStyles();

    const [noteCur, updateNote] = React.useState(note);
    const [selectedCats, updateSelectedCats] = React.useState([]);

    useEffect(() => {
        updateNote(note)
    }, [note]);

    const handleDateChange = date => {
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        const yyyy = date.getFullYear();
        const goaldate = mm + '/' + dd + '/' + yyyy;
        updateNote({...noteCur, 'goal_date': goaldate});
    };


    const handleUpdateCategories = e => {
        console.log('e: ', e);
        console.log('e.t: ', e.target);
        console.log('e.t.v: ', e.target.value);
        if (e) {
            const updateCat = e.target.value;
            if (e.target.id === 'category-selector'){
                const selectedCat = categories.filter(cat => cat.name === updateCat);
                if (selectedCat) {
                    assignCategory(selectedCat,noteCur.id);
                } else {
                    // COLOR PICKER HERE
                    const color = '#ab29c8';
                    const newCat = createCategory({updateCat, color});
                    assignCategory(newCat, noteCur.id);
                }
            }
        }
        e.preventDefault();
    };

    const handleNoteChange = e => {
        updateNote({...noteCur, [e.target.name]: e.target.value});
    };

    const removeCat = (e, category) => {
        e.preventDefault();
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
                        <TextField label={"Title"}
                                   name={"title"}
                                   onChange={handleNoteChange}
                                   value={noteCur.title}
                                   className={classes.title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction={'row'}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Goal Date"
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
                        <Autocomplete
                            multiple
                            freeSolo
                            autoComplete
                            autoHighlight
                            id="category-selector"
                            options={categories}
                            disableCloseOnSelect
                            getOptionLabel={option => option.name}
                            // includeInputInList
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                    {option.name}
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlank fontSize={'small'}/>}
                                        checkedIcon={<CheckBox fontSize={'small'}/>}
                                        style={{ marginRight: 8, marginLeft: 'auto' }}
                                        checked={selected}
                                    />
                                </React.Fragment>
                            )}
                            onChange={handleUpdateCategories} // value of element added or deleted from selected list
                            style={{ width: '100%' }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Categories"
                                    placeholder="Categories ..."
                                    fullWidth

                                />
                            )}
                        />
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
                <input
                    accept=
                        "text/*
                                audio/*,
                                video/*,
                                image/*,
                                .pdf,
                                .txt,
                                .doc,
                                .docx,
                                application/msword,
                                application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className={classes.attach}
                    id="attach-icon-file"
                    type="file"
                />
                <label htmlFor="attach-icon-file">
                    <IconButton color="primary" aria-label="upload document" component="span">
                        <AttachFile />
                    </IconButton>
                </label>
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
    categories: state.cat.categories,
});

export default connect(
    mapStateToProps,
    {saveNote, createCategory, assignCategory, unassignCategory})(Note);
