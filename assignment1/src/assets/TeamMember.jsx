import React from 'react'
import './TeamMember.css'
import TeamMemberCard from './TeamMemberCard'
export default function TeamMember(props) {
   
  return (
    <div className='team_wrapper_wrapper'>
    <div className='team_wrapper'>
        {props.team.map((member, index) => (
            <TeamMemberCard key={`member-${index}`}  data={member}/>
            
        ))}
    </div>
    </div>
  )
}
