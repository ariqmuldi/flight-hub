import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/esm/Col';
import { AuthContext } from '../context/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';


function Posts() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [author, setAuthor] = useState("");
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/blog/post/comment/${postId}`);
                setComments(Object.values(response.data.comments))
            } catch (err) {
                console.error('Error fetching blog post:', err);
            }
        };

        fetchComments();
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        if (Object.keys(comments).length > 0) { 
            console.log(comments) 
        }
    }, [comments]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/blog/post/${postId}`);
                setPost(response.data.post)
            } catch (err) {
                console.error('Error fetching blog post:', err);
            }
        };

        fetchPost();
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        if (Object.keys(post).length > 0) { 
            console.log(post) 
            const fetchAuthorName = async () => {
                try {
                    const response = await axios.post('http://127.0.0.1:5000/get-user-by-id', 
                        { id : post["author_id"]}, 
                        {
                        headers: {
                            'Content-Type': 'application/json', // Set the content type to JSON
                        },
                        withCredentials: true 
                    });
                    setAuthor(response.data.user)
                } catch(err) {

                }
               
            }
            fetchAuthorName();

        }
    }, [post]);
    
    const handleFormSubmit = async (e) => {
        navigate(`/blog/edit-post/${postId}`);
    }

    const handleCommentFormSubmit = async (e) => {
        navigate(`/blog/post/comment/${postId}`);
    }

    const showAllComments = comments.map((comment, index) => {
        return(
            <Col key={index}>
                <Container className="d-flex flex-column align-items-center justify-content-center text-light">
                    <p className="fw-bold"> By {comment["author_name"]}: <span className="fw-normal">{comment["text"]}</span> </p> 
                    
                </Container>
            </Col>
        )
    })

    return (
        <Container className="d-flex flex-column align-items-center">
            { (user && user["id"] != null && user["id"] == author["id"]) ?
            <Form className="mt-3" onSubmit={handleFormSubmit}>
                <Button variant="primary" type="submit">
                Edit Post
                </Button>
            </Form>
            :
            null
            }
            <Row className="d-flex align-items-center mb-5">
                <Col className="d-flex justify-content-center">
                    <Image src={post["img_url"]} style={{maxHeight: "250px", maxWidth:"500px"}} fluid />
                    
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center text-center">
                    <p className="h1 text-light">{post["title"]}</p>
                    <p className="h5 text-light">{post["subtitle"]}</p>
                </Col>   
                <Col className="d-flex flex-column text-light justify-content-center align-items-center text-center">  
                    <p> By: {author["name"]}</p>
                    <p> Created on: {post["date"]}</p>
                </Col>   
            </Row>

            <Row className="d-flex align-items-center mb-5">
                <Col className="d-flex flex-column text-light justify-content-center align-items-center text-center">  
                    <p style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{post["body"]}</p>
                </Col>
            </Row>

            <Row>
                {(user && user["id"] != null) ?
                <Form className="mt-5" onSubmit={handleCommentFormSubmit}>
                    <Button variant="primary" type="submit">
                    Comment
                    </Button>
                </Form>
                :
                <Button className="mt-5" variant="primary" type="submit" onClick={() => {navigate("/login")}}>
                    Login to Comment
                </Button>
                }
            </Row>
            

            <Row className="mt-3 d-flex flex-column align-items-center justify-content-center text-center">
                <Col className="h4 text-light">
                Comments:
                </Col>

                {showAllComments}
            </Row>

        </Container>

        
    );
}

export default Posts;