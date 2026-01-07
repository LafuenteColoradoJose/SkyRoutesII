<template>
  <div
    class="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-sky-primary/20 bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
    <h1 class="text-3xl font-bold mb-6 text-[var(--color-text-heading-from)] text-center">Introduce los datos</h1>
    <form @submit.prevent="validarFormulario" class="w-full space-y-4">

      <div>
        <label for="email" class="block text-sm font-medium text-[var(--color-text-body)] mb-1">Email:</label>
        <input v-model.trim="email" type="email" id="email" name="email"
          class="w-full px-4 py-3 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/50 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] transition-all duration-200 outline-none"
          placeholder="ejemplo@skyroutes.com" required @input="validarEmail">
        <div class="h-6 mt-1 text-xs text-red-400">
          {{ emailError }}
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-[var(--color-text-body)] mb-1">Contraseña:</label>
        <input v-model.trim="password" type="password" id="password" name="password"
          class="w-full px-4 py-3 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/50 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] transition-all duration-200 outline-none"
          placeholder="••••••••••" required @input="validarPassword">
        <div class="h-6 mt-1 text-xs text-red-400">
          {{ passwordError }}
        </div>
      </div>

      <div v-if="emailOrPasswordError"
        class="text-sm text-red-400 text-center font-semibold bg-red-900/20 p-2 rounded border border-red-500/20">
        {{ emailOrPasswordError }}
      </div>

      <div class="space-y-3 pt-2">
        <button type="submit" id="login"
          class="w-full py-3 px-4 bg-sky-primary hover:bg-sky-primary/80 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
          Iniciar Sesión
        </button>

        <NuxtLink to="/register"
          class="block w-full text-center py-3 px-4 bg-transparent border border-[var(--color-border-subtle)] hover:bg-sky-primary/10 text-[var(--color-text-body)] rounded-lg transition-all duration-200">
          Registrarse
        </NuxtLink>
      </div>

      <p class="text-xs text-center text-[var(--color-text-muted)] mt-4">
        Para acceder a la aplicación, debes estar registrado.
      </p>

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
  // return !emailError.value && !passwordError.value;
  return true;
};

const userId = ref(useCookie('userId'))

async function validarFormulario() {
  if (formularioValido()) {

    const data = await $fetch("users/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      }),
    }
    );

    if (data.api === 1 && data.isAdmin === 0) {
      emailOrPasswordError.value = '';
      userId.value = data.id


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
      await navigateTo('/user', {
        open: {
          target: '_self',
          windowFeatures: {
            width: 500,
            height: 500
          }
        }
      })
    } else if (data.api === 0) {
      console.log("Email o Contraseña INCORRECTO");
      emailOrPasswordError.value = 'Email o Contraseña INCORRECTO';
    }

  } else {
    console.log('Formulario inválido. Por favor, corrige los errores.');
  }
};

</script>

<style scoped>
/* Scoped styles removed in favor of Tailwind classes in template */
</style>