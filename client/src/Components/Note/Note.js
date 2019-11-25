import React, {Component} from 'react';
import {Paper, Typography} from "@material-ui/core";

class Note extends Component {
    render() {
        return (
            <Paper>
                <Typography variant={'h4'}>{this.props.note.title}</Typography>
                <Typography variant={'body'}>{this.props.note.body}</Typography>
            </Paper>
        );
    }
}


export default Note;
