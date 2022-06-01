<template>
    <div class="p-5">
        <div class="my-3" style="text-align: right;">
            <b-button variant="primary" v-on:click="cadastrar(null)">Nova consulta</b-button>
        </div>
        <b-table responsive striped hover :items="items" :fields="fields" :per-page="perPage"
            :current-page="currentPage">
            <template #cell(edit)="data">
             <b-button variant="primary" size="sm" v-on:click="cadastrar(data.item)">Editassr</b-button>
            </template>
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"
            align="right">
        </b-pagination>
    </div>
</template>
<script>
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
                { id:2, paciente: 'Larsen', veterinario: 'Shaw' },
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
            perPage: 10,
            currentPage: 1,
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    methods:{
        cadastrar(consulta){
            const id = consulta !== null ? consulta.id : 0
            this.$router.push({name: 'Cadastrar', params: {id:id, test: consulta }}) 
        }
    }
}
</script>