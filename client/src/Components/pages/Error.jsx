import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error() {

  const navigate = useNavigate();
  return (
    <div>
      <h1>Login to view this page</h1>
      <Button
        onClick={() => {navigate("/login")}} 
      >
        Login
      </Button>


    </div>
  )
}
