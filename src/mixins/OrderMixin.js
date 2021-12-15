import constants from "../constants";
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    methods: {
        async getOrderData(id) {
            return await axios.get(constants.API_URL + '/orders/' + id)
                .then(response => response.data.order);
        },
    }
}