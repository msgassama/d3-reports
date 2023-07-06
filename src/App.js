import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import BarChart from './components/BarChart';
import { DATA, DATA_BY_CATEGORY } from './data/Data'
import MultiSeriesLineChart from './components/MultiSeriesLineChart';

function App() {
  return (
    <Container className='mt-4'>
      {/* <Row>
        <Col className='col-md-8 offset-md-4'>
          <BarChart data={DATA} />
        </Col>
      </Row> */}
      <Row>
        <Col className='col-md-8 offset-md-4'>
          <MultiSeriesLineChart data={DATA_BY_CATEGORY} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
