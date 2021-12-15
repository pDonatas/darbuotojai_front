import constants from "../constants";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    methods: {
        async getCategoryData(id) {
            return await axios.get(constants.API_URL + '/categories/' + id)
                .then(response => response.data).catch(
                    (error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.response.data.errors,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        }).then(() => {
                            this.$router.back();
                        })
                    }
                );
        }
    }
}
