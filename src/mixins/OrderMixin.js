import constants from "../constants";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    methods: {
        async getOrders(){
            return await axios.get(constants.API_URL + '/orders').then(
                response => {
                    this.orders = response.data.orders;
                    this.$store.commit('setOrders', response.data.orders);
                })
        },
        async getOrderData(id) {
            return await axios.get(constants.API_URL + '/orders/' + id)
                .then(response => {
                    this.order = response.data;
                    Swal.fire({
                        title: 'Success!',
                        text: "You have successfully got specific order",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                })
                .catch(function () {
                    Swal.fire({
                        title: 'Error!',
                        text: "Order doesn't exist",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                })
        },
        async getPostOrderData(id,slug) {
            return await axios.get(constants.API_URL + '/posts/' + slug + '/orders/' + id)
                .then(response => {
                    this.order = response.data;
                    Swal.fire({
                        title: 'Success!',
                        text: "You have successfully got specific order",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                })
                .catch(function () {
                    Swal.fire({
                        title: 'Error!',
                        text: "Order doesn't exist",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                })
        },
        async getPostOrders(slug) {
            return await axios.get(constants.API_URL + '/posts/' + slug + '/orders').then(
                response => {
                    this.orders = response.data;
                    Swal.fire({
                            title: 'Success!',
                            text: "You have successfully got orders",
                            icon: 'success',
                            confirmButtonText: 'Ok'
                    })
                }).catch(function () {
                Swal.fire({
                    title: 'Error!',
                    text: "Orders don't exist",
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            })

        }
    }
}