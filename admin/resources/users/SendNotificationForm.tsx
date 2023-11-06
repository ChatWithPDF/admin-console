import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useNotify } from "react-admin";

const SendNotificationForm = ({ userid }: { userid: any }) => {
  const notify = useNotify();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [featureDetails, setFeatureDetails] = useState({
    title: "",
    description: "",
  });
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [fcmToken, setFcmToken] = useState();

  useEffect(() => {
    let tokens = 0, users = 0, fcmToken;
    const fetchFCM = async () => {
      try {
        //get registration tokens
        // if userid is null, means notify all users, need to get everyone's tokens
        if (!userid) {
          let page = 1;
          const perPage = 50;
          let allTokens = [];

          while (true) {
            const response = await fetch(
              `/api/user/search?page=${page}&perPage=${perPage}`
            );

            // handle network errors
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Store the length of result.users in a separate variable
            const usersCount = result?.users?.length || 0;
            console.log("hi", usersCount);
            users = users + usersCount;

            for (let i = 0; i < usersCount; i++) {
              // Check if data and fcmToken exist before pushing to allTokens
              const { data } = result.users[i];
              if (data && data.fcmToken) {
                allTokens.push(data.fcmToken);
                tokens = tokens + 1;
              }
            }

            if (usersCount === 0) {
              break;
            }
            page++; // increment page number for next iteration
          }
          fcmToken = allTokens;
        } else {
          const response = await fetch(`/api/user/getUser?userID=${userid}`);
          // handle network errors
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const userData = await response.json();
          fcmToken = userData?.user?.data?.fcmToken;
          if (fcmToken) tokens=1;
        }
        setTotalTokens(tokens);
        setTotalUsers(users);
        setFcmToken(fcmToken);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFCM();
  }, []);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    // Prepare the FCM notification payload
    const notification = {
      title: title,
      body: description,
      image: image,
      data: link,
      featureDetails,
      tag: "notification",
    };

    // Send the FCM notification to each token using the REST API
    try {
      let requestBody: any = {
        notification: notification,
      };

      if (userid) {
        requestBody.to = fcmToken;
      } else {
        requestBody.registration_ids = fcmToken;
      }
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=${process.env.NEXT_PUBLIC_FIREBASE_SERVER_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Reset the form fields
        // setTitle('');
        // setDescription('');

        // Show success message or perform any additional actions
        console.log("Notification sent successfully");
        notify("Notification sent successfully");

        // Close the form
        setOpen(false);
      } else {
        console.error(
          "Error sending notification:",
          response.status,
          response.statusText
        );
        notify("Error sending notification");
        // Show error message or handle the error
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      // Show error message or handle the error
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
        {userid ? "Notify" : "Notify All"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogTitle>
          {userid
            ? totalTokens === 0
              ? <span style={{ color: 'red' }}>Cannot send notifications to this user</span>
              : <span style={{ color: 'green' }}>Can send notifications to this user</span>
            : `${totalTokens}/${totalUsers}`}
        </DialogTitle>
        
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Notification Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            margin="dense"
            label="Image Link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Link (Start with https or http)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Feature Title"
            value={featureDetails.title}
            onChange={(e) =>
              setFeatureDetails({ ...featureDetails, title: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Feature Description"
            value={featureDetails.description}
            onChange={(e) =>
              setFeatureDetails({
                ...featureDetails,
                description: e.target.value,
              })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleFormSubmit}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendNotificationForm;
