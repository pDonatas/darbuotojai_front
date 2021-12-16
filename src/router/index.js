import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue';
import store from '../store'
import Post from "../views/Post";
import Create from "../views/posts/Create";
import OrderCreate from "../views/orders/OrderCreate";
import ShowOrders from "../views/orders/ShowOrders";
import CategoryCreate from "../views/categories/CategoryCreate";
import ShowCategories from "../views/categories/ShowCategories";
import View from "../views/posts/View";
import Edit from "../views/posts/Edit";
import Delete from "../views/posts/Delete";
import EditOrder from "../views/orders/EditOrder";
import EditCategory from "../views/categories/EditCategory";
import ShowSpecific from "../views/orders/ShowSpecific";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Post
    },
    {
        path: '/orders/create',
        name: 'OrderCreate',
        component: OrderCreate
    },
    {
        path: '/orders',
        name: 'Orders',
        component: ShowOrders
    },
    {
        path: '/order',
        name: 'ShowSpecific',
        component: ShowSpecific
    },
    {
        path: '/orders/edit/:id',
        name: 'EditOrder',
        component: EditOrder
    },
    {
        path: '/categories',
        name: 'Show',
        component: ShowCategories
    },
    {
        path: '/categories/create',
        name: 'CategoryCreate',
        component: CategoryCreate
    },
    {
        path: '/categories/edit/:id',
        name: 'EditCategory',
        component: EditCategory
    },
    {
        path: '/logout',
        name: 'Logout',
        beforeEnter(to, from, next){
            localStorage.clear();
            store.commit('setUser', {
                username: null,
                email: null,
                token: null
            });
            next({
                path: 'login',
                replace: true
            })
        }
    },
    {
        path: '/posts/create',
        name: 'Create posts',
        component: Create
    },
    {
        path: '/posts/:slug/edit',
        name: 'Edit posts',
        component: Edit
    },
    {
        path: '/posts/:slug/delete',
        name: 'Delete posts',
        component: Delete
    },
    {
        path: '/posts/:slug',
        name: 'View posts',
        component: View
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Register') {
        if (localStorage.getItem('token') == null) {
            return next({ name: 'Login' });
        }
    }

    next();
})

export default router
