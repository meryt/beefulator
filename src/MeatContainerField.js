import React, { Component } from 'react';
import {
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import Constants from './Constants';

class MeatContainerField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      tupperwareWeight: Constants.JAPANESE_WEIGHT,
      beefHeartNeeded: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {

    var tupperwareWeight;
    if (event.target.name === 'Japanese') {
      tupperwareWeight = Constants.JAPANESE_WEIGHT;
    } else {
      tupperwareWeight = Constants.RUBBERMAID_WEIGHT;
    }

    let existingWeight = this.state.weight;
    let weightOfMeat = existingWeight - tupperwareWeight;
    var beefHeartNeeded = Constants.DESIRED_MEAL_SIZE - weightOfMeat;
    if (beefHeartNeeded < 0) {
      beefHeartNeeded = 0;
    }

    this.setState({tupperwareWeight: tupperwareWeight, beefHeartNeeded: beefHeartNeeded});
  }

  handleChange(event) {
    var beefHeartNeeded;

    if (event.target.name.startsWith('meatContainerField')) {
      let newWeight = event.target.value;
      let existingTupperwearWeight = this.state.tupperwareWeight;
      let weightOfMeat = newWeight - existingTupperwearWeight;
      beefHeartNeeded = Constants.DESIRED_MEAL_SIZE - weightOfMeat;
      this.setState({weight: event.target.value, beefHeartNeeded: beefHeartNeeded});
    }
    this.props.onMealWeightChanged(this.props.index, beefHeartNeeded);
  }

  render() {

    let myId = "meatContainerField" + this.props.index;
    let myContainerId = "ContainerType" + this.props.index;

    var className = 'remaining ';
    if (this.state.weight === '' || this.state.weight <= 0) {
      className += 'hidden ';
    }
    let beefHeartRemaining = this.props.beefHeartAvailable - this.state.beefHeartNeeded;

    if (beefHeartRemaining < 0) {
      className += 'remaining-warning';
    }

    let selectedOptionClass = 'btn btn-success';
    let unselectedOptionClass = 'btn btn-outline-success';

    return (
      <FormGroup>
        <Row>
          <Col>
            <Label for="meatContainerField">{this.props.dayAndTime}</Label>
          </Col>
        </Row>
        <div className="form-row">
          <Col>
            <div className="btn-group btn-group-toggle" data-toggle="buttons" >
              <label className={ this.state.tupperwareWeight === Constants.JAPANESE_WEIGHT ? selectedOptionClass : unselectedOptionClass }>
                <input type="radio" name="Japanese" id={'Japanese' + myContainerId} autoComplete="off" onClick={this.handleClick} /> Japanese
              </label>
              <label className={ this.state.tupperwareWeight === Constants.JAPANESE_WEIGHT ? unselectedOptionClass : selectedOptionClass }>
                <input type="radio" name="Rubbermaid" id={'Rubbermaid' + myContainerId} autoComplete="off" onClick={this.handleClick} /> Rubbermaid
              </label>
            </div>
            <p className={className}>Will need: {this.state.beefHeartNeeded} g</p>
          </Col>
          <Col>
            <Input type="tel" name={myId} id={myId} placeholder="grams" value={this.state.weight} onChange={this.handleChange} />
            <p className={className}>{(beefHeartRemaining > 0) ? 'Leaving: ' + beefHeartRemaining :  'Short by: ' + (-1 * beefHeartRemaining) } g</p>
          </Col>
        </div>
      </FormGroup>
    )
  }
}

export default MeatContainerField;
