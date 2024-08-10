import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function CreateBlogPost() {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title : "",
        subtitle : "",
        date : "",
        body : "",
        imgURL : ""
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/blog/create-post', 
                {
                title : formData.title, subtitle : formData.subtitle, 
                date : formData.date, body : formData.body, imgURL : formData.imgURL, user : user
                }, 
                {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                withCredentials: true 
            });
        } catch(err) {
            
        }

    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <Row className="text-light mt-3 h3 mb-3">
                <Col>
                    Create New Blog Post
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleFormSubmit} className="d-flex flex-column align-items-center justify-content-center">
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label className="text-light h6">Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter post title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSubtitle">
                            <Form.Label className="text-light h6">Subtitle</Form.Label>
                            <Form.Control type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="Enter post subtitle" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label className="text-light h6">Date</Form.Label>
                            <Form.Control type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="Enter date YYYY-MM-DD" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBody">
                            <Form.Label className="text-light h6">Body</Form.Label>
                            <Form.Control type="text" name="body" value={formData.body} onChange={handleInputChange} placeholder="Enter post body" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImg">
                            <Form.Label className="text-light h6">Img URL</Form.Label>
                            <Form.Control type="text" name="imgURL" value={formData.imgURL} onChange={handleInputChange} placeholder="Enter img URL" />
                        </Form.Group>

                        <Button variant="primary" type="submit" onSubmit={handleFormSubmit}>
                        Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateBlogPost;