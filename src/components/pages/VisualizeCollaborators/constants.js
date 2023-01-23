export const visualizeCollaboratorsInitialState = {
  collaborators: {},
  isLoading: false,
  warningModal: false,
  idOnFocus: "",
  editModal: {
    open: false,
    collaborator: {
      data: {},
      messages: {},
      autoComplete: {
        loading: false,
        results: [],
        value: "",
      },
      btnLocked: true,
    },
  },
  btnNotActive: false,
};

export const visualizeCollaboratorsHeadCells = [
  { name: "", position: "" },
  { name: "Nome do Colaborador", position: "left" },
  { name: "Cidade", position: "left" },
  { name: "Estado(UF)", position: "center" },
  { name: "Profissão", position: "center" },
  { name: "Data de Admissão", position: "right" },
  { name: "", position: "" },
];

export const registerTableHeadCells = ["Dados do Registro", "Navegação"];
