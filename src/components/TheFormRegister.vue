<template>
  <div id="contenedorFormularioRegistro">
    <h1>Introduce los datos</h1>
    <form @submit.prevent="validarFormulario">
      <label for="nombre">Nombre:</label>
      <input v-model.trim="nombre" type="text" id="nombre" name="nombre" required @input="validarNombre">
      <div id="nombreError" class="error">{{ nombreError }}</div>

      <label for="usuario">Usuario:</label>
      <input v-model.trim="usuario" type="text" id="usuario" name="usuario" required @input="validarUsuario">
      <div id="usuarioError" class="error">{{ usuarioError }}</div>

      <label for="email">Email:</label>
      <input v-model.trim="email" type="email" id="email" name="email" required @input="validarEmail">
      <div id="emailError" class="error">{{ emailError }}</div>

      <label for="password">Contraseña:</label>
      <input v-model.trim="password" type="password" id="password" name="password" required @input="validarPassword">
      <div id="passwordError" class="error">{{ passwordError }}</div>

      <button type="submit" id="registrarBtn">Registrar</button>
    </form>
  </div>
</template>

<script setup>
let nombre = ref("");
let usuario = ref("");
let email = ref("");
let password = ref("");
let nombreError = ref("");
let usuarioError = ref("");
let emailError = ref("");
let passwordError = ref("");

function validarNombre() {
  const nombrePattern = /^[a-zA-ZÀ-ÿ\s']{2,}\s[a-zA-ZÀ-ÿ\s']{2,}$/u;
  if (!nombrePattern.test(nombre.value)) {
    nombreError.value = 'El nombre y apellido deben tener al menos 2 caracteres de longitud cada uno.';
  } else {
    nombreError.value = ''
  }
};

function validarUsuario() {
  if (usuario.value.length < 2) {
    usuarioError.value = 'El usuario debe tener al menos 2 caracteres de longitud.';
  } else {
    usuarioError.value = '';
  }
};

function validarEmail() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email.value)) {
    emailError.value = 'El formato del email no es válido, debe cumplir RFC5322.';
  } else {
    emailError.value = '';
  }
};

function validarPassword() {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
  if (!passwordPattern.test(password.value)) {
    passwordError.value = 'El formato del password no es válido, debe contener al menos una mayúscula, una minúscula y un número, y tener al menos 10 caracteres de longitud.';
  } else {
    passwordError.value = '';
  }
};

function formularioValido() {
  return !nombreError.value && !usuarioError.value && !emailError.value && !passwordError.value;
};

function validarFormulario() {
  if (formularioValido()) {
    console.log('Formulario válido. Envía los datos.');
  } else {
    console.log('Formulario inválido. Por favor, corrige los errores.');
  }
};

</script>

<style scoped>
#contenedorFormularioRegistro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 70vh;
  width: 60vw;
  margin: auto;
  margin-top: 1vh; /* margen superior*/
}

form {
  width: 100%;
}
</style>
