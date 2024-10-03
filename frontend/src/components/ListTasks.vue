<template>
  <div class="page-container">
    <div class="list-container">
      <h2 class="list-header">Minhas Tarefas</h2>
      <ul class="list-items" v-if="tasks.length">
        <li v-for="task in tasks" :key="task.id" class="list-item">
          <!-- Modo de edição -->
          <div v-if="editTaskId === task.id" class="task-edit-mode">
            <input
              class="edit-input"
              type="text"
              v-model="editedTask.title"
              placeholder="Título"
            />
            <textarea
              class="edit-input"
              v-model="editedTask.description"
              placeholder="Descrição"
            ></textarea>
            <select class="edit-input" v-model="editedTask.status">
              <option value="pendente">Pendente</option>
              <option value="em progresso">Em Progresso</option>
              <option value="concluido">Concluída</option>
            </select>
            <div class="task-actions">
              <button @click="saveTask(task.id)" class="task-action save">
                Salvar
              </button>
              <button @click="cancelEdit" class="task-action cancel">
                Cancelar
              </button>
            </div>
          </div>

          <!-- Modo de visualização -->
          <div v-else class="task-view-mode">
            <div class="task-info">
              <h3 class="list-item-title">{{ task.title }}</h3>
              <p class="list-item-description">{{ task.description }}</p>
              <div class="task-meta">
                <span class="list-item-status">Status: {{ task.status }}</span>
                <span class="list-item-date">
                  Criada em: {{ formatDate(task.created_at) }}
                </span>
              </div>
            </div>
            <div class="task-actions">
              <button @click="editTask(task)" class="task-action edit">
                Editar
              </button>
              <button @click="deleteTask(task.id)" class="task-action delete">
                Deletar
              </button>
            </div>
          </div>
        </li>
      </ul>
      <p class="no-tasks" v-else>Nenhuma tarefa encontrada.</p>
      <div class="buttons-grid">
        <LogoutButtonComponent />
        <CreateTaskButtonComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import LogoutButtonComponent from "../components/LogoutButton.vue";
import CreateTaskButtonComponent from "../components/CreateTaskButton.vue";

export default {
  name: "ListTasksComponent",
  components: {
    LogoutButtonComponent,
    CreateTaskButtonComponent,
  },
  setup() {
    const axios = inject("$axios");
    const tasks = ref([]);
    const editTaskId = ref(null);
    const editedTask = ref({ title: "", description: "", status: "" });
    const router = useRouter();

    const list = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          router.push("/");
          return;
        }

        const response = await axios.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        tasks.value = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/");
        }
      }
    };

    const editTask = (task) => {
      editTaskId.value = task.id;
      editedTask.value = { ...task };
    };

    const cancelEdit = () => {
      editTaskId.value = null;
      editedTask.value = { title: "", description: "", status: "" };
    };

    const saveTask = async (id) => {
      try {
        const token = sessionStorage.getItem("token");
        await axios.put(
          `/tasks/${id}`,
          {
            title: editedTask.value.title,
            description: editedTask.value.description,
            status: editedTask.value.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await list();
        cancelEdit();
      } catch (error) {
        alert(error);
      }
    };

    const deleteTask = async (id) => {
      try {
        const token = sessionStorage.getItem("token");
        await axios.delete(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await list();
      } catch (error) {
        alert(error);
      }
    };

    const formatDate = (timestamp) => {
      if (!timestamp || !timestamp._seconds) return "Data inválida";

      const date = new Date(timestamp._seconds * 1000);
      const options = { year: "numeric", month: "long", day: "numeric" };

      return date.toLocaleDateString("pt-BR", options);
    };

    onMounted(() => {
      list();
    });

    return {
      tasks,
      editTaskId,
      editedTask,
      editTask,
      saveTask,
      cancelEdit,
      deleteTask,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Centraliza a lista de tarefas na página */
.page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.list-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  
}

.list-header {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.list-items {
  list-style-type: none;
  padding: 0;
}

.list-item {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.list-item:last-child {
  border-bottom: none;
}

.task-view-mode {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.task-info {
  flex: 1;
}

.list-item-title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.list-item-description {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.task-meta {
  font-size: 12px;
  color: #888;
}

.list-item-status {
  display: block;
  margin-top: 5px;
}

.list-item-date {
  display: block;
  margin-top: 5px;
}

.task-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-action {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task-action.edit {
  background-color: #3498db;
  color: white;
}

.task-action.edit:hover {
  background-color: #2980b9;
}

.task-action.delete {
  background-color: #e74c3c;
  color: white;
}

.task-action.delete:hover {
  background-color: #c0392b;
}

.task-action.save {
  background-color: #2ecc71;
  color: white;
}

.task-action.save:hover {
  background-color: #27ae60;
}

.task-action.cancel {
  background-color: #95a5a6;
  color: white;
}

.task-action.cancel:hover {
  background-color: #7f8c8d;
}

.edit-input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.no-tasks {
  text-align: center;
  color: #999;
  font-style: italic;
  margin-top: 20px;
}

.buttons-grid {
  display: grid;
  grid-template-columns: auto auto; /* 2 colunas automáticas para os botões */
  gap: 10px; /* Espaçamento entre os botões */
}
</style>
