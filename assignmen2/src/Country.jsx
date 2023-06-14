import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Country.css";

export default function Country() {
  const { id } = useParams();
  const [flagData, setFlagData] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${id}`)
      .then((response) => response.json())
      .then((data) => setFlagData(data[0]));
  }, [id]);

  if (!flagData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="Country_wrapper">
      <div
        style={{
          padding: "50px 15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height:"calc(100vh - 100px)"
        }}
      >
        <div style={{display:"flex", justifyContent:"center"}}>
        <img id="cImage" src={flagData.flags.png} alt={flagData.name.common} />
        </div>
        <div className="display_flex">
          <div>Name: </div>
          <div>{flagData.name.common}</div>
        </div>
        <div className="display_flex">
          <div>Region: </div>
          <div>{flagData.region}</div>
        </div>
        <div className="display_flex">
          <div>Capital: </div>
          <div>{flagData.capital}</div>
        </div>
        <div className="display_flex">
          <div>Population: </div>
          <div>{flagData.population}</div>
        </div>
      </div>
    </div>
  );
}
