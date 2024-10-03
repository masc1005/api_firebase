<template>
  <form @submit.prevent="logout">
    <div class="form-group">
      <button type="submit" class="submit-btn">Logout</button>
    </div>
  </form>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "LogoutButtonComponent",
  setup() {
    const router = useRouter();

    const logout = async () => {
      try {
        sessionStorage.clear();
        router.push("/");
      } catch (error) {
        alert(error);
      }
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.submit-btn {
  width: 10%;
  padding: 12px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #570000;
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
