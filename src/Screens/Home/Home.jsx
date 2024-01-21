import { Button, Input, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { DB } from "../../Config/FireBase/FireBase";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Home = () => {
  // const auth = getAuth()
  // console.log(auth) 
    const Navigate = useNavigate();
  const [addToDoHandeler, SetaddToDoHandeler] = useState("");
  const [getUserData, setgetUserData] = useState([]);
  const [refresh, setrefresh] = useState(true);
  // console.log(addToDoHandeler);
  //add toDo & send to dataBase
  const addToDo = async (e) => {
    //FUNCTION HITT KY BD INPUT KHALI NI HO RHA
    const allToDo = {
      todo: addToDoHandeler,
    };
    try {
      const toDoRef = await addDoc(collection(DB, "ToDo's"), allToDo);
      // console.log(toDoRef, "Send toDoRef");
      setrefresh(!refresh);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getTodo();
  }, [refresh]);
  //get data from dataBase
  const getTodo = async () => {
    const getDataArr = [];
    try {
      const toDoSnap = await getDocs(collection(DB, "ToDo's"));
      toDoSnap.forEach((data) => {
        // console.log(data.data());
        getDataArr.push({ ...data.data(), id: data.id });
        setgetUserData([...getDataArr]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //single toDo edit
  const editToDo = (e) => {
    try {
      const updatedValue = prompt("Enter Update");
      const obj = {
        todo: updatedValue,
      };
      // console.log(updatedValue);
      updateDoc(doc(DB, "ToDo's", e), obj);
      setrefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };
  //single toDo delete
  const deleteToDo = async (e) => {
    try {
      await deleteDoc(doc(DB, "ToDo's", e));
      setrefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };
  //DELETE ALL NOT WORKING
  // const deleteAll = async (e) => {
  //   try {
  //     await deleteDoc(doc(DB, "ToDo's", e));
  //     setrefresh(!refresh);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const signOut = () => {
    Navigate("/");
  };
  return (
    <>
      <Stack>
        <Button onClick={signOut}>Sign Out</Button>
      </Stack>

      {/* Add todo */}
      <Stack>
        <Stack
          sx={{
            margin: "auto",
            flexDirection: "row",
            border: "2px solid black",
            borderRadius: "10px",
            width: "450px",
          }}
        >
          <Input
            onChange={(e) => SetaddToDoHandeler(e.target.value)}
            placeholder="Enter To Do"
            sx={{
              padding: "15px",
              width: "300px",
            }}
          ></Input>
          <Stack
            sx={{
              flexDirection: "row",
              width: "200px",
            }}
          >
            <Button onClick={addToDo}>Add</Button>
            <Button>Delete All</Button>
          </Stack>
        </Stack>
      </Stack>
      {/* to do list */}
      <Stack
        sx={{
          marginTop: "10px",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
          }}
        >
          <Stack
            sx={{
              background: "aqua",
              borderRadius: "30px",
              margin: "5px",
              minWidth: "200px",
              width: "fit-content",
            }}
          >
            <ol>
              {getUserData.map((e, i) => {
                // console.log(i, "id");
                return (
                  <>
                    <li key={i}>
                      {e.todo}{" "}
                      <Button onClick={() => editToDo(e.id)}>Edit</Button>
                      <Button onClick={() => deleteToDo(e.id)}>Delete</Button>
                    </li>
                  </>
                );
              })}
            </ol>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
