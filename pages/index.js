import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Navbar, Nav, Dropdown, Accordion } from 'react-bootstrap';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { FaNewspaper } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherIcon = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <WiDaySunny size={50} />;
    case 'rain':
      return <WiRain size={50} />;
    case 'cloudy':
      return <WiCloudy size={50} />;
    case 'snow':
      return <WiSnow size={50} />;
    case 'thunder':
      return <WiThunderstorm size={50} />;
    default:
      return <WiDaySunny size={50} />;
  }
};

const Article = ({ title, content, index }) => (
  <Accordion.Item eventKey={index.toString()}>
    <Accordion.Header>
      <FaNewspaper className="me-2" />
      {title}
    </Accordion.Header>
    <Accordion.Body>{content}</Accordion.Body>
  </Accordion.Item>
);

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const API_KEY = '94151e87af7a449bb94110050241809';
  const API_URL = `https://api.weatherapi.com/v1/current.json`;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error('Kota tidak ditemukan');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const articles = [
    { title: "Cara Menghadapi Cuaca Ekstrem", content: "Cuaca ekstrem dapat muncul tiba-tiba. Berikut tips menghadapinya: 1. Selalu pantau prakiraan cuaca. 2. Siapkan tas darurat. 3. Kenali tempat berlindung terdekat. 4. Pastikan alat komunikasi selalu terisi daya." },
    { title: "Pengaruh Cuaca pada Kesehatan", content: "Perubahan cuaca dapat mempengaruhi kesehatan kita. Beberapa efeknya meliputi: 1. Perubahan tekanan udara dapat memicu sakit kepala. 2. Cuaca dingin meningkatkan risiko flu. 3. Panas ekstrem dapat menyebabkan dehidrasi. 4. Kelembaban tinggi mempengaruhi penyakit pernapasan." },
    { title: "Ramalan Cuaca: Seberapa Akurat?", content: "Teknologi ramalan cuaca terus berkembang. Saat ini, prakiraan cuaca jangka pendek (1-3 hari) memiliki akurasi sekitar 90%. Prakiraan jangka menengah (4-7 hari) akurasinya sekitar 80%. Untuk jangka panjang, akurasi menurun hingga 50% atau kurang." },
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">WeatherApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#forecast">Forecast</Nav.Link>
              <Nav.Link href="#articles">Articles</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-lg">
              <Card.Body className="p-5">
                <h1 className="text-center mb-4 text-primary">Weather Forecast</h1>
                <Form onSubmit={fetchWeather}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Get Weather'}
                  </Button>
                </Form>

                {error && <p className="text-danger mt-3 text-center">{error}</p>}

                {weather && (
                  <Card className="mt-4 border-0 bg-primary text-white">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h2 className="mb-0">{weather.location.name}</h2>
                          <p className="text-white-50">{weather.location.country}</p>
                        </div>
                        <WeatherIcon condition={weather.current.condition.text} />
                      </div>
                      <div className="mt-4">
                        <h1 className="display-3 mb-0">{weather.current.temp_c}°C</h1>
                        <p className="lead">{weather.current.condition.text}</p>
                      </div>
                      <Row className="mt-4 text-center">
                        <Col>
                          <p className="mb-0">Humidity</p>
                          <h4>{weather.current.humidity}%</h4>
                        </Col>
                        <Col>
                          <p className="mb-0">Wind</p>
                          <h4>{weather.current.wind_kph} km/h</h4>
                        </Col>
                        <Col>
                          <p className="mb-0">Feels Like</p>
                          <h4>{weather.current.feelslike_c}°C</h4>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="shadow-lg border-0 rounded-lg">
              <Card.Body>
                <h2 className="text-center mb-4">Weather Articles</h2>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle variant="primary" id="dropdown-articles">
                    Select an Article
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {articles.map((article, index) => (
                      <Dropdown.Item key={index} onClick={() => setSelectedArticle(index)}>
                        {article.title}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {selectedArticle !== null && (
                  <Card>
                    <Card.Body>
                      <Card.Title>{articles[selectedArticle].title}</Card.Title>
                      <Card.Text>{articles[selectedArticle].content}</Card.Text>
                    </Card.Body>
                  </Card>
                )}
                <Accordion className="mt-4">
                  {articles.map((article, index) => (
                    <Article key={index} title={article.title} content={article.content} index={index} />
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}