import {EmployeeCreate, EmployeeEdit, EmployeeShow, EmployeesList,} from "./employee";


export default {
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
  list: EmployeesList,
  create: EmployeeCreate,
  edit: EmployeeEdit,
  show: EmployeeShow,
};
