import constants from "../constants";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    methods: {
        async getPosts() {
            return await axios.get(constants.API_URL + '/posts')
                .then(response => response.data.posts);
        },

        async getPostData(slug) {
            return await axios.get(constants.API_URL + '/posts/' + slug)
                .then(response => response.data.post);
        },

        async removePost(slug) {
            axios.delete(constants.API_URL + '/posts/' + slug).then(
                (response) => {
                    Swal.fire({
                        title: 'Success!',
                        text: "You have successfully removed post",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });

                    this.$router.push('/');
                }
            ).catch(function (error) {
                let message = "";
                if (error.response.data.errors !== undefined) {
                    let fields = Object.values(error.response.data.errors);
                    fields.forEach(function (field) {
                        message += field += "\n";
                    })
                } else if (error.response.data.error !== undefined) {
                    message = error.response.data.error;
                }

                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            });
        },
    }
}
