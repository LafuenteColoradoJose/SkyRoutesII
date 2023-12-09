<template>
  <div id="contenedorFormularioLogin">
    <h1 class="text-xl font-bold mb-2">Introduce los datos</h1>
    <form @submit.prevent="validarFormulario">

      <label for="email">Email:</label>
      <input v-model.trim="email" type="email" id="email" name="email" class="input input-bordered w-full max-w-xs"
        required @input="validarEmail">

      <div class="error-container">
        <div id="emailError" class="error">{{ emailError }}</div>
      </div>

      <label for="password">Contraseña:</label>
      <input v-model.trim="password" type="password" id="password" name="password"
        class="input input-bordered w-full max-w-xs" required @input="validarPassword">

      <div class="error-container">
        <div id="passwordError" class="error">{{ passwordError }}</div>
      </div>

      <div id="emailOrPasswordError" class="error">{{ emailOrPasswordError }}</div>

      <div class="flex flex-row justify-center items-center gap-1">
        <button type="submit" id="login">Login</button>
        <button><router-link to="/register">Register</router-link></button>

      </div>
      <p class=""><strong>Para acceder a la aplicación, debes estar registrado.</strong></p>


    </form>

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
    passwordError.value = 'Contraseña no cumple los requisitos.';
  } else {
    passwordError.value = '';
  }
}

function formularioValido() {
  return !emailError.value && !passwordError.value;
};

// EXPORTAR EL ID DEL USUARIO

const userId = ref(useCookie('userId'))
const isAdmin = ref(false);

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

    if (data.api === 1 && data.isAdmin === 0) {
      //Email y Contraseña correcta --> Redirigir al usuario a 
      console.log("Email y Contraseña correcta");
      emailOrPasswordError.value = '';
      // Cuando recibes el id del usuario, establece el valor de userId
      userId.value = data.id


      // Prueba
      await navigateTo('/user', {
        open: {
          target: '_self',
          windowFeatures: {
            width: 500,
            height: 500
          }
        }
      })

    } else if (data.api === 1 && data.isAdmin === 1) {
      userId.value = data.id
      await navigateTo('/', {
        open: {
          target: '_self',
          windowFeatures: {
            width: 500,
            height: 500
          }
        }
      })
    }

  } else if (data.api === 0) {
    // Email o Contraseña INCORRECTO
    console.log("Email o Contraseña INCORRECTO");
    emailOrPasswordError.value = 'Email o Contraseña INCORRECTO';

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
  justify-content:center;
  margin: auto;
  margin-top: 1vh;
  width: 100%;
  /* margen superior */
  /* height: 70vh; */
  /* width: 60vw; */
  /* background-color: brown; */
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
}

label,
input,
.error {
  display: block;
  margin-bottom: 5px;
  /* espacio entre cada elemento */
}

.error {
  color: red;
}

#contenedorFormularioLogin a {
  text-decoration: underline;
}

button {
  background-color: #5f7fa6;
  /* Nuevo color de fondo */
  color: white;
  /* Color del texto blanco */
  border: none;
  /* Sin borde */
  border-radius: 4px;
  /* Esquinas redondeadas */
  cursor: pointer;
  padding: 6px 12px;
  /* Espaciado interno */
}

button:hover {
  background-color: #4a6280;
  /* Cambio de color al pasar el ratón */
}

.error-container {
  height: 45px;
  /* Ajusta la altura del contenedor de error */

}
</style>
