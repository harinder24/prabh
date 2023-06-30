import React from 'react'
import './SmallNewsCard.css'
export default function SmallNewsCard({data , onClick}) {
  return (

    <div  className="cardWrapper" onClick={onClick}>
    <img className="cardImages" src={data.urlToImage} alt="" />
    <div className="cradInfo">
      <div>
        {data.title}
      </div>

      <div>
      {data.source} &#9679; {data.hoursAgo} {data.hoursAgo === 1 ? 'hour' : 'hours'} ago
      </div>
    </div>
   </div>
  )
}
