import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Checkbox, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
import {deleteCategory, filterCatsH} from "../actions/categoryActions";
import {DeleteOutlined} from "@material-ui/icons";

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
    catSectionTitle: {
        marginLeft: '10px',
    },
    catChip: {
        borderRadius: '20px',
        padding: 0,
        margin: 0
    },
    catList: {}
}));

const MainDrawer = ({open, handleDrawerClose, categories, filterCats, filterCatsH, deleteCategory}) => {
    const classes = useStyles();

    const [filters, updateFilters] = React.useState([]);

    const handleToggle = value => () => {
        const currentIndex = filterCats.indexOf(value);
        const newFilters = [...filterCats];

        if (currentIndex === -1) {
            newFilters.push(value);
            filterCatsH(value, 1);
        } else {
            newFilters.splice(currentIndex, 1);
            filterCatsH(value, -1);
        }

        updateFilters(newFilters);
    };

    const handleDelete = (e, catID) => {
        e.preventDefault();
        deleteCategory(catID);
    };

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
            <Typography className={classes.catSectionTitle}>
                Categories
            </Typography>
            <List
                component={'nav'}
                aria-labelledby={'nested-list-subheader'}
                className={classes.catList}
            >
                {categories.map(cat => (
                    <ListItem key={cat.id} role={undefined} button onClick={handleToggle(cat.id)}>
                        <ListItemIcon>
                            <Checkbox
                                edge={'start'}
                                checked={filters.indexOf(cat.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': cat.id}}
                            />
                        </ListItemIcon>
                        <ListItemText id={cat.id} primary={cat.name}/>
                        <ListItemSecondaryAction>
                            <IconButton edge={'end'} aria-label={'delete'} onClick={e => handleDelete(e, cat)}>
                                <DeleteOutlined/>
                            </IconButton>
                        </ListItemSecondaryAction>
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

const mapStateToProps = state => ({
    categories: state.cat.categories,
    filterCats: state.cat.filterCats,
});

export default connect(mapStateToProps, {filterCatsH, deleteCategory})(MainDrawer);