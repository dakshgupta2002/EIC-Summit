import React from 'react'
import SingleEvent from './SingleEvent'
import { getAllEvents } from '../../Api/Event'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([])
  React.useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate("/")
    }
    getAllEvents().then(res => {
      setEvents(res.data)
    })
}, [])

  return (
    <>
      <h1>EVENTS</h1>
      <br />
      <Button
        onClick={() => { navigate("create") }
        }>
        Create Event
      </Button>

      {events.map((event) => {
        return (
          <>
          event
          <SingleEvent data={event.data} />
          </>
        )
      })}
    </>
  )
}
