<template>
  <div>
    <!-- Botão para abrir o modal -->
    <form @submit.prevent="openModal">
      <div class="form-group">
        <button type="submit" class="submit-btn">Criar</button>
      </div>
    </form>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Criar Nova Tarefa</h3>
        <form @submit.prevent="createTask">
          <div class="form-group">
            <label for="title">Título</label>
            <input
              type="text"
              v-model="task.title"
              id="title"
              placeholder="Título da tarefa"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Descrição</label>
            <textarea
              v-model="task.description"
              id="description"
              placeholder="Descrição da tarefa"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select v-model="task.status" id="status" required>
              <option value="pendente">Pendente</option>
              <option value="em progresso">Em Progresso</option>
              <option value="concluido">Concluída</option>
            </select>
          </div>
          <button type="submit" class="submit-btn">Salvar Tarefa</button>
        </form>
        <button class="close-btn" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";

export default {
  name: "CreateTaskButtonComponent",
  setup() {
    const showModal = ref(false); // Controla a visibilidade do modal
    const axios = inject("$axios");
    const task = ref({
      title: "",
      description: "",
      status: "pendente",
    });

    // Função para abrir o modal
    const openModal = () => {
      showModal.value = true;
    };

    // Função para fechar o modal
    const closeModal = () => {
      showModal.value = false;
    };

    // Função para criar a tarefa
    const createTask = async () => {
      try {
        const token = sessionStorage.getItem("token");
        await axios.post(
          `/tasks`,
          {
            title: task.value.title,
            description: task.value.description,
            status: task.value.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        alert("erro: ", error);
      }
      closeModal();
      window.location.reload();
    };

    return {
      showModal,
      task,
      openModal,
      closeModal,
      createTask,
    };
  },
};
</script>

<style scoped>
/* Estilo do botão criar */
.submit-btn {
  width: 10%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #38a169;
}

/* Estilo do modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.form-group {
  margin-bottom: 15px;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.close-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-btn:hover {
  background-color: #c0392b;
}
</style>
