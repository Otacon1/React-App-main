import './App.css';
import 'antd/dist/reset.css';
import {Table , Button , Modal, Input} from "antd";
import {useState , useEffect} from 'react';
import {EditOutlined , DeleteOutlined} from '@ant-design/icons';
import React from 'react';
import Webcam from "react-webcam";
import {useRef} from 'react'


function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [currLocationJs , setCurrLocationJs] = useState({});
  const webRef = useRef(null)
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

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent =  {  
      id: randomNumber,
      name: 'Name ' + randomNumber,
      email: randomNumber + '@gmail.com',
      address: 'Address ' + randomNumber,
    };

      setDataSource((pre) => {
        return[...pre, newStudent];
      });
  };

  const onDeleteStudent = (record) => {
    setDataSource(pre => {
     return pre.filter(student => student.id !== record.id);
    });
  }

  const EditStudent = (record) => {
      setIsEditing(true)
      setEditingStudent({...record})
  }

  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  }

  const showImage = () => {
    console.log(webRef.current);
  }

 useEffect(() => {
    getLocationJs();
  }, []);

  const getLocationJs = () => {
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
