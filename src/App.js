import React, { Component } from 'react'
import Space from './Space'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <section className = 'application'>
        <h1>Hello space</h1>
        <Space />
      </section>
    )
  }
}

export default App

