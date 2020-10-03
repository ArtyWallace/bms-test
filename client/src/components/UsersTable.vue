<template>
    <table>
        <thead>
          <tr>
              <th>Имя</th>
              <th>Номер телефона</th>
              <th>Email</th>
              <th>Дата рождения</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user of users" :key="user._id">
              <td><router-link :to="user._id">{{ user.name }}</router-link></td>
              <td>+{{ user.phone }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.birth | date }}</td>
          </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'UsersTable',
    props: ['users']
}
</script>