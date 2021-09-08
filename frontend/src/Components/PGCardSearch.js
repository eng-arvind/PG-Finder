import React from "react";

const PGCardSearch = ({ data }) => {
  const {
    _id,
    city,
    state,
    address,
    contactNumber,
    rooms,
    ac,
    food,
    price,
  } = data;

  let haveAc = "No Ac";
  let haveFood = "No Food";
  if (ac) haveAc = "Ac";
  if (food) haveFood = "Food";

  let INFO_1 = city + "  |  " + state;
  let INFO_2 = haveAc + " | " + haveFood + " | " + " Rooms - " + rooms;
  let INFO_3 = "₹" + price + "  |   ✆" + contactNumber;
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOrAHLJ_VS95EQqh7euPF0LvXnRDXL8EWYeGATlVoM6Ixo6catNAUJHz21PyyBQdVEkUQ&usqp=CAU";
  return (
    <div className="card " style={{ width: "15rem", height: "18rem" }}>
      <img
        className="card-img-top"
        style={{ height: "10rem" }}
        src={url}
        alt="PG"
      />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{INFO_1}</li>
        <li className="list-group-item">{address}</li>
        <li className="list-group-item">{INFO_2}</li>
        <li className="list-group-item">{INFO_3}</li>
      </ul>
    </div>
  );
};

export default PGCardSearch;
