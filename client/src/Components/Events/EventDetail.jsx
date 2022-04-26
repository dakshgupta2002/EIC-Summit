import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { EnrollEvent, EventDetails } from '../../Api/Event'
import Header from '../Header.jsx';
import { toast } from 'react-toastify';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const res = EventDetails(id);
  }, [])

  const enroll = async () => {
    const res = await EnrollEvent(id);
    console.log(res);
    if (res.msg) {
      toast.error("You are already enrolled in this event");
    } else {
      toast.success("You have successfully enrolled in this event");
      navigate(`/events/${id}`);
    }
  }
  const deleteEvent = () => {
    console.log("delete");
  }

  return (
    <>
      <Header />
      <div>{id}</div>

      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={enroll}
      >
        Enroll For Free
      </Button>

      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={deleteEvent}
      >
        Delete
      </Button>
    </>
  )
}
