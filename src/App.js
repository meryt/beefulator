import React, { Component } from 'react';
import './App.css';
import BeefulatorForm from './BeefulatorForm.js';
import {  Col,
          Container,
          Row } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p className="logo-image"><img src="gsd4.png" alt="The Beefulator"/></p>
          </Col>
          <Col className="App-header">
            <header className="App-header">
              <h1 className="App-title">the beefulator</h1>
            </header>
          </Col>
        </Row>

        <Row>
          <Col>
            <BeefulatorForm/>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default App;
