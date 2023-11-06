import SchoolIcon from "@mui/icons-material/School";
import { EmbeddingShow, EmbeddingsList } from "./embeddings";


export default {
  icon: SchoolIcon,
  permissions: {
    // canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"]
  },
  list: EmbeddingsList,
  // create: EmbeddingCreate,
  // edit: EmbeddingEdit,
  show: EmbeddingShow,
};
