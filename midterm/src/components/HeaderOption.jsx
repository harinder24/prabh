import React from 'react'
import "./HeaderOptions.css"
export default function HeaderOption({ Icon, title, active, onClick }) {
  return (
    <div className={`HeaderOption ${active ? "active" : ""}`} onClick={onClick}>
        <Icon className="HeaderOption_Icon" />
        {title && <h3>{title}</h3>}
    </div>
  )
}
