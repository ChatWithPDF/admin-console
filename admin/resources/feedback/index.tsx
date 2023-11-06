import {FeedbackList} from "./feedback";


export default {
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
  list: FeedbackList
};
