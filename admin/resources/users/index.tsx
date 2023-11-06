import {UsersList} from "./users";


export default {
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
  list: UsersList,
};
