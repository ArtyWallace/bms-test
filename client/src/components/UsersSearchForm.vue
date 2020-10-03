<template>
    <div class="row">
        <form class="col s6 offset-s3">
                <div class="input-field col s12">
                    <i class="material-icons prefix">account_circle</i>
                    <input  id="name" type="text" v-model.trim="$v.name.$model">
                    <label for="name">Имя</label>
                    <small class="helper-text valid" v-if="!$v.name.alpha">Это поле может содержать только буквы!</small>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">phone</i>
                    <input id="tel" type="text" v-model.trim="$v.phone.$model">
                    <label for="tel">Номер телефона</label>
                    <small class="helper-text valid" v-if="!$v.phone.numeric">Это поле может содержать только цифры!</small>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <input id="email" type="text" v-model.trim="$v.email.$model">
                    <label for="email">Email</label>
                    <small class="helper-text valid" v-if="!$v.email.email">Введите корректный Email!</small>
                </div>
                <div class="input-field col s12">
                    <i class="material-icons prefix">date_range</i>
                    <input id="birth" type="text" v-model.trim="$v.birth.$model">
                    <label for="birth">Дата рождения (в формате ДД-ММ-ГГГГ)</label>
                    <small class="helper-text valid" v-if="!$v.birth.validDate">Дата должна быть в формате ДД-ММ-ГГГГ!</small>
                </div>
            <button class="btn btn-primary" @click.prevent="getUsers">Поиск</button>
        </form>
    </div>
</template>

<script>
import { email, numeric } from 'vuelidate/lib/validators';

export default {
    name: 'UserSearchForm',
    data: () => ({
        name: '',
        phone: '',
        email: '',
        birth: ''
    }),
    mounted() {
        window.M.updateTextFields();
    },
    methods: {
        async getUsers() {
            const date = this.birth.split('-').reverse();
            const birthDate = new Date(+date[0], +date[1] - 1, +date[2]);

            const formData = {
                name: this.name ? this.name : null,
                phone: this.phone ? this.phone : null,
                email: this.email ? this.email : null,
                birth: this.birth ? birthDate.getTime() : null
            };

            // Очень не уверен, что это хороший способ проверить, что
            // хотя бы один input заполнен..
            const inputs = Object.keys(formData).filter(i => formData[i]);

            if (!inputs.length) {
                window.M.toast({ html: 'Хотя бы одно поле должно быть заполнено!' })
                return;
            }
            
            if (this.$v.$invalid) {
                window.M.toast({ html: 'Что-то пошло не так!' })
                return;
            }

            try {
                await this.$store.dispatch('getUsers', formData);
                this.$emit('getUsers');
            } catch (err) {
                console.log(err);
            }            
        }
    },
    validations: {
        name: { alpha: val => /^([а-яё]+|[a-z]+|)$/i.test(val) },
        phone: { numeric },
        email: { email },
        birth: { validDate: val => /^$|(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(val) }
    }
}
</script>