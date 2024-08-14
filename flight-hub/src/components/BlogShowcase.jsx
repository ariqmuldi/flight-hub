import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function BlogShowcase() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/blog');
                setPosts(Object.values(response.data.posts));
            } catch (err) {
                console.error('Error fetching blog posts:', err);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        if (posts.length > 0) { }
    }, [posts]);

    const handleClickNewPost = () => {
        navigate("/blog/create-post");
    }

    const handleClickGoToPost = (postId) => {
        navigate(`/blog/post/${postId}`);
    }

    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/blog/delete-post/${postId}`);
        }
        catch (err) {
            console.log(err)
        }
        location.reload()
    }

    const showAllPosts = posts.map((post, index) => {
        return (
            <Col key={index} className="mb-4">
                <Card className="h-100" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={post["img_url"]} 
                    style={{maxHeight: "180px", maxWidth:"286px", objectFit: "cover"}}/>
                    <Card.Body>
                        <Card.Title>{post["title"]}</Card.Title>
                        <Card.Text>
                        {post["subtitle"]}
                        </Card.Text>
                        <Container className="d-flex align-items-center justify-content-evenly">
                            <Button variant="primary" onClick={() => handleClickGoToPost(index + 1)}>Go to post</Button>
                            { (user && user["id"] != null && user["id"] == 3) ?
                            <Button className="mr-2" variant="danger" onClick={() => handleDeletePost(index + 1)}>✖</Button>
                            :
                            null
                            }
                        </Container>
                        
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
        <Container className="d-flex flex-column align-items-center">
            <Row className="mt-4 mb-4">
                <Col className="text-center">
                    { user === null ?
                    <Button className="newPostButton" variant="primary" type="submit">
                    Login to Post
                    </Button>
                    :
                    <Button className="newPostButton" variant="primary" type="submit" onClick={handleClickNewPost}>
                        + New Post
                    </Button>
                    }
                </Col>
            </Row>

            <Row className="">
                {showAllPosts}
            </Row>
        
    </Container>
    )
}

export default BlogShowcase;