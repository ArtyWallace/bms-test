<template>
  <div class="home">
    <UsersSearchForm @getUsers="getUsers"/>
    <UsersTable :users="users"/>
  </div>
</template>

<script>
import UsersSearchForm from '@/components/UsersSearchForm.vue';
import UsersTable from '@/components/UsersTable.vue';

export default {
  name: 'Home',
  components: {
    UsersSearchForm,
    UsersTable
  },
  data: () => ({
    users: []
  }),
  methods: {
    getUsers() {
      this.users = this.$store.getters.users;
    }
  }
}
</script>
