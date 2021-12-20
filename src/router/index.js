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
import CategoryPostView from "../views/categories/posts/View";
import CategoryPostCreate from "../views/categories/posts/Create";
import CategoryPostEdit from "../views/categories/posts/Edit";
import CategoryPostDelete from "../views/categories/posts/Delete";
import CategoryPostIndex from "../views/categories/posts/Index";
import PostOrderShowAll from "../views/posts/orders/PostOrderShowAll";
import PostOrderEdit from "../views/posts/orders/PostOrderEdit";
import PostOrderCreate from "../views/posts/orders/PostOrderCreate";
import UsersPostsBookmarksShowAll from "../views/bookmarks/UsersPostsBookmarksShowAll";
import UsersPostsBookmarkEdit from "../views/bookmarks/UsersPostsBookmarkEdit";
import UsersPostsBookmarkShowSpecific from "../views/bookmarks/UsersPostsBookmarkShowSpecific";
import UsersPostsBookmarkCreate from "../views/bookmarks/UsersPostsBookmarkCreate";
import PostOrderAll from "../views/posts/orders/PostOrderAll";
import Specific from "../views/orders/Specific";
import PostOrderSpecific from "../views/posts/orders/PostOrderSpecific";
import UsersPostsBookmarksAll from "../views/bookmarks/UsersPostsBookmarksAll";
import UsersPostsBookmarkSpecific from "../views/bookmarks/UsersPostsBookmarkSpecific";
import AdminGetUsers from "../views/admin/AdminGetUsers";

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
        path: '/orders/:id/edit',
        name: 'EditOrder',
        component: EditOrder
    },
    {
        path: '/posts/orders',
        name: 'PostOrderShowAll',
        component: PostOrderShowAll
    },
    {
        path: '/posts/:slug/orders',
        name: 'PostOrderAll',
        component: PostOrderAll
    },
    {
        path: '/orders/:id',
        name: 'Specific',
        component: Specific
    },
    {
        path: '/posts/:slug/orders/:id/edit',
        name: 'PostOrderEdit',
        component: PostOrderEdit
    },
    {
        path: '/posts/:slug/orders/create',
        name: 'PostOrderCreate',
        component: PostOrderCreate
    },
    {
        path: '/posts/:slug/orders/:id',
        name: 'PostOrderSpecific',
        component: PostOrderSpecific
    },
    {
        path: '/users/posts/bookmarks',
        name: 'UsersPostsBookmarksShowAll',
        component: UsersPostsBookmarksShowAll
    },
    {
        path: '/users/:user_id/posts/:slug/bookmarks',
        name: 'UsersPostsBookmarksAll',
        component: UsersPostsBookmarksAll
    },
    {
        path: '/users/posts/bookmarks/create',
        name: 'UsersPostsBookmarkCreate',
        component: UsersPostsBookmarkCreate
    },
    {
        path: '/users/:user_id/posts/:slug/bookmarks/:id/edit',
        name: 'UsersPostsBookmarkEdit',
        component: UsersPostsBookmarkEdit
    },
    {
        path: '/users/:user_id/posts/:slug/bookmarks/:id',
        name: 'UsersPostsBookmarkSpecific',
        component: UsersPostsBookmarkSpecific
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
    },
    {
        path: '/categories/:category/posts',
        name: 'Posts by category',
        component: CategoryPostIndex
    },
    {
        path: '/categories/:category/posts/create',
        name: 'Create category posts',
        component: CategoryPostCreate
    },
    {
        path: '/categories/:category/posts/:slug/edit',
        name: 'Edit posts by category',
        component: CategoryPostEdit
    },
    {
        path: '/categories/:category/posts/:slug/delete',
        name: 'Delete posts by category',
        component: CategoryPostDelete
    },
    {
        path: '/categories/:category/posts/:slug',
        name: 'View posts by category',
        component: CategoryPostView
    },
    {
        path: '/admin',
        name: 'AdminGetUsers',
        component: AdminGetUsers
    },

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

    if (to.name !== 'Home' && to.name !== 'Login' && to.name !== 'Register') {
        if (store.state.user.type === 0) {
            return next({name: 'Home'});
        }
    }

    next();
})

export default router
