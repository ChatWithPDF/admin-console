import {ConversationList} from "./conversations";


export default {
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
  list: ConversationList,
};
