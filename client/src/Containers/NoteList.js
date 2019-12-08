import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteNote, fetchNotes} from "../actions/noteActions";
import {makeStyles} from '@material-ui/core/styles';
import {
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    LinearProgress,
    List,
    Typography
} from "@material-ui/core";
import {DeleteOutlined} from '@material-ui/icons'

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
    card: {
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
        borderRadius: '0',
        paddingBottom: '2px'
    },
    title: {
        textOverflow: 'ellipsis',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    body: {

    },
    actions: {
        padding: '1px',
    },
    delete: {
        marginLeft: 'auto',
        padding: '8px',
        // fontSize: '1.0rem'
    },
    deleteIcon: {
        color: 'brown'
    }
}));

const NoteList = ({notes, fetchNotes, deleteNote, openNote}) => {
    const classes = useStyles();
    useEffect(() => {
        fetchNotes()
    }, []);

    const deleteNoteH = (e, id) => {
        e.preventDefault();
        deleteNote(id);
    };

    return (
        <List className={classes.root}>
            {notes.map(note =>
                <Card key={note.id} className={classes.card}>
                    <CardActionArea onClick={e => openNote(e, note.id)}>
                        <CardContent>
                            <Typography variant={'h5'} className={classes.title}>
                                {note.title}
                            </Typography>
                            <Typography variant={'body1'} color={'textSecondary'} className={classes.body}>
                                {note.data}
                            </Typography>
                        </ CardContent>
                    </CardActionArea>
                    <CardActions className={classes.actions}>
                        <IconButton aria-label="actions" className={classes.delete} onClick={e => deleteNoteH(e, note.id)}>
                            <DeleteOutlined className={classes.deleteIcon}/>
                        </IconButton>
                    </CardActions>
                    <LinearProgress variant="determinate" value={50} color={'secondary'}/>
                    <Divider component="li"/>
                </ Card>
            )}
        </List>
    );
};


NoteList.propTypes = {
    fetchNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    openNote: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    notes: state.notes.notes
});

export default connect(mapStateToProps, {fetchNotes, deleteNote})(NoteList);