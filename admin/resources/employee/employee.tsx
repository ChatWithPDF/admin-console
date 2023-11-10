import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  SimpleShowLayout,
  Show,
  ShowButton,
  Edit,
  Filter,
  TopToolbar,
  ExportButton,
  CreateButton,
} from 'react-admin';

const ListActions = (props: any) => {
  const {
    className,
    total,
    resource,
    currentSort,
    exporter,
  } = props;
  return (
    <TopToolbar className={className}>
      <CreateButton resource={resource}/>
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        exporter={exporter}
      />
    </TopToolbar>
  );
};

// Custom filter component
const EmployeeFilter = (props: any) => {
  return (
    <Filter {...props}>
      <TextInput label="Search name" source="name" alwaysOn />
      <TextInput label="Search phone" source="mobileNumber" alwaysOn />
    </Filter>
  );
};

// EmployeesList component
export const EmployeesList = (props: any) => {
  return (
  <>
  <List filters={<EmployeeFilter />} actions = {<ListActions />} {...props}>
    <Datagrid>
      <TextField source="employeeId" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="track" />
      <TextField source="designation" />
      <TextField source="mobileNumber" />
      <EditButton />
      <DeleteButton />
      <ShowButton />
    </Datagrid>
  </List>
  </>
)};

// EmployeeCreate component
export const EmployeeCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="employeeId" />
      <TextInput source="firstName"/>
      <TextInput source="lastName"/>
      <TextInput source="middleName"/>
      <TextInput source="email"/>
      <TextInput source="track"/>
      <TextInput source="designation"/>
      <TextInput source="role"/>
      <TextInput source="program"/>
      <TextInput source="dateOfJoining"/>
      <TextInput source="dateOfBirth"/>
      <TextInput source="age"/>
      <TextInput source="gender"/>
      <TextInput source="maritalStatus"/>
      <TextInput source="mobileNumber"/>
      <TextInput source="presentAddress" multiline fullWidth />
      <TextInput source="permanentAddress" multiline fullWidth />
    </SimpleForm>
  </Create>
);

// EmployeeEdit component
export const EmployeeEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="employeeId" />
      <TextInput source="firstName"/>
      <TextInput source="lastName"/>
      <TextInput source="middleName"/>
      <TextInput source="email"/>
      <TextInput source="track"/>
      <TextInput source="designation"/>
      <TextInput source="role"/>
      <TextInput source="program"/>
      <TextInput source="dateOfJoining"/>
      <TextInput source="dateOfBirth"/>
      <TextInput source="age"/>
      <TextInput source="gender"/>
      <TextInput source="maritalStatus"/>
      <TextInput source="mobileNumber"/>
      <TextInput source="presentAddress" multiline fullWidth />
      <TextInput source="permanentAddress" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

// EmployeeShow component
export const EmployeeShow = (props: any) => {
  return (
    <Show {...props} sx={{maxWidth:"80vw",height:"100%"}}>
      <SimpleShowLayout>
        <TextField source="employeeId" />
        <TextField source="firstName"/>
        <TextField source="lastName"/>
        <TextField source="middleName"/>
        <TextField source="email"/>
        <TextField source="track"/>
        <TextField source="designation"/>
        <TextField source="role"/>
        <TextField source="program"/>
        <TextField source="dateOfJoining"/>
        <TextField source="dateOfBirth"/>
        <TextField source="age"/>
        <TextField source="gender"/>
        <TextField source="maritalStatus"/>
        <TextField source="mobileNumber"/>
        <TextField source="presentAddress" sx = {{wordWrap:"break-word"}} />
        <TextField source="permanentAddress" sx = {{wordWrap:"break-word"}} />
      </SimpleShowLayout>
    </Show>
  )
};