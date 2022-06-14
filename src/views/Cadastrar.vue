<template>
  <div class="d-flex justify-content-center containerCustom">
    <div class="align-self-center border customCard">
      <h5>Realizar agendamento</h5>
      <hr />
      <b-form-group id="input-group-1" label="Veterinario" label-for="input-1">
        <b-form-input id="input-1" v-model="form.login" placeholder="Veterinario" required style="text-align: center;">
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Data do agendamento" label-for="input-2">
        <b-form-datepicker id="example-datepicker" placeholder="Seleciona uma data" v-model="form.senha" class="mb-2"
          required></b-form-datepicker>
      </b-form-group>

      <div class="mt-3">
        <b-button v-on:click="login" class="w-100" variant="primary" block :disabled="disableButton">Entrar
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Cadastrar',
  mounted() {
    console.log(this.$route)
  },
  data() {
    return {
      form: {
        login: '',
        senha: ''
      }
    }
  },
  methods: {
    login() {
      console.log(this.form)
    }
  },
  props: ['test']
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