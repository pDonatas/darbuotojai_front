<template>
<div>
  <b-card bg-variant="light">
    <div class="form-group">
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th> User </th>
          <th> Bookmarked post </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ bookmark.id }}</td>
          <td>{{ bookmark.user_id }}</td>
          <td>{{ bookmark.post }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-card>
</div>
</template>

<script>
export default {
  name: "SpecificUsersPostsBookmark",
  data() {
    return {
      bookmark : {
        id:null,
        user_id:null,
        post:null
      },
    }
  },
  props: {
    data: {},
    view: false,
    create: false
  },
  watch: {
    data() {
      this.bookmark = this.data;
    }
  },
}
</script>

<style scoped>

</style>