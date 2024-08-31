import React, { useState } from 'react';
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Avatar from '@mui/material/Avatar';
import toast,{Toaster} from 'react-hot-toast';


import loginImg from "./Assets/loginImg.svg";
import { IoCloseSharp } from "react-icons/io5";





const LoginModal = ({ show, handleClose,handleRegisterShow }) => {

    const [loginUser,setUserLogin] = React.useState({
        mobile:'',
        password:'',
    })



    const changeHandler = (e) =>{
        setUserLogin({...loginUser,[e.target.name]:e.target.value});
    }


    const submitHandler = async(e) =>{

        //Basic Validation for register users...
        if(mobile=='' || password==''){
            return toast.error('Please Enter valid Inputs')
        }
        else if(mobile.charAt(0)!=='9'){
            return toast.error('Please Enter valid Mobile Number')
        }



        try{

            let loginPayload = {
                userMobile:mobile,
                userPassword:password    
            }

            // console.log(loginPayload)

            let userLogin = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,loginPayload,{
                headers:{
                    "method":'POST',
                    'Content-Type':'application/json'
                }
            }).then(res=>{localStorage.setItem('token',res.data.token);toast.success(res.data.message);setTimeout(()=>{window.location.reload()},3000)}).catch(err=>toast.error(err.response.data.message))

        }
        catch(err){
            throw err;
        }



                //Reset the FORM...
        setUserLogin({
            mobile:'',
            password:'',
        })


    }



    const {mobile,password} = loginUser;




    return (
        <>
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                />



        <Modal show={localStorage.getItem('token')?null:show} onHide={handleClose} animation={false} centered size='lg'>

        <Container>
              <Row>
                <Col> <Image src={loginImg}/>  </Col>
                <Col style={{borderLeft:'1px solid #9e9e9e'}}>
                    <Card style={{background:'transparent',margin:'8px',border:'none'}}>
                            <Card.Header style={{padding:"5px",textAlign:'center', background:'transparent'}}> Let’s Get You Logged In      <IoCloseSharp  style={{cursor:"pointer",fontSize:'25px',color:"aliceblue",position:'relative',left:"150px"}} onClick={handleClose}/>   </Card.Header>
                                <Card.Body>
                                    <Form autoComplete='off'>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                          <Form.Label className='form-label'>Mobile* </Form.Label>
                                          <Form.Control type="number" onChange={changeHandler} name='mobile' value={mobile}/>
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                          <Form.Label className='form-label'>Password* </Form.Label>
                                          <Form.Control type="password" onChange={changeHandler} name='password' value={password}/>
                                        </Form.Group>

                                        <br/><br/>
                                          
                                        <Button className='login-button' onClick={submitHandler}> LOGIN </Button>
        
                                      </Form>
                                      <p style={{fontSize:"12px",marginTop:'8px'}}> Don't have an account? <span style={{cursor:"pointer",color:"green" ,fontSize:'14px'}} onClick={handleRegisterShow}>  Register here </span> </p>
                            </Card.Body>
                        </Card>
                </Col>
              </Row>
        </Container>
        
            
              </Modal>
        </>
    );
  };


  export default LoginModal;