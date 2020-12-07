import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
export const alertMessage = (title, message) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "OK",
      },
    ],
  });
};
