<template>
    <div class="row">
        <div class="col s12 m3">
            <div class="card">
                <div class="card-image">
                    <img :src="user.img">
                </div>
                <div class="card-content">
                    <strong style="font-size: 20px">{{ user.name }}</strong>
                    <p><br></p>
                    <p>Телефон: +{{ user.phone }}</p>
                    <p>Email: {{ user.email }}</p>
                    <p>День рождения: {{ user.birth | date }}</p>
                </div>
                <div class="card-action">
                    <router-link to="/">На главную</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User',
    data: () => ({
        user: {}
    }),
    async mounted() {
        const id = this.$route.params.id;
        await this.$store.dispatch('getUserById', id);
        this.user = this.$store.getters.user;
    }
}
</script>