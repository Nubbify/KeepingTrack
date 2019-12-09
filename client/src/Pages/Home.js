import React, {useEffect} from 'react';
import Navbar from "../Containers/Navbar";

import clsx from 'clsx';
import {fade, makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainDrawer from "../Containers/MainDrawer";
import NoteList from "../Containers/NoteList";
import Note from "../Components/Note/Note";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {deleteNote, openNote, saveNote} from "../actions/noteActions";
import store from "../store";
import {loadUser} from "../actions/authActions";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        height: window.innerHeight + 'px',
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
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
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    mainContainer: {
        height: (window.innerHeight - 88) + 'px',
    },
    noteListContainer: {
        height: '100%',
        padding: '0px',
        margin: '0px',
    }
}));

const Home = ({saveNote, openNote, deleteNote, note, open, loading}) => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [loading]);

    const classes = useStyles();

    const [openD, setOpenD] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [mode, setMode] = React.useState('');

    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleDrawerOpen = () => {
        setOpenD(true);
    };

    const handleDrawerClose = () => {
        setOpenD(false);
    };

    const openNoteH = (e, id) => {
        e.preventDefault();
        openNote(id);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Navbar openD={openD} handleDrawerOpen={handleDrawerOpen}/>
            <MainDrawer open={openD} handleDrawerClose={handleDrawerClose}/>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: openD,
                })}
            >
                <div className={classes.drawerHeader}/>
                <Grid container spacing={2} className={classes.mainContainer}>
                    <Grid item xs={5} md={4} className={classes.noteListContainer}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={search}
                                onChange={handleSearch}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                        <NoteList openNote={openNoteH} search={search}/>
                    </Grid>
                    <Grid item xs={7} md={8}>
                        {note === null ? '' : <Note/>}
                    </Grid>
                </Grid>
            </main>
            {open ? '' :
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={e => openNoteH(e, null)}
                >
                    <AddIcon/>
                </Fab>
            }
        </div>
    );
};

Home.propTypes = {
    saveNote: PropTypes.func.isRequired,
    openNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    open: state.notes.open,
    note: state.notes.note,
    loading: state.auth.loading,
});

export default connect(mapStateToProps, {saveNote, openNote, deleteNote})(Home);