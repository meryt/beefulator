import React, { Component } from 'react';
import {
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

let DESIRED_MEAL_SIZE = 535;
let JAPANESE_WEIGHT = 247;
let RUBBERMAID_WEIGHT = 213;

class MeatContainerField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      tupperwareWeight: JAPANESE_WEIGHT,
      beefHeartNeeded: null
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var beefHeartNeeded;

    if (event.target.name.startsWith('meatContainerField')) {
      let newWeight = event.target.value;
      let existingTupperwearWeight = this.state.tupperwareWeight;
      let weightOfMeat = newWeight - existingTupperwearWeight;
      beefHeartNeeded = DESIRED_MEAL_SIZE - weightOfMeat;
      if (beefHeartNeeded < 0) {
        beefHeartNeeded = 0;
      }

      this.setState({weight: event.target.value, beefHeartNeeded: beefHeartNeeded});
    } else if (event.target.name.startsWith('containerType')) {
      let existingWeight = this.state.weight;
      let newTupperwearWeight = event.target.value;
      let weightOfMeat = existingWeight - newTupperwearWeight;
      beefHeartNeeded = DESIRED_MEAL_SIZE - weightOfMeat;
      if (beefHeartNeeded < 0) {
        beefHeartNeeded = 0;
      }

      this.setState({tupperwareWeight: event.target.value, beefHeartNeeded: beefHeartNeeded});
    }

    this.props.onMealWeightChanged(this.props.index, beefHeartNeeded);
  }

  render() {

    let myId = "meatContainerField" + this.props.index;
    let myContainerId = "containerType" + this.props.index;

    var className = 'remaining ';
    if (this.state.weight === '' || this.state.weight <= 0) {
      className += 'hidden ';
    }
    let beefHeartRemaining = this.props.beefHeartAvailable - this.state.beefHeartNeeded;

    if (beefHeartRemaining < 0) {
      className += 'remaining-warning';
    }

    return (
      <FormGroup>
        <Row>
          <Col>
            <Label for="meatContainerField">{this.props.dayAndTime}</Label>
          </Col>
        </Row>
        <div className="form-row">
          <Col>
            <Input type="select" name={myContainerId} id={myContainerId} value={this.state.tupperwareWeight} onChange={this.handleChange}>
              <option value={JAPANESE_WEIGHT}>Japanese</option>
              <option value={RUBBERMAID_WEIGHT}>Rubbermaid</option>
            </Input>
            <p className={className}>Will need: {this.state.beefHeartNeeded} g</p>
          </Col>
          <Col>
            <Input type="number" name={myId} id={myId} placeholder="grams" value={this.state.weight} onChange={this.handleChange} />
            <p className={className}>{(beefHeartRemaining > 0) ? 'Leaving: ' + beefHeartRemaining :  'Short by: ' + (-1 * beefHeartRemaining) } g</p>
          </Col>
        </div>
        <Row>
          <Col>

          </Col>
        </Row>

      </FormGroup>
    )
  }
}

export default MeatContainerField;
