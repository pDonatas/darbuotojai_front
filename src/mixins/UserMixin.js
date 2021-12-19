import constants from "../constants";
export default {
    methods: {
        async getUsers() {
            await this.$axios.get(constants.API_URL + '/user').then(
                response => {
                    this.users = response.data;
                })
        },
    }
}