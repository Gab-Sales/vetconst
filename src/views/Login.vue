<template>
    <div class="d-flex justify-content-center cont">
        <div class="align-self-center border">
            <h5>Meu Petzinho</h5>
            <hr />
            <div v-if="flagForm">
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
                    <b-button v-on:click="flagForm = !flagForm" class="w-100" variant="secondary" block>
                        Cadastrar
                    </b-button>
                </div>
            </div>
            <div v-else>
                <b-form-group id="input-group-1" label="ID" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.login" placeholder="ID" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Senha" label-for="input-2">
                    <b-form-input id="input-2" type="password" v-model="form.senha" placeholder="Password" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Nome" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.nome" placeholder="Nome" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Nome Pet" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.nomePet" placeholder="Nome Pet" required>
                    </b-form-input>
                </b-form-group>
                <div class="mt-3">
                    <b-button v-on:click="cadastrar" class="w-100" variant="primary" block :disabled="disableButton">
                        cadastrar
                    </b-button>
                    <b-button v-on:click="flagForm = !flagForm" class="w-100" variant="secondary" block>
                        Entrar
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
    name: 'Home',
    data() {
        return {
            form: {
                login: '',
                senha: '',
                nomePet: '',
                nome: ''
            },
            flagForm: true
        }
    },
    computed: {
        disableButton() {
            if (this.flagForm) {
                return this.form.login.length >= 3 && this.form.senha.length >= 3 ? false : true
            }
            return this.form.login.length >= 3 && this.form.senha.length >= 3 && this.form.nome.length >= 3 && this.form.nomePet.length >= 3 ? false : true
        }
    },
    methods: {
        ...mapActions(['doLogin']),
        async login() {
            const loginData = { login: this.form.login, senha: this.form.senha }
            const ret = await this.doLogin(loginData)
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
        },
        async cadastrar() {
            const ret = await axios.post(process.env.VUE_APP_BASE_URL + 'api/auth/signup', { ...this.form, cargos: ["CLIENTE", "ADMIN"] })
            if (ret.status == 201) {
                this.login()
            }
            else {
                this.$bvToast.toast(`Verifique a validade do token e tente novamente.`, {
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