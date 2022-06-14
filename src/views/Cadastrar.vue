<template>
  <div class="d-flex justify-content-center containerCustom">
    <div class="align-self-center border customCard">
      <h5>{{ title }}</h5>
      <hr />
      <b-form-group id="input-group-1" label="Veterinario" label-for="input-1">
        <b-form-select v-model="form.veterinario" :options="veterinarios" style="text-align:center ;"></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-2" label="Data do agendamento" label-for="input-2">
        <b-form-datepicker id="example-datepicker" placeholder="Seleciona uma data" v-model="form.dataDoAgendamento"
          class="mb-2" required></b-form-datepicker>
      </b-form-group>

      <div class="mt-3">
        <b-button v-on:click="agendarConsulta" class="w-100" variant="primary" block>{{ buttonMsg }}
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Cadastrar',
  computed: {
    ...mapGetters(['getUser'])
  },
  data() {
    return {
      form: {
        dataDoAgendamento: '',
        veterinario: ''
      },
      veterinarios: [],
      title: '',
      buttonMsg: ''
    }
  },
  async mounted() {
    if (this.$route.params.id > 0) {
      await this.getConsulta()
      this.title = "Atualizar agendamento"
      this.buttonMsg = "Atualizar"
    } else {
      this.title = "Realizar agendamento"
      this.buttonMsg = "Cadastrar"
    }
    await this.getVet()
  },
  methods: {
    async getVet() {
      const data = await axios.get(process.env.VUE_APP_BASE_URL + 'api/veterinarios', {
        headers: {
          Authorization: `Bearer ${this.getUser.token}`
        }
      })
      if (data.status == 200) {
        this.veterinarios = []
        for (let i in data.data) {
          this.veterinarios.push({
            value: data.data[i].id,
            text: data.data[i].nome
          })
        }
      }
    },
    async agendarConsulta() {
      if (this.$route.params.id > 0) {
        const data = await axios.put(process.env.VUE_APP_BASE_URL + 'api/agendamentos/' + this.$route.params.id, { dataDoAgendamento: this.form.dataDoAgendamento }, {
          headers: {
            Authorization: `Bearer ${this.getUser.token}`
          }
        })
        if (data.status == 200) {
          this.$bvToast.toast(`Seu agendamento foi atualizado com sucesso!`, {
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
      } else {
        const data = await axios.post(process.env.VUE_APP_BASE_URL + 'api/agendamentos', this.form, {
          headers: {
            Authorization: `Bearer ${this.getUser.token}`
          }
        })
        if (data.status == 201) {
          this.$bvToast.toast(`Seu agendamento foi efetuado com sucesso!`, {
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
    },
    async getConsulta() {
      const data = await axios.get(process.env.VUE_APP_BASE_URL + 'api/agendamentos/' + this.$route.params.id, {
        headers: {
          Authorization: `Bearer ${this.getUser.token}`
        }
      })
      if (data.status == 200) {
        this.form.veterinario = data.data.veterinario.id
        this.form.dataDoAgendamento = data.data.dataDoAgendamento
      }
    },
  },
  props: ['test', 'id']
}
</script>
<style>
.containerCustom {
  height: 80vh;
  width: 100%;
}

.customCard {
  min-width: 30%;
}
</style>