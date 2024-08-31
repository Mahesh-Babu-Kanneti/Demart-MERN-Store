import React, { useState } from 'react';
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import toast,{Toaster} from 'react-hot-toast';


import loginImg from "./Assets/loginImg.svg";
import { IoCloseSharp } from "react-icons/io5";






const RegisterModal = ({ show, handleClose,handleLoginShow }) => {

    const [prevImage,setPrevImage] = React.useState('')
    // const [profImage,setProfImage] = React.useState(null)

    const [registerUser,setUserRegister] = React.useState({
        username:'',
        email:'',
        mobile:'',
        password:'',
        confirmPassword:''
    })

    const changeHandler = (e) =>{
        setUserRegister({...registerUser,[e.target.name]:e.target.value});
    }


    const imageHandler = (e) =>{
        // setProfImage(e.target.files[0]);
        // setPrevImage(URL.createObjectURL(e.target.files[0]));

        //Convert upload images to base64...
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load',()=>{
            setPrevImage(reader.result)
        })
            reader.readAsDataURL(file)


    }


    const submitHandler = async(e) =>{
        e.preventDefault();

        //Basic Validation for register users...
        if(username=='' || email=='' || mobile=='' || password=='' || confirmPassword=='' || prevImage==''){
            return toast.error('Please Enter valid Inputs')
        }
        else if(email.slice(-10)!=='@gmail.com'){
            return toast.error('Please Enter valid Email Id')
        }
        else if(mobile.charAt(0)!=='9'){
            return toast.error('Please Enter valid Mobile Number')
        }

        // console.log(registerUser,"registerUser")


        //POSTING Image to API...
        // let formData = new FormData();
        // formData.append('image', profImage);


        try{

            let registerPayload = {
                userName:username,
                userEmail:email,
                userMobile:mobile,
                userProfile:prevImage,
                userPassword:password,
                userConfirmpassword:confirmPassword
                
            }



            let userRegister = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`,registerPayload,{
                headers:{
                    "method":'POST',
                    'Content-Type':'application/json'
                }
            }).then(res=>toast.success(res.data.message)).catch(err=>toast.error(err.response.data.message))

        }
        catch(err){
            throw err;
        }



                //Reset the FORM...
        setUserRegister({
            username:'',
            email:'',
            mobile:'',
            password:'',
            confirmPassword:''
        })

        setPrevImage('')

    }




    const {username,email,mobile,password,confirmPassword} = registerUser;


    return (
        <>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />


        <Modal show={show} onHide={handleClose} animation={false} centered size='lg'>  

        <Container>
              <Row> 
                <Col> <Image src={loginImg}/>  </Col>
                <Col style={{borderLeft:'1px solid #9e9e9e'}}>
                    <Card style={{background:'transparent',margin:'10px',border:'none'}}>
                            <Card.Header style={{padding:'5px',textAlign:'center', background:'transparent'}}> Let’s Get Register Your Account                  <IoCloseSharp  style={{cursor:"pointer",fontSize:'25px',color:"aliceblue",position:'relative',left:"120px"}} onClick={handleClose}/>      </Card.Header>  
                                <Card.Body>
                                    <Form autoComplete='off'>
                                              <div style={{margin:"auto",width:"25%", padding:'0px'}}>
                                                        <Stack>
                                                          <Avatar src={prevImage} style={{cursor:"pointer",width:"80px",height:"80px",border:'1px solid grey'}}/>
                                                          
                                                        </Stack>
                                                        <input accept="image/*" style={{width:'70px',fontSize:'10px'}} type="file" title='Upload Profile' onChange={imageHandler}/>
                        
                                              </div>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                          <Form.Label className='form-label'>User Name* </Form.Label>
                                          <Form.Control type="text"  maxLength={20} onChange={changeHandler} name='username' value={username}/>
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                          <Form.Label className='form-label'>Email* </Form.Label>
                                          <Form.Control type="email" onChange={changeHandler} name='email' value={email}/>
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                          <Form.Label className='form-label'>Mobile* </Form.Label>
                                          <Form.Control type="number" onChange={changeHandler} name='mobile' value={mobile}/>
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                          <Form.Label className='form-label'>Password* </Form.Label>
                                          <Form.Control type="password" onChange={changeHandler} name='password' value={password}/>
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                          <Form.Label className='form-label'>Confirm Password* </Form.Label>
                                          <Form.Control type="password"  onChange={changeHandler} name='confirmPassword' value={confirmPassword}/>
                                        </Form.Group>

                                        <br/>
                                          
                                        <Button className='login-button' onClick={submitHandler}> REGISTER </Button>
        
                                      </Form>
                                      <p style={{fontSize:"12px",marginTop:'8px'}}> Already have your account? <span style={{cursor:"pointer",color:"green" ,fontSize:'14px'}} onClick={handleLoginShow}>  Login here </span> </p>
                            </Card.Body>
                        </Card>
                </Col>
              </Row>
        </Container>
        
            
              </Modal>
</>
    );
  };

  export default RegisterModal;