import React from 'react'

export default function Food({foodDot}) {
  const style = {
    left: `${foodDot[0]}%`,
    top: `${foodDot[1]}%`,
  }
  
  return (
    <div className='snake-food' style={style}></div>
  )
}
