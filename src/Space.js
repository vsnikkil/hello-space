import React, { Component } from 'react'

const X_RES = 1024
const Y_RES = 640

const BODY_COUNT = 20
const DRAG = 0.001

const bodies = []

class Body {
  constructor ({ x, y }) {
    this.x = x
    this.y = y
    this.vx = Math.random() -.5
    this.vy = Math.random() -.5
    this.ax = 0
    this.ay = 0
  }
}

const gravityForce = (body, body2) => {
  const p1 = { x: body.x, y: body.y }
  const p2 = { x: body2.x, y: body2.y }

  const rVec = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    get dSquare () {
      return this.x**2 + this.y**2
    },
    get normalized () {
      return {
        x: this.x / Math.sqrt(this.dSquare),
        y: this.y / Math.sqrt(this.dSquare)
      }
    }
  }

  const v = .5 / (rVec.dSquare + 10)
  return {
    x: v * rVec.x,
    y: v * rVec.y
  }
}

class Space extends Component {
  constructor (props) {
    super(props)

    for (let b = 0; b < BODY_COUNT; b++) {
      bodies.push(new Body({
        x: .5 * Math.random() * X_RES + X_RES * .25,
        y: .5 * Math.random() * Y_RES + Y_RES * .25
      }))
    }
  }

  componentDidMount () {
    this.componentDidUpdate()
  }

  componentDidUpdate () {
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, X_RES, Y_RES)

    ctx.fillStyle = 'yellow'

    for (let i in bodies) {
      const body = bodies[i]
      ctx.beginPath()
      ctx.arc(body.x, body.y, 10, 0, 2*Math.PI)
      body.x += body.vx
      body.y += body.vy
      body.vx += body.ax
      body.vy += body.ay
      body.ax = 0
      body.ay = 0

      body.vx *= 1-DRAG
      body.vy *= 1-DRAG
      
      for (let j = Number(i)+1; j < bodies.length; ++j) {
        const otherBody = bodies[j]
        const F = gravityForce(body, otherBody)
        body.ax += F.x
        body.ay += F.y

        otherBody.ax += -F.x
        otherBody.ay += -F.y
      }

      ctx.fill()
    }
    window.requestAnimationFrame(this.componentDidUpdate.bind(this))
  }

  render () {
    return (
      <canvas
        width = { X_RES }
        height = { Y_RES }
        ref = { canvas => this.canvas = canvas } />
    )
  }
}

export default Space

