import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { db, collection, updateDoc, doc } from "../FirebaseConnect";

const EditStudent = ({ open, onClose, currentData }) => {
  console.log("currentData : ", currentData);
  const [student, setStudent] = useState({
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
    numberOfBacklogs: 0,
  });

  useEffect(() => {
    if (currentData) {
      setStudent({
        studentId: currentData.studentId,
        firstName: currentData.firstName,
        lastName: currentData.lastName,
        fathersName: currentData.fathersName,
        mothersName: currentData.mothersName,
        email: currentData.email,
        phone: currentData.phone,
        dateOfBirth: currentData.dateOfBirth,
        gender: currentData.gender,
        courseEnrolled: currentData.courseEnrolled,
        enrollmentDate: currentData.enrollmentDate,
        numberOfBacklogs: currentData.numberOfBacklogs,
      });
    }
  }, [currentData]); // Re-run when currentData changes

  console.log("student : ", student);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (student.studentId === "") {
      alert("Student ID is required");
      return;
    }

    try {
      const collectionRef = collection(db, "students");
      const docRef = doc(collectionRef, student.studentId);
      console.log("docRef : ", docRef.id);
      await updateDoc(docRef, student);
      console.log("name : ", student.name, "age : ", student.age);

      // Close the dialog
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="studentId"
          label="Student-College Id"
          type="number"
          fullWidth
          variant="standard"
          value={student.studentId}
          disabled
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;
