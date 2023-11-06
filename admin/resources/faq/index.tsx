import {FaqCreate, FaqEdit, FaqShow, FaqsList,} from "./faq";


export default {
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
  list: FaqsList,
  create: FaqCreate,
  edit: FaqEdit,
  show: FaqShow,
};
