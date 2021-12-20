import constants from "../constants";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    methods: {
        async getUsersPostsBookmarkData(user_id, slug, id) {
            return await axios.get(constants.API_URL + '/users/' + user_id + '/posts/' + slug + '/bookmarks/' + id)
                .then(response => response.data).catch(
                    (error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: "Bookmark doesn't exist",
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
                );
        },
        async getUsersPostBookmarks(user_id, slug) {
            return await this.$axios.get(constants.API_URL + '/users/'+ user_id +'/posts/' + slug + '/bookmarks').then(
                response => {
                    this.bookmarks = response.data;
                    Swal.fire({
                        title: 'Success!',
                        text: "You have successfully got bookmarks",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }).catch(function () {
                    Swal.fire({
                    title: 'Error!',
                    text: "Bookmarks don't exist",
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })
        },
    }
}