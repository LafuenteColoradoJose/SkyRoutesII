<template>
  <div id="contenedorFormularioLogin">
    <h2>Introduce los datos</h2>
    <div>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" @input="validateEmail" />
      <p v-if="emailError">{{ emailError }}</p>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" @input="validatePassword" />
      <p v-if="passwordError">{{ passwordError }}</p>
    </div>
    <p v-if="passwordLengthError">El password debe tener al menos 10 caracteres de longitud.</p>
    <button :disabled="!isFormValid" @click="login">Login</button>
    <article>
      <p class=""><strong>
        Para acceder a la aplicación, debes estar registrado. Si no lo estás, puedes hacerlo <a href='/register'>aquí</a>
      </strong></p>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      passwordLengthError: false,
    };
  },
  computed: {
    isFormValid() {
      return !this.emailError && !this.passwordError && !this.passwordLengthError;
    },
  },
  methods: {
    validateEmail() {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = 'El formato del email no es válido, debe cumplir RFC5322.';
      } else {
        this.emailError = '';
      }
    },
    validatePassword() {
      const hasUpperCase = /[A-Z]/.test(this.password);
      const hasLowerCase = /[a-z]/.test(this.password);
      const hasNumber = /\d/.test(this.password);

      if (!(hasUpperCase && hasLowerCase && hasNumber)) {
        this.passwordError = 'El formato del password no es válido, debe contener al menos una mayúscula, una minúscula y un número.';
      } else {
        this.passwordError = '';
      }

      this.passwordLengthError = this.password.length < 10;
    },
    login() {
      // Aquí puedes agregar la lógica para procesar el inicio de sesión
    },
  },
};
</script>

<style scope>
#contenedorFormularioLogin {
    height: 70vh;
    width: 60vw;
}

#contenedorFormularioLogin a {
  text-decoration: underline;
}

</style>

