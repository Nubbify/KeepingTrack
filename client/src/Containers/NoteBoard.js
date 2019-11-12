import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNotes } from "../actions/noteActions";
import Note from "../Components/Note/Note";

class NoteBoard extends Component {
    componentDidMount() {
        this.props.fetchNotes();
    }

    render() {
        const notes = this.props.notes.map(note => (
            <Note key={note.id} note={note} />
        ));
        return (
            <div>
                <h1>Notes</h1>
                {notes}
            </div>
        );
    }
}

NoteBoard.propTypes = {
    fetchNotes: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    notes: state.notes.notes
});

export default connect(mapStateToProps, { fetchNotes })(NoteBoard);