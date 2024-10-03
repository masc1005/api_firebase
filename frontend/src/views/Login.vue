<template>
  <div class="login-wrapper">
    <div class="login-container">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="submit-btn">Login</button>
      </form>
      <button type="" class="submit-btn-cdt">
        <a href="/register">Não tem conta? Cadastre-se</a>
        <br />
        <br />
        <a @click="forgetPassword">Esqueci a senha</a>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const axios = inject("$axios");
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post("/users/auth", {
          email: email.value,
          password: password.value,
        });

        sessionStorage.token = response.data.accessToken;

        router.push("/home");
      } catch (error) {
        alert(error);
      }
    };

    const forgetPassword = async () => {
      try {
        if (email.value === "") alert("Insira o email acima!");

        const response = await axios.post("/users/reset/password", {
          email: email.value,
        });

        if (response.status === 200)
          alert(
            "Um email para troca de senha foi enviado, caso não encontre verifique o spam."
          );
      } catch (error) {
        alert(error);
      }
    };

    return {
      email,
      password,
      login,
      forgetPassword,
    };
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.login-container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.submit-btn-cdt {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  background-color: white;
  color: #42b983;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

a {
  text-decoration: none;
  color: #42b983;
}

.submit-btn:hover {
  background-color: #38a169;
}

@media (max-width: 480px) {
  .login-container {
    padding: 15px;
  }

  .submit-btn {
    padding: 10px;
  }
}
</style>
