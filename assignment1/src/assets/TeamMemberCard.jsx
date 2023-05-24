import React from "react";

import "./TeamMemberCard.css";
import { Tilt } from "react-tilt";
export default function TeamMemberCard({ data }) {
  return (
    <Tilt
      className="tiltCard"
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
    >
      <div className="flex flex_center bottom_border padding_top">
        <img className="image" src={data.avatar} alt="" />
      </div>
      <div className="flex flex_space padding_bottom bottom_border padding_top">
        <div className="caret">First Name</div>
        <div className="caret">{data.first_name}</div>
      </div>
      <div className="flex flex_space padding_bottom bottom_border padding_top">
        <div className="caret">Last Name</div>
        <div className="caret">{data.last_name}</div>
      </div>
      <div className="flex flex_space padding_top">
        <div className="caret">Email</div>
        <div className="caret">{data.email}</div>
      </div>
    </Tilt>
  );
}
