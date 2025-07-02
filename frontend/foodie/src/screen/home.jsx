import React from 'react'
import Navbar from '../components/navbar'
import Card from '../components/card'

function home() {
  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
    </>
  )
}

export default home;
