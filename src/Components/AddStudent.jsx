import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getDoc, db, doc, setDoc } from "../FirebaseConnect";

const AddStudent = ({ open, onClose }) => {
  const initialStudentState = {
    studentId: "",
    firstName: "",
    lastName: "",
    fathersName: "",
    mothersName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    courseEnrolled: "",
    enrollmentDate: "",
    numberOfBacklogs: "",
  };
  const [student, setStudent] = useState(initialStudentState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = doc(db, "students", student.studentId);

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        throw new Error("A student with this Student ID already exists.");
      }

      await setDoc(docRef, student);
      console.log("new Data object ", docRef);
      setStudent(initialStudentState);
      // Close the dialog
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
      alert("a student with this ID already exists");
      console.error("Error adding document: ", errorMessage);
      // Handle errors (e.g., display an error message to the user)
      handleCancel();
    }
  };
  const handleCancel = () => {
    setStudent(initialStudentState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="studentId"
          label="Student-College Id"
          type="number"
          fullWidth
          variant="standard"
          value={student.studentId}
          onChange={(e) =>
            setStudent({ ...student, studentId: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          value={student.firstName}
          onChange={(e) =>
            setStudent({ ...student, firstName: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          value={student.lastName}
          onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
        />
        <TextField
          margin="dense"
          id="fathersName"
          label="Father's Name"
          type="text"
          fullWidth
          variant="standard"
          value={student.fathersName}
          onChange={(e) =>
            setStudent({ ...student, fathersName: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="mothersName"
          label="Mother's Name"
          type="text"
          fullWidth
          variant="standard"
          value={student.mothersName}
          onChange={(e) =>
            setStudent({ ...student, mothersName: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
        />
        <TextField
          margin="dense"
          id="phone"
          label="Phone Number"
          type="number"
          fullWidth
          variant="standard"
          value={student.phone}
          onChange={(e) => setStudent({ ...student, phone: e.target.value })}
        />
        <TextField
          margin="dense"
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          fullWidth
          variant="standard"
          value={student.dateOfBirth}
          onChange={(e) =>
            setStudent({ ...student, dateOfBirth: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="gender"
          label="Gender"
          type="text"
          fullWidth
          variant="standard"
          value={student.gender}
          onChange={(e) => setStudent({ ...student, gender: e.target.value })}
        />
        <TextField
          margin="dense"
          id="courseEnrolled"
          label="Course Enrolled"
          type="text"
          fullWidth
          variant="standard"
          value={student.courseEnrolled}
          onChange={(e) =>
            setStudent({ ...student, courseEnrolled: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="enrollmentDate"
          label="Enrollment Date"
          type="text"
          fullWidth
          variant="standard"
          value={student.enrollmentDate}
          onChange={(e) =>
            setStudent({ ...student, enrollmentDate: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="numberOfBacklogs"
          label="Number of Backlogs"
          type="number"
          fullWidth
          variant="standard"
          value={student.numberOfBacklogs}
          onChange={(e) =>
            setStudent({ ...student, numberOfBacklogs: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudent;
