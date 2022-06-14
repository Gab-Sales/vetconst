<template>
    <div class="p-5">
        <div class="my-3" style="text-align: right;">
            <b-button variant="primary" v-on:click="cadastrar(null)">Nova consulta {{ getUser }}</b-button>
        </div>
        <b-table responsive striped hover :items="items" :fields="fields" :per-page="perPage"
            :current-page="currentPage">
            <template #cell(edit)="data">
                <b-button variant="primary" size="sm" v-on:click="cadastrar(data.item)">Editar</b-button>
            </template>
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"
            align="right">
        </b-pagination>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            fields: [
                {
                    key: 'id',
                    label: 'Código',
                    sortable: true
                },
                {
                    key: 'veterinario',
                    label: 'Veterinário',
                    sortable: true
                },
                {
                    key: 'paciente',
                    label: 'Paciente',
                    sortable: true,
                },
                {
                    key: "edit",
                    label: "Visualizar / Editar"
                }
            ],
            items: [
                { id: 1, paciente: 'Dickerson', veterinario: 'Macdonald' },
                { id: 2, paciente: 'Larsen', veterinario: 'Shaw' },
                { id: 3, paciente: 'Geneva', veterinario: 'Wilson' },
                { id: 4, paciente: 'Jami', veterinario: 'Carney' },
                { id: 5, paciente: 'Dickerson', veterinario: 'Macdonald' },
                { id: 6, paciente: 'Larsen', veterinario: 'Shaw' },
                { id: 7, paciente: 'Geneva', veterinario: 'Wilson' },
                { id: 8, paciente: 'Jami', veterinario: 'Carney' },
                { id: 9, paciente: 'Dickerson', veterinario: 'Macdonald' },
                { id: 10, paciente: 'Larsen', veterinario: 'Shaw' },
                { id: 11, paciente: 'Geneva', veterinario: 'Wilson' },
                { id: 12, paciente: 'Jami', veterinario: 'Carney' },
                { id: 13, paciente: 'Dickerson', veterinario: 'Macdonald' },
                { id: 14, paciente: 'Larsen', veterinario: 'Shaw' },
                { id: 15, paciente: 'Geneva', veterinario: 'Wilson' },
                { id: 16, paciente: 'Jami', veterinario: 'Carney' }
            ],
            itemsFim: null,
            perPage: 10,
            currentPage: 1,
        }
    },
    async mounted() {
        this.itemsFim = await this.getConsultas()
        console.warn(this.itemsFim)
    },
    computed: {
        rows() {
            return this.items.length
        },
        ...mapGetters(['getUser'])
    },
    methods: {
        async getConsultas() {
            const data = await axios.get(process.env.VUE_APP_BASE_URL + 'api/agendamentos/meus-agendamentos', {
                headers: {
                    Authorization: `Bearer ${this.getUser.token}`
                }
            }
            )
            console.log(data)
            return true
        },
        cadastrar(consulta) {
            const id = consulta !== null ? consulta.id : 0
            this.$router.push({ name: 'Cadastrar', params: { id: id, test: consulta } })
        }
    }
}
</script>