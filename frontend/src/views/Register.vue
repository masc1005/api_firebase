<template>
  <div class="register-wrapper">
    <div class="register-container">
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="submit-btn">Cadastrar</button>
      </form>
      <button type="" class="back">
        <a href="/">Voltar</a>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RegisterPage",
  setup() {
    const axios = inject("$axios");
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const register = async () => {
      try {
        await axios.post("/users", {
          email: email.value,
          password: password.value,
        });

        alert(
          "Cadastro bem-sucedido! Aguarde 5 segundos para ser redirecionado"
        );

        setTimeout(() => {
          router.push("/");
        }, 5000);
      } catch (error) {
        console.error("Erro no cadastro:", error);
      }
    };

    return {
      email,
      password,
      register,
    };
  },
};
</script>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

a {
  text-decoration: none;
  color: white;
}

.register-container {
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

.back {
  width: 20%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #38a169;
}

@media (max-width: 480px) {
  .register-container {
    padding: 15px;
  }

  .submit-btn {
    padding: 10px;
  }
}
</style>
