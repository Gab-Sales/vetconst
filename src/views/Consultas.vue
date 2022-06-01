<template>
    <div class="p-5">
        <div class="my-3" style="text-align: right;">
            <b-button variant="primary">Nova consulta</b-button>
        </div>
        <b-table responsive striped hover :items="items" :fields="fields" :per-page="perPage"
            :current-page="currentPage">
            <template #cell(edit)="data">
                <!-- {{ data.item }} -->
                <b-icon icon="question-circle"></b-icon>
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
            // Note 'isActive' is left out and will not appear in the rendered table
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
                    // Variant applies to the whole column, including the header and footer
                },
                {
                    key: "edit",
                    label: "Visualizar / Editar"
                }
            ],
            items: [
                { id: 40, paciente: 'Dickerson', veterinario: 'Macdonald' },
                { id: 21, paciente: 'Larsen', veterinario: 'Shaw' },
                { id: 89, paciente: 'Geneva', veterinario: 'Wilson' },
                { id: 38, paciente: 'Jami', veterinario: 'Carney' }
            ],
            perPage: 4,
            currentPage: 1,
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    }
}
</script>