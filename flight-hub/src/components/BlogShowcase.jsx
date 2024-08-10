import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';

function BlogShowcase() {
    const [posts, setPosts] = useState([]);

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
        if (posts.length > 0) {
            console.log(posts);
        }
    }, [posts]);

    const showAllPosts = posts.map(post => {
        return (
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={post["img_url"]} 
                    style={{maxHeight: "180px", maxWidth:"286px"}}/>
                    <Card.Body>
                        <Card.Title>{post["title"]}</Card.Title>
                        <Card.Text>
                        {post["subtitle"]}
                        </Card.Text>
                        <Button variant="primary">Go to post</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
        <Container className="d-flex align-items-center justify-content-center " >
            <Row>
                {/* <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://img.freepik.com/free-vector/saguaro-cactus-plant-white-background_1308-78292.jpg" 
                        style={{maxHeight: "180px", maxWidth:"180px"}}/>
                        <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go to post</Button>
                        </Card.Body>
                    </Card>
                </Col> */}
                {showAllPosts}
            
            </Row>
        
    </Container>
    )
}

export default BlogShowcase;