import * as React from 'react';
import {
  List,
  Datagrid,
  TextInput,
  Filter,
  TopToolbar,
  ExportButton,
  TextField,
  DateInput,
} from 'react-admin';
import { useRecordContext } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FeedbackForm from './feedbackForm';
import ViewFeedback from './viewFeedback';

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
    </TopToolbar>
  );
};

// Custom filter component
const ConversationsFilter = (props: any) => {
  return (
    <Filter {...props}>
      <TextInput label="Search Mobile" source="mobile" alwaysOn />
      <DateInput label="From Date" source="fromDate" alwaysOn/>
      <DateInput label="To Date" source="toDate" alwaysOn/>
    </Filter>
  );
};

// UsersList component
export const ConversationList = (props: any) => {
  const ViewChatButton = () => {
    const record = useRecordContext();
    const navigate = useNavigate();

    const handleClick = () => {
      const userId = record.userid,
        convId = record.id;
      navigate(`/chatHistory?userId=${userId}&conversationId=${convId}`);
    };

    return (
      <Button onClick={handleClick} variant="contained">
        View Chat
      </Button>
    );
  };  

  const FeedbackButton = () => {
    const record = useRecordContext();
  
    return (
      <>
        <FeedbackForm convid={record.id}/>
      </>
    );
  };
  const ViewFeedbackButton = () => {
    const record = useRecordContext();
  
    return (
      <>
        <ViewFeedback feedback={record.feedback}/>
      </>
    );
  };

  return (
    <>
      <List
        filters={<ConversationsFilter />}
        actions={<ListActions />}
        filterDefaultValues={{ fromDate: '', toDate: '' }}
        {...props}>
        <Datagrid>
          <TextField source="id" label="Conversation Id" sortable={false} />
          <TextField source="queries" sortable={false} />
          <TextField source="mobile" sortable={false} />
          <TextField source="lastUpdated" sortable={false} />
          <ViewChatButton />
          <FeedbackButton />
          <ViewFeedbackButton/>
        </Datagrid>
      </List>
    </>
  );
};
