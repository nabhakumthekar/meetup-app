import React, {
  Component
} from 'react';
import './App.css';
import axios from 'axios';
import {Grid,Row,Col,Button,Table} from 'react-bootstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class MeetUpEvents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };

     this.rsvpClick = this.rsvpClick.bind(this);
  }

  componentDidMount() {
    this.evenetList();
  }

  evenetList() {
    axios.get('https://api.meetup.com/reactjs-dallas/events?&sign=true&photo-host=public&page=1')
    .then( (response) => {
        console.log(response);
      this.setState({
          events:response.data
      })
    })
    .catch((err) => {
          console.log(err);
    });
  }

  rsvpClick(id) {
      axios.get('https://api.meetup.com/reactjs-dallas/events/'+id+'/rsvps?&sign=true&photo-host=public')
      .then( (response) => {
          console.log(response);
          if(response.status === 200){
               alert('RSVP Done');
          }
      })
      .catch((err) => {
            console.log(err);
      });
  }

  render() {
  const events = this.state.events.map((item, i) => (
      <tr key={i}>
          <td>
              <h1>{ item.name }</h1>
              <div style = {descriptionDiv}>{ReactHtmlParser(item.description)}</div>
          </td>

          <td>
            <p>{item.status}</p>
          </td>

          <td style={heading}>
              <p>{item.local_date}</p>
              <p>{item.local_time}</p>
          </td>

          <td style={address}>
              <p>{item.venue.address_1}</p>
              <p>{item.venue.address_2}</p>
              <p>{item.venue.city}</p>
          </td>

          <td>
              <div>
                  <Button bsStyle="primary"  onClick={this.rsvpClick.bind(this, item.id)}>RSVP</Button>
              </div>
          </td>
      </tr>
  ));

  return (
      <Grid>
          <Row className="show-grid">
              <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Event Details</th>
                        <th>Status</th>
                        <th>Date & Time</th>
                        <th>Address</th>
                        <th>RSVP</th>
                    </tr>
                </thead>
                <tbody>
                    { events }
                </tbody>
            </Table>
        </Row>
    </Grid>
  );
}
}

const heading = {
    width:'100px'
}

const address = {
    width:'130px'
}

const descriptionDiv = {
        paddingLeft: '20px',
        paddingRight: '20px'
}


export default MeetUpEvents;
