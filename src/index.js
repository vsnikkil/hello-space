require('./index.html')

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const appRoot = document.createElement('section')
const body = document.querySelector('body')

body.appendChild(appRoot)

ReactDOM.render(<App />, appRoot)

