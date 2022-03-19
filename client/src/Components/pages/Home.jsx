import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer';
import Header from '../Header';

export default function Home() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (sessionStorage.getItem('user') === null) {
      navigate('/login')
    }
  }, [])

  return (

    <>
      <Header />
      HOME
      {sessionStorage.getItem('token')}
      <Footer />
    </>

  )
}
