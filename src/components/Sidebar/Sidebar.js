/*eslint-disable*/
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import SecondNavbar from "../Navbars/SearchNavbar.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import auth from "middleware/auth.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
    const classes = useStyles()
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true: false
    }
    const { color, image, logo, logoText, routes } = props;
    let links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                let activePro = " "
                let listItemClasses
                listItemClasses = classnames({
                    [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                })
                {/* const whiteFontClasses = classnames({
                    [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
                }) */}
                return (
                    <NavLink
                        to={prop.layout + prop.path}
                        className={activePro + classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem button className={classes.itemLink + listItemClasses}>
                            {typeof prop.icon === "string" ? (
                                <Icon
                                    className={classes.itemIcon}
                                >
                                    {prop.icon}
                                </Icon>

                            ) : (
                                <prop.icon
                                    className={classes.itemIcon}
                                />
                            )}
                            <ListItemText 
                                primary={prop.name}
                                className={classes.itemText}
                                disableTypography={true}
                            />
                        </ListItem>
                    </NavLink>
                )
            })}
        </List>
    )
    let brand = (
        <div className={classes.logo}>
            <a 
                href="#"
                className={classes.logoLink}
            >
             <div className={classes.logoImage}>
                {logo}
            </div>
            {logoText}
            </a>
        </div>
    )
    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={props.open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobil
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        { auth.isAuthenticated() ? 
                            <SecondNavbar />
                            : null
                        }
                        {links}
                    </div>
                    {image !== undefined ? (
                        <div 
                            className={classes.background}
                            style={{backgroundImage: "url(" + image + ")"}}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer 
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {links}
                    </div>
                    {image !== undefined ? (
                        <div className={classes.background}
                        style={{backgroundImage: "url(" + image + ")"}}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
        </div>
    )
}

Sidebar.propTypes = {
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    image: PropTypes.string,
    logo: PropTypes.object,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
  };
  