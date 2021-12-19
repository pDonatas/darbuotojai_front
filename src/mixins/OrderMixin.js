import constants from "../constants";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    methods: {
        async getOrderData(id) {
            return await axios.get(constants.API_URL + '/orders/' + id)
                .then(response => response.data.order)
                .catch(function () {
                    Swal.fire({
                        title: 'Error!',
                        text: "Order doesn't exist",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                })
        },
        async getPostOrderData(id,slug) {
            return await axios.get(constants.API_URL + '/posts/' + slug + '/orders/' + id)
                .then(response => response.data.order)
                .catch(function () {
                    Swal.fire({
                        title: 'Error!',
                        text: "Order doesn't exist",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                })
        },
    }
}