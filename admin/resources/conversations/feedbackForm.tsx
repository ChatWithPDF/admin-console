import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useNotify } from 'react-admin';

const FeedbackForm = ({ convid }: { convid: any }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);
  const notify = useNotify();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_BFF_API_URL}/feedback/conversation`;
    const token = `Bearer ${
      //@ts-ignore
      JSON.parse(localStorage.getItem('userData')).user.token
    }`;

    const data = {
      conversationId: convid,
      rating: rating,
      review: feedback,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      notify('Feedback submitted');
      setOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      notify('Feedback could not be submitted');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Feedback
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantitative Feedback"
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Qualitative Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeedbackForm;
