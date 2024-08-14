import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CommentForm() {
    const [text, setText] = useState('');
    // const [authorName, setAuthorName] = useState('');
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://127.0.0.1:5000/blog/post/comment/${postId}`, 
                { author_id : user["id"], author_name : user["name"], text : text }, 
                {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                withCredentials: true 
            });
            navigate(`/blog/post/${postId}`);
        } catch(err) {
            console.log(err)
        }
        
    }

    return (
        <Container className="d-flex flex-column align-items-center mt-5" >
            <Row className="d-flex justify-content-center align-items-center w-50">
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3 fw-bold text-light" controlId="formBasicComment">
                        <Form.Label>Text for Comment</Form.Label>
                        <Form.Control type="text" name="comment_text" value={text} as="textarea" rows={5} 
                        onChange={handleInputChange} placeholder="Enter text" />
                    </Form.Group>

                    <Button className="w-10" variant="primary" type="submit">
                    Submit
                    </Button>

                </Form>
            </Row>

           
            
        </Container>
    );
}

export default CommentForm;