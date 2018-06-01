import React, { Component } from 'react';
import BeefHeartField from './BeefHeartField.js';
import MeatContainerField from './MeatContainerField.js';
import moment from 'moment';

import {
  Form
} from 'reactstrap';

class BeefulatorForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beefHeartWeight: 0,
      meals: [
        {index: 0, beefHeartNeeded: 0},
        {index: 1, beefHeartNeeded: 0},
        {index: 2, beefHeartNeeded: 0},
        {index: 3, beefHeartNeeded: 0},
      ]
    }
  }

  onMealWeightChanged = (mealId, beefHeartNeeded) => {
    const { meals } = this.state;
    const nextMealState = meals.map(meal => {
      if (meal.index !== mealId) return meal;
      return {
        ...meal,
        beefHeartNeeded: beefHeartNeeded
      };
    })
    this.setState(prevState => ({meals: nextMealState}))
  }

  onBeefHeartWeightChanged = (beefHeartWeight) => {
    this.setState(prevState => ({beefHeartWeight: beefHeartWeight}));
  }

  /**
   * Calculate how much beef heart is available for meal at index mealId,
   * given that the previous meals have used a certain amount already.
   */
  calculateBeefHeartAvailable(mealId) {
    const { meals, beefHeartWeight } = this.state;
    var heartAlreadyUsed = 0;
    for (var i = 0; i < mealId; i++) {
      heartAlreadyUsed += meals[i].beefHeartNeeded;
    }
    return beefHeartWeight - heartAlreadyUsed;
  }

  render() {

    let currentDate = moment();
    let dows = [];
    let timesOfDay = [];

    dows[0] = currentDate.add(12, 'hours').format('dddd');
    timesOfDay[0] = currentDate.hour() < 12 ? 'morning' : 'evening';
    dows[1] = currentDate.add(12, 'hours').format('dddd');
    timesOfDay[1] = currentDate.hour() < 12 ? 'morning' : 'evening';
    dows[2] = currentDate.add(12, 'hours').format('dddd');
    timesOfDay[2] = currentDate.hour() < 12 ? 'morning' : 'evening';
    dows[3] = currentDate.add(12, 'hours').format('dddd');
    timesOfDay[3] = currentDate.hour() < 12 ? 'morning' : 'evening';

    const { meals } = this.state;

    return (
      <Form className="main-form">
        <BeefHeartField onBeefHeartWeightChanged={this.onBeefHeartWeightChanged} />
        {meals.map(meal => (
          <MeatContainerField key={'meatContainer' + meal.index} index={meal.index} dayAndTime={dows[meal.index] + ' ' + timesOfDay[meal.index]}
            onMealWeightChanged={this.onMealWeightChanged} beefHeartAvailable={this.calculateBeefHeartAvailable(meal.index)} />
        ))}
      </Form>
    )
  }
}

export default BeefulatorForm;
