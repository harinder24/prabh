
import React, { useEffect, useState } from 'react';
import './Countries.css'

export default function Countries() {
    const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountry(data));
  }, []);

  return (
    <div id='Countries_wrapper'>
        {country.map((cnty) => (
          <div className='card_wrapper' key={cnty.name.common}>
            <img className='card_img' src={cnty.flags.png} alt="" />
            <div className='card_info'>
                <h4>{cnty.name.common}</h4>
                <a className='card_link' href={"/"+cnty.name.common}>More</a>
            </div>
          </div>
        ))}
    </div>
  )
}
