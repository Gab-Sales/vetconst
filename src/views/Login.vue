<template>
    <div class="d-flex justify-content-center cont">
        <div class="align-self-center border">
            <h5>VetConst</h5>
            <hr />
            <b-form-group id="input-group-1" label="ID" label-for="input-1">
                <b-form-input id="input-1" v-model="form.login" placeholder="ID" required>
                </b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Senha" label-for="input-2">
                <b-form-input id="input-2" type="password" v-model="form.senha" placeholder="Password" required>
                </b-form-input>
            </b-form-group>

            <div class="mt-3">
                <b-button v-on:click="login" class="w-100" variant="primary" block :disabled="disableButton">Entrar
                </b-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Home',
    data() {
        return {
            form: {
                login: '',
                senha: ''
            }
        }
    },
    computed: {
        disableButton() {
            return this.form.login.length >= 3 && this.form.senha.length >= 3 ? false : true
        }
    },
    methods: {
        ...mapActions(['doLogin']),
        async login() {
            const ret = await this.doLogin(this.form)
            console.log(ret)
            if (ret == 200) {
                this.$router.push({ path: '/home' })
            }
            else {
                this.$bvToast.toast(`Verifique suas credencias e tente novamente.`, {
                    title: 'Ops!',
                    variant: 'danger',
                    autoHideDelay: 3000,
                    appendToast: false
                })
            }
        }
    }
}
</script>
<style>
.cont {
    height: 100vh;
    width: 100%;
    background-color: #2c3e50;
}

.border {
    padding: 2%;
    background: whitesmoke;
    border-radius: 10px;
    border: none !important;
}
</style>