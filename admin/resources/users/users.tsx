import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Filter,
  TopToolbar,
  ExportButton,
} from 'react-admin';
import { useRecordContext } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import SendNotificationForm from './SendNotificationForm';
import Button from '@mui/material/Button';

const ListActions = (props: any) => {
  const { className, total, resource, currentSort, exporter } = props;

  return (
    <TopToolbar className={className}>
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        exporter={exporter}
      />
        <SendNotificationForm userid={null}/>
    </TopToolbar>
  );
};

// Custom filter component
const UsersFilter = (props: any) => {
  return (
    <Filter {...props}>
      <TextInput label="Search UserId" source="id" alwaysOn />
      <TextInput label="Search Mobile" source="mobile" alwaysOn />
    </Filter>
  );
};

// UsersList component
export const UsersList = (props: any) => {
  
  const ViewChatButton = () => {
    const record = useRecordContext();
    const navigate = useNavigate();
  
    const handleClick = () => {
      const userId = record.id;
      navigate(`/chatHistory?userId=${userId}`);
    };
  
    return <Button onClick={handleClick} variant="contained">View Chat</Button>;
  };
  
  const SendNotificationButton = () => {
    const record = useRecordContext();
  
    return (
      <>
        <SendNotificationForm userid={record.id}/>
      </>
    );
  };
  
  return (
    <>
      <List filters={<UsersFilter />} actions={<ListActions />} {...props}>
        <Datagrid>
          <TextField source="id" label="User Id" sortable={false} />
          <TextField source="queries" sortable={false} />
          <TextField source="mobile" sortable={false} />
          <TextField source="lastLogin" sortable={false} />
          <ViewChatButton />
          <SendNotificationButton />
        </Datagrid>
      </List>
    </>
  );
};
