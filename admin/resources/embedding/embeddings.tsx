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
  NumberInput,
  Filter,
  TopToolbar,
  ExportButton,
  CreateButton,
  SelectInput,
} from 'react-admin';
import ImportCsvModal from "./ImportCsvModal"
import { MdUpload } from 'react-icons/md'
import {useRouter} from 'next/router'

const ListActions = (props: any) => {
  const {
    className,
    basePath,
    total,
    resource,
    currentSort,
    filterValues,
    exporter,
  } = props;
  const [isImportModelShown, showImportModal] = React.useState(false)
  
  return (
    <TopToolbar className={className}>
      <CreateButton resource={resource}/>
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        exporter={exporter}
      />
      <button 
      onClick={()=>showImportModal(true)}
      style={{
        border: "none",
        backgroundColor: "transparent",
        padding: "5px 4px",
        color: "#1976d2"
      }}
      >
        <MdUpload style = {{height: 18, width: 18, paddingRight: "3px", marginBottom: "-4px"}}/>
        <span style = {{
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          fontWeight: 500,
          fontSize: "0.8125rem"}}
        > UPLOAD</span>
      </button>
      {isImportModelShown && <ImportCsvModal showImportModal = {showImportModal} />}
    </TopToolbar>
  );
};

// Custom filter component
const EmbeddingFilter = (props: any) => {
  const router = useRouter();
  console.log(router)
  const similaritySearch = async (event: any) => {
  };

  if(window?.location.href.includes('/embeddings2')){
    return (
    <Filter {...props}>
      <TextInput label="Content Search" source="content" alwaysOn />
    </Filter>
    )
  }else
  return (
    <Filter {...props}>
      <TextInput label="Similarity Search" source='query' alwaysOn onChange={similaritySearch}/>
      <NumberInput label="Threshold" source='similarityThreshold' alwaysOn />
      <NumberInput label="Maximum Search Count" source='matchCount' alwaysOn />
      <SelectInput
        source="searchVia"
        label="Search Via"
        choices={[
          { id: 'contentEmbedding', name: 'Content' },
          { id: 'headingEmbedding', name: 'Heading' },
          { id: 'summaryEmbedding', name: 'Summary' }
        ]}
        alwaysOn
      />
      <NumberInput label="Chunk Id" source='chunkId' alwaysOn />
    </Filter>
  );
};

// EmbeddingsList component
export const EmbeddingsList = (props: any) => {
  return (
  <>
  <List filters={<EmbeddingFilter />} actions = {<ListActions />} empty={false} {...props}>
    <Datagrid>
      <TextField source="chunkId" />
      <TextField source="content" />
      <TextField source="heading" />
      <TextField source="summary" />
      <TextField source="type" />
      <EditButton />
      <DeleteButton />
      <ShowButton />
    </Datagrid>
  </List>
  </>
)};

// EmbeddingCreate component
export const EmbeddingCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="chunkId" />
      <TextInput source="content" multiline fullWidth />
      <TextInput source="heading" multiline fullWidth />
      <TextInput source="summary" multiline fullWidth />
      <TextInput source="type" />
    </SimpleForm>
  </Create>
);

// EmbeddingEdit component
export const EmbeddingEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="chunkId" />
      <TextInput source="content" multiline fullWidth />
      <TextInput source="heading" multiline fullWidth />
      <TextInput source="summary" multiline fullWidth />
      <TextInput source="type" />
    </SimpleForm>
  </Edit>
);

// EmbeddingShow component
export const EmbeddingShow = (props: any) => {
  return (
    <Show {...props} sx={{maxWidth:"80vw",height:"100%"}}>
      <SimpleShowLayout>
        <TextField source="chunkId" />
        <TextField source="content" sx = {{wordWrap:"break-word"}} />
        <TextField source="heading" sx = {{wordWrap:"break-word"}} />
        <TextField source="summary" sx = {{wordWrap:"break-word"}} />
        <TextField source="type" />
      </SimpleShowLayout>
    </Show>
  )
};