import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    console.log('this.state.dueDate', this.state.dueDate)
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className='list-group col-sm-4'>
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className='list-group-item'>
                <div className='list-item'>
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className='list-item delete-button'
                  onClick={() => {this.deleteReminder(reminder.id)}}
                >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          Reminder
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className='form-control'
              type="text"
              placeholder='I have to...'
              onChange={event => this.setState({text: event.target.value})}
            />
            <input
              type='datetime-local'
              className='form-control'
              onChange={event => this.setState({dueDate: event.target.value})}
            />
          </div>
          <button
            className="btn btn-success"
            type='button'
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
        </div>
        { this.renderReminders() }
        <div
          className='btn btn-danger'
          onClick={() => this.props.clearReminders()}
        >
          Clear Reminders
        </div>
      </div>
    )
  }
}

// Takes a piece of state and sends to above component as props
function mapStateToProps(state) {
  return {
    reminders: state
  }
}

// In order to use mapState.., must call connect, pass in mapState along with action creators, and also component in use (App)
// This is 'binding action creators to props'
export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
