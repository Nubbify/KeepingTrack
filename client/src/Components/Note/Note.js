import React, {useEffect} from 'react';
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {saveNote} from "../../actions/noteActions";
import PropTypes from 'prop-types'
import {Button, Checkbox, Chip, Grid, GridList, GridListTile, InputBase, Paper, TextField} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab'
import {CheckBox, CheckBoxOutlineBlank, Filter} from "@material-ui/icons"
import {fade} from "@material-ui/core/styles";

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
    }

}));


const Note = ({saveNote, note}) => {
    const classes = useStyles();

    const categories = [
        'homework',
        'chores',
        'projects',
        'papers',
        'recipes',
        'bread',
        'music',
        'lyrics',
    ]
    const [noteCur, updateNote] = React.useState(note);

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
                            id="checkboxes-tags-demo"
                            options={categories}
                            disableCloseOnSelect
                            getOptionLabel={option => option}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                    {option}
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlank fontSize={'small'}/>}
                                        checkedIcon={<CheckBox fontSize={'small'}/>}
                                        style={{ marginRight: 8, marginLeft: 'auto' }}
                                        checked={selected}
                                    />
                                </React.Fragment>
                            )}
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
                    {/*<Grid container direction={'row'} spacing={2}>*/}
                    {/*    <Grid item xs={6}>*/}
                    {/*        <div className={classes.search}>*/}
                    {/*            <div className={classes.filterIcon}>*/}
                    {/*                <Filter/>*/}
                    {/*            </div>*/}
                    {/*            <Autocomplete*/}
                    {/*                {...defaultProps}*/}
                    {/*                disableOpenOnFocus*/}
                    {/*            <InputBase*/}
                    {/*                placeholder="Category…"*/}
                    {/*                classes={{*/}
                    {/*                    root: classes.inputRoot,*/}
                    {/*                    input: classes.inputInput,*/}
                    {/*                }}*/}
                    {/*                inputProps={{'aria-label': 'search'}}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={6}>*/}
                    {/*        <GridList cellHeight={'1.5rem'} className={classes.catList} cols={2}>*/}
                    {/*            <GridListTile cols={1}>*/}
                    {/*                <Chip*/}
                    {/*                    label={'cat1'}*/}
                    {/*                    // size={'small'}*/}
                    {/*                    onDelete={e => removeCat(e, 1)}*/}
                    {/*                    color={'secondary'}*/}
                    {/*                />*/}
                    {/*            </GridListTile>*/}
                    {/*            <GridListTile cols={1}>*/}
                    {/*                <Chip*/}
                    {/*                    label={'cat2'}*/}
                    {/*                    // size={'small'}*/}
                    {/*                    onDelete={e => removeCat(e, 1)}*/}
                    {/*                    color={'secondary'}*/}
                    {/*                />*/}
                    {/*            </GridListTile>*/}
                    {/*            <GridListTile cols={2}>*/}
                    {/*                <Chip*/}
                    {/*                    label={'Homework'}*/}
                    {/*                    // size={'small'}*/}
                    {/*                    onDelete={e => removeCat(e, 1)}*/}
                    {/*                    color={'secondary'}*/}
                    {/*                />*/}
                    {/*            </GridListTile>*/}
                    {/*        </GridList>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
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
