import  React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar"
import "perfect-scrollbar/css/perfect-scrollbar.css";
// material-ui/core components 
import { makeStyles } from "@material-ui/core/styles"
// core components 
import Navbar from "components/Navbars/Navbar.js"
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import MenuBookIcon from '@material-ui/icons/MenuBook';
import routes from "routes.js"

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";

let ps

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/recipes") {
                return (
                    <Route 
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                )
            }
            return null
        })}
        <Redirect from="/recipes" to="/recipes/search" />
    </Switch>
)

const useStyles = makeStyles(styles)

export default function RecipeWorld({ ...rest }) {
    // styles
    const classes = useStyles()
    // initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef()
    // states and functions
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false)
        }
    }
    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            })
            document.body.style.overflow = "hidden"
        }
        window.addEventListener("resize", resizeFunction)
        // specify how to clean up after this effect
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy()
            }
            window.removeEventListener("resize", resizeFunction)
        }
    }, [mainPanel])
    return (
        <div className={classes.wrapper}>
            <Sidebar 
                routes={routes}
                logoText={"The Cookbook"}
                image={bgImage}
                logo={<MenuBookIcon />}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={"blue"}
                { ...rest }
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar 
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    { ...rest }
                />
                <div className={classes.content}>
                    <div className={classes.container}>
                        {switchRoutes}
                    </div>
                </div>
                <Footer />
                
            </div>
        </div>
    )
}