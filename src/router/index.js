
import { createWebHistory, createRouter } from "vue-router";

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const CateGory = () => import('../views/category/CateGory')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')


const history = createWebHistory();
const router = createRouter({
    history,
    routes: [
        {
            path:'',
            redirect:'/home'
        },
        {
            path:'/home',
            component:Home
        },
        {
            path:'/cart',
            component:Cart
        },
        {
            path:'/category',
            component:CateGory
        },
        {
            path:'/profile',
            component:Profile
        },
        {
            path:'/detail/:iid',
            component:Detail
        }
    ]
})

export default router;

