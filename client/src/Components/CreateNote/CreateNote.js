import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { createNote } from "../../actions/noteActions";
import { connect } from 'react-redux';
import {Typography} from "@material-ui/core";

class CreateNote extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

CreateNote.propTypes = {};

export default connect(null, { createNote })(CreateNote);
