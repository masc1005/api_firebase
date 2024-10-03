<template>
  
  <ListTasksComponent />
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import ListTasksComponent from "../components/ListTasks.vue";


export default {
  name: "HomePage",
  components: {
    ListTasksComponent,
  },
  setup() {
    const router = useRouter();

    const checkAuth = () => {
      const token = sessionStorage.getItem("token");

      if (!token || !isJwtValid(token)) {
        router.push("/");
      }
    };

    const isJwtValid = (token) => {
      try {
        const decodedToken = jwtDecode(token);
        return !!decodedToken;
      } catch (error) {
        return false;
      }
    };

    onMounted(() => {
      checkAuth();
    });

    return {};
  },
};
</script>

<style scoped></style>
