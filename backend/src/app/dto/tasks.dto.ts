export interface Tasks {
  id: number;
  title: string;
  description: string;
  status: "pendente" | "em progresso" | "concluido";
  created_at: Date;
  id_user: string;
}
