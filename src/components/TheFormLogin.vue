<template>
  <div id="contenedorFormularioLogin">
    <h1>Introduce los datos</h1>
    <form @submit.prevent="validarFormulario">
      <label for="email">Email:</label>
      <input v-model.trim="email" type="email" id="email" name="email" class="input input-bordered w-full max-w-xs" required @input="validarEmail">
      <div id="emailError" class="error">{{ emailError }}</div>

      <label for="password">Contraseña:</label>
      <input v-model.trim="password" type="password" id="password" name="password" class="input input-bordered w-full max-w-xs" required @input="validarPassword">
      <div id="passwordError" class="error">{{ passwordError }}</div>

      <div id="emailOrPasswordError" class="error">{{ emailOrPasswordError }}</div>

      <button type="submit" id="login">Login</button>
    </form>

    <article>
      <p class=""><strong>Para acceder a la aplicación, debes estar registrado. Si no lo estás, puedes hacerlo <router-link to="/register">aquí</router-link></strong></p>
    </article>
  </div>
</template>

<script setup>
let email = ref("");
let password = ref("");
let emailError = ref("");
let passwordError = ref("");
let emailOrPasswordError = ref("");

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
}

function formularioValido() {
  return !emailError.value && !passwordError.value;
};

async function validarFormulario() {
  if (formularioValido()) {
    console.log('Formulario válido. Envía los datos.');

    const data = await $fetch("users/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }
    );

    if (data.api === 1) {
      //Email y Contraseña correcta --> Redirigir al usuario a 
      console.log("Email y Contraseña correcta");
      emailOrPasswordError.value = '';

    } else if (data.api === 0) {
      // Email o Contraseña INCORRECTO
      console.log("Email o Contraseña INCORRECTO");
      emailOrPasswordError.value = 'Email o Contraseña INCORRECTO';

    }



  } else {
    console.log('Formulario inválido. Por favor, corrige los errores.');
  }
};

</script>

<style scoped>
#contenedorFormularioLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 1vh; /* margen superior */
  height: 70vh;
  width: 60vw;
}

form {
  width: 100%;
}

label, input, .error {
  display: block; 
  margin-bottom: 5px; /* espacio entre cada elemento */
}

.error {
  color: brown;
}

#contenedorFormularioLogin a {
  text-decoration: underline;
}
</style>
