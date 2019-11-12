import React, {Fragment, useState, useEffect} from 'react';
import Navbar from "../Containers/Navbar";
import {connect} from 'react-redux';

const Home = () => {
    return (
        <Fragment>
            <Navbar />

        </Fragment>
    );
};

const mapStateToProps = state => {
};

export default connect(
    mapStateToProps,
)(Home);