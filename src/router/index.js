import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue';
import store from '../store'
import Post from "../views/Post";
import Create from "../views/posts/Create";
import constants from "../constants";
import Orders from "../views/Orders";
import Categories from "../views/Categories";

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
        path: '/orders',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories
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
