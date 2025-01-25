import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import "../Styles/StudentsPage.css";
import AddStudent from "../Components/AddStudent";
import EditModal from "../Components/EditModal";
import { db, collection, doc, onSnapshot, deleteDoc } from "../FirebaseConnect";

export default function StudentPage() {
  const columns = [
    {
      field: "studentId",
      headerName: "Student-College ID",
      width: 150,
      editable: false,
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      editable: true,
    },
    {
      field: "fatherName",
      headerName: "Father's Name",
      type: "text",
      width: 110,
      editable: true,
    },
    {
      field: "mothersName",
      headerName: "Mother's name",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      type: "string",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "text",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "enrollmentDate",
      headerName: "Enrollment Date",
      type: "string",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "numberOfBacklogs",
      headerName: "Number of Backlogs",
      type: "number",
      sortable: false,
      width: 160,
      editable: true,
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (rowData) => {
        return (
          <>
            <IconButton
              onClick={() => {
                console.log(" edit data -", rowData.row);
                handleEditModal(rowData.row);
              }}
              color="primary"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                console.log("Student  to delete -", rowData.row.studentId);
                handleDelete(rowData.row.studentId);
              }}
              color="primary"
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const collecttionRef = collection(db, "students");
        const unsubscribe = onSnapshot(collecttionRef, (snapshot) => {
          const studentData = snapshot.docs.map((doc) => ({
            id: doc.id, // Firestore document ID as unique key
            ...doc.data(), // Document data
          }));
          console.log("Student data in unsubscribe method - ", studentData);
          setStudents(studentData); // Update state with real-time data
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchStudentData();
  }, []);

  const [open, setOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});
  const handleOpen = () => setOpen(true);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModal = (rowData) => {
    setOpenEditModal(true);
    console.log("row data to edit - ", rowData);
    setCurrentRowData(rowData);
  };

  const handleDelete = async (studentId) => {
    try {
      const docRef = doc(db, "students", studentId);
      await deleteDoc(docRef);
      alert("Student record deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="students">
      <h1>Student Page</h1>
      <div className="add-student">
        <Button
          variant="contained"
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => {
            console.log("Add new student button clicked");
            handleOpen();
          }}
        >
          Add Student
        </Button>
        <AddStudent open={open} onClose={() => setOpen(false)} />
        <EditModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          currentData={currentRowData}
        />
      </div>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row.studentId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>{" "}
    </div>
  );
}
