import React from 'react'
import SingleEvent from './SingleEvent'
import { getAllEvents, getMyEvents } from '../../Api/Event'
import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header'

export default function Events() {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = React.useState([])

  React.useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate("/")
    }

    if(location.pathname==="/myEvents"){
      getMyEvents().then(res => {
        setEvents(res)
      })
    }else{
      getAllEvents().then(res => {
        setEvents(res)
      })
    }
  }, [location.pathname])

  return (
    <>
      <Header/>
      <h1>EVENTS</h1>
      <br />
      <Button
        onClick={() => { navigate("/events/create") }
        }>
        Create Event
      </Button>
      <Button
        onClick={() => { navigate("/myEvents") }
        }>
        My Events
      </Button>

      <div style={{display: 'flex', flexWrap:"wrap", width: '70%', margin: 'auto'}}>
        {events.map((event) => {
          return (
            <>
              <SingleEvent data={event} onClick={() => { console.log("hello"); navigate(`/events/${event._id}`) }} />
            </>
          )
        })}
      </div>
    </>
  )
}
