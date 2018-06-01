import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label

} from 'reactstrap';

let BEFF_CONTAINER_WEIGHT = 270;

class BeefHeartField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beefHeartPlusContainerWeight: '',
      beefHeartWeight: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let beefHeartWeight = event.target.value - BEFF_CONTAINER_WEIGHT;
    this.setState({beefHeartWeight: beefHeartWeight, beefHeartPlusContainerWeight: event.target.value});

    this.props.onBeefHeartWeightChanged(beefHeartWeight);
  }

  render() {

    var className = 'remaining ';
    if (this.state.beefHeartWeight === '' || this.state.beefHeartWeight <= 0) {
      className += 'hidden ';
    }


    return (
      <FormGroup>
        <Label for="beefHeartField">Beef Heart Container</Label>
        <Input type="numeric" name="beefHeartField" id="beefHeartField" placeholder="Total weight, with container, in grams"
          value={this.state.beefHeartPlusContainerWeight} onChange={this.handleChange}/>
        <p className={className}>Beef heart weight: {this.state.beefHeartWeight} g</p>
      </FormGroup>
    )
  }
}

export default BeefHeartField;
