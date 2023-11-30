<template>
  <div id="contenedorFormularioRegistro">
    <h1>Introduce los datos</h1>
    <form @submit.prevent="validarFormulario">
      <label for="nombre">Nombre:</label>
      <input v-model.trim="name" type="text" id="nombre" name="name" class="input input-bordered w-full max-w-xs" required
        @input="validarNombre">
      <div class="error-container">
        <div id="nombreError" class="error">{{ nombreError }}</div>
      </div>

      <label for="usuario">Usuario:</label>
      <input v-model.trim="user" type="text" id="usuario" name="user" class="input input-bordered w-full max-w-xs"
        required @input="validarUsuario">
      <div class="error-container">
        <div id="usuarioError" class="error">{{ usuarioError }}</div>
      </div>

      <label for="email">Email:</label>
      <input v-model.trim="email" type="email" id="email" name="email" class="input input-bordered w-full max-w-xs"
        required @input="validarEmail">
      <div class="error-container">
        <div id="emailError" class="error">{{ emailError }}</div>
        <div id="emailOcupado" class="error">{{ emailOcupado }}</div>
      </div>

      <label for="password">Contraseña:</label>
      <input v-model.trim="password" type="password" id="password" name="password"
        class="input input-bordered w-full max-w-xs" required @input="validarPassword">
      <div class="error-container">
        <div id="passwordError" class="error">{{ passwordError }}</div>
      </div>


      <label for="confirmPassword">Confirmar Contraseña:</label>
      <input v-model.trim="confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
        class="input input-bordered w-full max-w-xs" required @input="validarConfirmPassword">
      <div class="error-container">
        <div id="confirmPasswordError" class="error">{{ confirmPasswordError }}</div>
      </div>

      <button type="submit" id="registrarBtn">Registrar</button>
    </form>
  </div>
</template>

<script setup>

let name = ref("");
let user = ref("");
let email = ref("");
let password = ref("");
let nombreError = ref("");
let usuarioError = ref("");
let emailError = ref("");
let passwordError = ref("");
let emailOcupado = ref("");
let confirmPassword = ref("");
let confirmPasswordError = ref("");

function validarNombre() {
  const nombrePattern = /^[a-zA-ZÀ-ÿ\s']{2,}\s[a-zA-ZÀ-ÿ\s']{2,}$/u;
  if (!nombrePattern.test(name.value)) {
    nombreError.value = 'El nombre y apellido deben tener al menos 2 caracteres de longitud.';
  } else {
    nombreError.value = ''
  }
};

function validarUsuario() {
  if (user.value.length < 2) {
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
    passwordError.value = 'Contraseña no cumple los requisitos.';
  } else {
    passwordError.value = '';
  }
};

function formularioValido() {
  return (
    !nombreError.value &&
    !usuarioError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  );
};

function validarConfirmPassword() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden.';
  } else {
    confirmPasswordError.value = '';
  }
};

async function validarFormulario() {
  if (formularioValido()) {
    console.log('Formulario válido. Envía los datos.');

    const data = await $fetch("users/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        user: user,
        email: email,
        password: password
      }),
    });

    console.log(data);

    if (data.api === 1) {
      // Redirigir al usuario a TheFormLogin.vue
      console.log("Usuario registrado con éxito. Redirigiendo al login...");
      // const router = useRouter();
      // $router.push('/TheFormLogin');
      // window.location.href = 'TheFormLogin.html';

      // Prueba
      await navigateTo('/', {
        open: {
          target: '_self',
          windowFeatures: {
            width: 500,
            height: 500
          }
        }
      })

    } else if (data.api === 0) {
      // Mostrar un mensaje de correo ocupado
      console.log("Correo ocupado. Mostrar mensaje al usuario...");
      emailOcupado.value = 'Correo ocupado.';
    }

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
  /* height: 70vh; */
  /* Bloqueo */
  width: 60vw;
  margin: auto;
  margin-top: 1vh;
  /* margen superior */
}

form {
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  display: block;
  margin-bottom: 10px;
}

.error-container {
  height: 25px;
  /* Ajusta la altura del contenedor de error */
}

.error {
  color: red;
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
</style>