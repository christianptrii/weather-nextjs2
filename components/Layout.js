import React from 'react';
import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from '../styles/globals.module.css';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.cloud1}></div>
    <div className={styles.cloud2}></div>
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} href="/">WeatherApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/forecast">Forecast</Nav.Link>
            <Nav.Link as={Link} href="/articles">Articles</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <main>{children}</main>
  </div>
);

export default Layout;