<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand>
                <router-link to="/home" class="routerlink text-light">Meu Petzinho</router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <router-link to="/consultas" class="routerlink text-light">Consultas</router-link>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>{{ getUser.id }}</em>
                        </template>
                        <b-dropdown-item v-on:click="logout">Sair</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Consultas',
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        ...mapActions(['doLogout']),
        logout() {
            this.doLogout()
                .then(() => {
                    this.$router.push({ path: '/' })
                })
                .catch(error => {
                    alert(JSON.stringify(error))
                })
        }
    }
}
</script>
<style>
.bg {
    background: whitesmoke;
}

.custom-nav-bar {
    background: #2c3e50;
}
</style>