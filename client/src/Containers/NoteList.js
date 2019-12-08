import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchNotes} from "../actions/noteActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import store from "../store";
import {loadUser} from "../actions/authActions";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: (window.innerHeight - 88 - 35 - 8 - 2) + 'px',
        overflow: 'auto',
    },
    inline: {
        display: 'inline',
    },
}));

const NoteList = ({notes, fetchNotes, openNote}) => {
    const classes = useStyles();
    useEffect(() => {
        fetchNotes()
    }, []);

    return (
        <List className={classes.root}>
            {notes.map(note =>
                <Fragment key={note.id}>
                    <ListItem alignItems="flex-start" onClick={e => openNote(e, note.id)} >
                        <ListItemText
                            primary={note.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {note.goal_date}
                                    </Typography>
                                    {note.data}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider component="li"/>
                </ Fragment>
            )}
        </List>
    );
};


NoteList.propTypes = {
    fetchNotes: PropTypes.func.isRequired,
    openNote: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    notes: state.notes.notes
});

export default connect(mapStateToProps, {fetchNotes})(NoteList);