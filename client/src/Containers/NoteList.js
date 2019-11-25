import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchNotes} from "../actions/noteActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

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

const NoteList = ({notes, fetchNotes}) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {notes.map(note =>
                <Fragment>
                    <ListItem alignItems="flex-start">
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
    notes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    notes: state.notes.notes
});

export default connect(mapStateToProps, {fetchNotes})(NoteList);