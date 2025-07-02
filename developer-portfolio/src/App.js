import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Your Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section id="home" className="hero-section d-flex align-items-center justify-content-center text-center text-white">
        <Container>
          <Row>
            <Col>
              <img src="https://via.placeholder.com/150" alt="Your Photo" className="rounded-circle mb-3" />
              <h1>Hi, I'm Your Name</h1>
              <p className="lead">A passionate developer building awesome web applications.</p>
              <Button variant="primary" size="lg" href="#projects">View My Work</Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section py-5">
        <Container>
          <h2 className="text-center mb-4">About Me</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Another paragraph about your journey, interests, and what drives you in development.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Skills</h2>
          <Row className="text-center">
            <Col md={4} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Frontend</Card.Title>
                  <Card.Text>React, JavaScript, HTML, CSS, Bootstrap</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Backend</Card.Title>
                  <Card.Text>Node.js, Python, Express, FastAPI</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Tools & Others</Card.Title>
                  <Card.Text>Git, Docker, SQL, NoSQL</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section py-5">
        <Container>
          <h2 className="text-center mb-4">Projects</h2>
          <Row>
            <Col md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
                <Card.Body>
                  <Card.Title>Project One</Card.Title>
                  <Card.Text>A brief description of Project One, highlighting its key features and technologies used.</Card.Text>
                  <Button variant="primary" className="me-2">Live Demo</Button>
                  <Button variant="secondary">GitHub</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
                <Card.Body>
                  <Card.Title>Project Two</Card.Title>
                  <Card.Text>A brief description of Project Two, highlighting its key features and technologies used.</Card.Text>
                  <Button variant="primary" className="me-2">Live Demo</Button>
                  <Button variant="secondary">GitHub</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
                <Card.Body>
                  <Card.Title>Project Three</Card.Title>
                  <Card.Text>A brief description of Project Three, highlighting its key features and technologies used.</Card.Text>
                  <Button variant="primary" className="me-2">Live Demo</Button>
                  <Button variant="secondary">GitHub</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-5 bg-dark text-white">
        <Container>
          <h2 className="text-center mb-4">Contact Me</h2>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <p>Feel free to reach out to me!</p>
              <p>Email: <a href="mailto:your.email@example.com" className="text-white">your.email@example.com</a></p>
              <p>LinkedIn: <a href="#" className="text-white">linkedin.com/in/yourprofile</a></p>
              <p>GitHub: <a href="#" className="text-white">github.com/yourprofile</a></p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer py-3 bg-dark text-white-50 text-center">
        <Container>
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;