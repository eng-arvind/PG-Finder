import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import PGCardSearch from "./PGCardSearch";
import "./PGCard.css";

const RentalPg = ({ location }) => {
  const value = queryString.parse(location.search).city;
  const [pgs, setPgs] = useState([]);
  const CITY = value.toLowerCase();
  useEffect(() => {
    axios
      .get("http://localhost:5000/findPg?city=" + CITY)
      .then((response) => setPgs(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (pgs.length === 0) {
    return (
      <div className="decorate-this">
        <center>☹Sorry, Not found Rental Pg's in this City</center>
      </div>
    );
  }
  return (
    <div className="row row-cols-2 row-cols-xs-12 row-col-sm-12 row-cols-lg-3">
      {pgs.map((pg, key) => (
        <div className="col-12 col-sm-6 col-lg-3" key={pg.id}>
          <PGCardSearch data={pg} />
        </div>
      ))}
    </div>
  );
};

export default RentalPg;
