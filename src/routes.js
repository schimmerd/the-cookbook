import Search from '@material-ui/icons/Search';
import CloudUpload from '@material-ui/icons/CloudUpload'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOpenIcon from '@material-ui/icons/LockOpen';
// core components/view 
import SearchPage from 'views/Search/Search.js'
import UploadPage from 'views/Upload/ImageUpload.js'
import ProfilePage from 'views/Profile/Profile'
import Authentication from 'views/Authentication/Authentication'
import auth from 'middleware/auth'

const recipeRoutes = [
    {
        path: "/search",
        name: "Search",
        icon: Search,
        component: SearchPage,
        layout: "/recipes"
    },
    {
        path: "/upload",
        name: "Upload",
        icon: CloudUpload,
        component: UploadPage,
        layout: "/recipes"
    }
]

if (auth.isAuthenticated()) {
    recipeRoutes.push({
        path: "/profile",
        name: "Profile",
        icon: AccountCircle,
        component: ProfilePage,
        layout: "/recipes"
    })
} else {
    recipeRoutes.push({
        path: "/authentication",
        name: "Authentication",
        icon: LockOpenIcon,
        component: Authentication,
        layout: "/recipes"
    })
}

export default recipeRoutes