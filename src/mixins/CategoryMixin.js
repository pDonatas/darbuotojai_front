import constants from "../constants";
import axios from 'axios';

export default {
    methods: {
        async getCategoryData(slug) {
            return await axios.get(constants.API_URL + '/categories/' + slug)
                .then(response => response.data.category);
        }
    }
}
