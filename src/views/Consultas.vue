<template>
    <div class="p-5">
        <div class="my-3" style="text-align: right;">
            <b-button variant="primary" v-on:click="cadastrar(null)">Nova consulta</b-button>
        </div>
        <b-table responsive striped hover :items="items" :fields="fields" :per-page="perPage"
            :current-page="currentPage">
            <template #cell(edit)="data">
                <b-button variant="primary" size="sm" v-on:click="cadastrar(data.item)">Editar</b-button>
                <b-button variant="danger" size="sm" class="ml-1" v-on:click="deleteAgenda(data.item)">Excluir
                </b-button>
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
                    key: 'nome',
                    label: 'Tutor',
                    sortable: true,
                },
                {
                    key: 'paciente',
                    label: 'Paciente',
                    sortable: true,
                },
                {
                    key: 'dataDoAgendamento',
                    label: 'Data do Agendamento',
                    sortable: true,
                },
                {
                    key: "edit",
                    label: "Editar / Excluir"
                }
            ],
            items: [],
            perPage: 10,
            currentPage: 1,
        }
    },
    async mounted() {
        await this.getConsultas()
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
            })
            if (data.status == 200) {
                this.items = []
                for (let i in data.data) {
                    this.items.push({
                        id: data.data[i].id,
                        dataDoAgendamento: data.data[i].dataDoAgendamento,
                        veterinario: data.data[i].veterinario.nome,
                        paciente: data.data[i].usuarioCliente.nomePet,
                        nome: data.data[i].usuarioCliente.nome
                    })
                }
            }
        },
        cadastrar(consulta) {
            const id = consulta !== null ? consulta.id : 0
            this.$router.push({ name: 'Cadastrar', params: { id: id, test: consulta } })
        },
        async deleteAgenda(consulta) {
            const data = await axios.delete(process.env.VUE_APP_BASE_URL + 'api/agendamentos/' + consulta.id, {
                headers: {
                    Authorization: `Bearer ${this.getUser.token}`
                }
            })
            if (data.status == 204) {
                this.items = this.items.filter(d => d.id !== consulta.id)
                this.$bvToast.toast(`Seu agendamento foi excluido com sucesso!`, {
                    title: 'Sucesso!',
                    variant: 'success',
                    autoHideDelay: 3000,
                    appendToast: false
                })
            } else {
                this.$bvToast.toast(`Verifique a validade do token`, {
                    title: 'Ops',
                    variant: 'danger',
                    autoHideDelay: 3000,
                    appendToast: false
                })
            }
        }
    }
}
</script>