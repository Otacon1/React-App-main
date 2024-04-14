// Importing necessary styles and components
import './App.css';
import 'antd/dist/reset.css';
import {Table , Button , Modal, Input} from "antd";
import {useState , useEffect} from 'react';
import {EditOutlined , DeleteOutlined} from '@ant-design/icons';
import React from 'react';
import Webcam from "react-webcam";
import {useRef} from 'react'

// Define the main function component
function App() {
  // State variables for managing editing mode, current editing student, webcam reference, and current location
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [currLocationJs , setCurrLocationJs] = useState({});
  const webRef = useRef(null)
   // State variable for managing student data
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      address: 'Barrhead Glasgow'
    },
    {
      id: 2,
      name: 'Karen',
      email: 'kaz@gmail.com',
      address: '10 Fenwick Drive'
    },
    {
      id: 3,
      name: 'Sam',
      email: 'sam@hotmail.com',
      address: '6 Gorse Drive'
    },
    {
      id: 4,
      name: 'Tam',
      email: 'tam@gmail.com',
      address: '11 Newton Avenue'
    }
  ])
    // Define columns for the table
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: '4',
      title: 'Address',
      dataIndex: 'address'
    },
    {
      key: '5',
      title: 'Actions',
      render:(record) => {
        return (
        <>
        
         <EditOutlined onClick={() => {
            EditStudent(record)
         }}/>
         <DeleteOutlined onClick={() => {
          onDeleteStudent(record)
         }} style={{ color: "red", marginLeft: 12 }}/>

        </>
        );
      }
    }
  ]
 // Function to add a new student
  const onAddStudent = () => {
  // Generate a random ID for the new student
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent =  {  
      id: randomNumber,
      name: 'Name ' + randomNumber,
      email: randomNumber + '@gmail.com',
      address: 'Address ' + randomNumber,
    };
  // Update the student data source with the new student
      setDataSource((pre) => {
        return[...pre, newStudent];
      });
  };
 // Function to delete a student
  const onDeleteStudent = (record) => {
    // Remove the student from the data source based on ID
    setDataSource(pre => {
     return pre.filter(student => student.id !== record.id);
    });
  }
// Function to initiate editing mode for a student
  const EditStudent = (record) => {
      setIsEditing(true)
      setEditingStudent({...record})
  }
// Function to reset editing mode and editing student
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  }
// Function to show image info in console using webcam reference
  const showImage = () => {
    console.log(webRef.current);
  }
// Hook to fetch current geolocation once on component mount
 useEffect(() => {
    getLocationJs();
  }, []);
// Function to get current geolocation using browser's navigator API
  const getLocationJs = () => {
    // Extract latitude and longitude from geolocation data
    navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);  
    const { latitude , longitude } = position.coords;
    setCurrLocationJs({ latitude, longitude });
  });
  
  }


  /////////////*************************************  MAIN CONTENT OF APP  ********************************************//////////////////////////////////
  return (
    <div className="App">
      <header className="App-header">
        <Button type='primary' onClick={onAddStudent}>Add a new Student</Button>
        <br></br>
        <Table
         columns={columns}
         dataSource={dataSource}
        > 
        </Table>

        React Webcam
      <Webcam ref={webRef}/>
      <button type="submit" id="btn" onClick={() => {
      showImage()}}>Show Image Info in Console</button>

        <Modal
          title='Edit Student'
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}

          onOk={()=>{
            setDataSource(pre=>{
              return pre.map(student=>{
                if(student.id === editingStudent.id){
                  return editingStudent;
                }else {
                  return student;
                }
              });
            });
            resetEditing()
        }}
        >
          <Input value={editingStudent?.name} onChange={(e)=>{
            setEditingStudent(pre=>{
              return{...pre, name:e.target.value}
            })
          }}/>
          <Input value={editingStudent?.email} onChange={(e)=>{
            setEditingStudent(pre=>{
              return{...pre, email:e.target.value}
            })
          }}/>
          <Input value={editingStudent?.address} onChange={(e)=>{
            setEditingStudent(pre=>{
              return{...pre, address:e.target.value}
            })
          }}/>
        
        </Modal>
        <br></br>
        <h2>Your Current Location</h2>
        <p>Latitude: {currLocationJs.latitude}</p>
        <p>Longitude: {currLocationJs.longitude}</p>
    
      </header>
     
    </div>
  );
}

export default App;
