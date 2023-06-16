
import React, { useEffect, useState } from 'react';
import './Countries.css'
import { useNavigate } from 'react-router-dom';

export default function Countries() {
    const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountry(data));
  }, []);
  const navigate = useNavigate();

    function handleClick(event) {
        navigate("/" + event.target.id);
    }
  return (
    <div id='Countries_wrapper'>
        {country.map((cnty) => (
          <div className='card_wrapper' key={cnty.name.common}>
            <img className='card_img' src={cnty.flags.png} alt="" />
            <div className='card_info'>
                <h4>{cnty.name.common}</h4>
                <div className='card_link' id={cnty.name.common} onClick={handleClick}>More</div>
            </div>
          </div>
        ))}
    </div>
  )
}
