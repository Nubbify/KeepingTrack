import React from 'react';
import PropTypes from "prop-types";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Checkbox} from "@material-ui/core";
import CategoryIcon from '@material-ui/icons/Category';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

const MainDrawer = ({open, handleDrawerClose}) => {
    const classes = useStyles();

    const categories = ['homework', 'chores', 'projects', 'other'];

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <Typography>
                Categories
            </Typography>
            <List>
                {categories.map((cat, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon><CategoryIcon/></ListItemIcon>
                        <ListItemText primary={cat}/>
                        <Checkbox/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Drawer>
    );
};

MainDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
};

export default MainDrawer;