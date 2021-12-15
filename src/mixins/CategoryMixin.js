import constants from "../constants";
import axios from 'axios';

export default {
    methods: {
        async getCategoryData(id) {
            return await axios.get(constants.API_URL + '/categories/' + id)
                .then(response => response.data);
        }
    }
}
