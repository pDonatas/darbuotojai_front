import constants from "../constants";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    methods: {
        async getPostVotes(post) {
            return await axios.get(constants.API_URL + '/categories/' + post.category + '/posts/' + post.slug + '/votes')
                .then(response => response.data.votes).catch(
                    (error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.response.data.errors,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
                );
        },

        async deleteVote(vote, post) {
            return await axios.delete(constants.API_URL + '/categories/' + post.category + '/posts/' + post.slug + '/votes/' + vote.id)
                .then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Vote has been removed successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        this.$router.go();
                    })
                }).catch(
                    (error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.response.data.error,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
                );
        },
        async editVote(vote, post) {
            return await axios.patch(constants.API_URL + '/categories/' + post.category + '/posts/' + post.slug + '/votes/' + vote.id, {
                "vote": vote.vote,
                "comment": vote.comment,
                "user": vote.user.id,
                "post": post.id
            })
                .then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Vote has been edited successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        this.$router.go();
                    })
                }).catch(
                    (error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.response.data.error,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
                );
        }
    }
}
