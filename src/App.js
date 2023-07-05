import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import BarChart from './components/BarChart';
import { DATA } from './data/Data'

function App() {
  return (
    <Container className='mt-4'>
      <Row>
        <Col className='col-md-8 offset-md-4'>
          <BarChart data={DATA} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
