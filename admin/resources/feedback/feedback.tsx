import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ShowButton
} from 'react-admin';

// FaqsList component
export const FeedbackList = (props: any) => {
  return (
  <>
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="rating" />
      <TextField source="review" />
    </Datagrid>
  </List>
  </>
)};