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
const FaqFilter = (props: any) => {
  return (
    <Filter {...props}>
      <TextInput label="Search QuestionInEnglish" source="questionInEnglish" alwaysOn />
      <TextInput label="Search Question" source="question" alwaysOn />
    </Filter>
  );
};

// FaqsList component
export const FaqsList = (props: any) => {
  return (
  <>
  <List filters={<FaqFilter />} actions = {<ListActions />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="question" />
      <TextField source="answer" />
      <TextField source="questionInEnglish" />
      <TextField source="answerInEnglish" />
      <EditButton />
      <DeleteButton />
      <ShowButton />
    </Datagrid>
  </List>
  </>
)};

// FaqCreate component
export const FaqCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="question" multiline fullWidth />
      <TextInput source="answer" multiline fullWidth />
      <TextInput source="questionInEnglish" multiline fullWidth />
      <TextInput source="answerInEnglish" multiline fullWidth />
    </SimpleForm>
  </Create>
);

// FaqEdit component
export const FaqEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="question" multiline fullWidth />
      <TextInput source="answer" multiline fullWidth />
      <TextInput source="questionInEnglish" multiline fullWidth />
      <TextInput source="answerInEnglish" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

// FaqShow component
export const FaqShow = (props: any) => {
  return (
    <Show {...props} sx={{maxWidth:"80vw",height:"100%"}}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="question" sx = {{wordWrap:"break-word"}} />
        <TextField source="answer" sx = {{wordWrap:"break-word"}} />
        <TextField source="questionInEnglish" sx = {{wordWrap:"break-word"}} />
        <TextField source="answerInEnglish" sx = {{wordWrap:"break-word"}} />
      </SimpleShowLayout>
    </Show>
  )
};