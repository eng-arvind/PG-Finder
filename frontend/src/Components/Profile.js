import React, { Component, useState, useEffect } from "react";
import { isAuth } from "../helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; //for toast notifications
import PGCard from "./PGCard";

const Profile = () => {
  const id = isAuth()._id;
  const [pgs, setPgs] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    address: "",
    rooms: 0,
    food: false,
    ac: false,
    price: 0,
    contactNumber: 0,
    authorId: id,
  });

  //destructuring values from formData state
  const {
    city,
    state,
    address,
    contactNumber,
    rooms,
    ac,
    food,
    price,
    authorId,
  } = formData;

  //for updating the state
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = {
      city : city.toLowerCase(),
      state,
      address,
      contactNumber: +contactNumber,
      rooms: +rooms,
      ac: Boolean(ac),
      food: Boolean(food),
      price: +price,
      authorId: isAuth()._id,
    };

    axios
      .post("http://localhost:5000/addPg", result)
      .then((res) => {
        setFormData({
          ...formData,
          city: "",
          state: "",
          address: "",
          contactNumber: +"",
          rooms: +"",
          ac: false,
          food: false,
          price: 0,
          authorId: id,
        });
        //to display toast notification
        toast.success("Posted Successfully");
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        setFormData({
          ...formData,
          city: "",
          state: "",
          address: "",
          contactNumber: +"",
          rooms: +"",
          ac: false,
          food: false,
          price: 0,
          authorId: id,
        });
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getOwnerPg/" + id)
      .then((result) => {
        setPgs(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <hr />
                  </div>
                </div>
                <form noValidate onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <label>City</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter City"
                          value={city}
                          required
                          // calling handle change on changing
                          onChange={handleChange("city")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>State</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter State"
                          value={state}
                          required
                          // calling handle change on changing
                          onChange={handleChange("state")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Address</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Address"
                          value={address}
                          required
                          // calling handle change on changing
                          onChange={handleChange("address")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label>Rooms</label>
                      <div className="form-group">
                        <input
                          type="Number"
                          min="0"
                          className="form-control"
                          placeholder="Avaliable Rooms"
                          value={rooms}
                          required
                          // calling handle change on changing
                          onChange={handleChange("rooms")}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label>Food facility</label>
                      <div className="form-group">
                        <select
                          required={true}
                          className="custom-select"
                          value={food}
                          required
                          // calling handle change on changing
                          onChange={handleChange("food")}
                        >
                          <option value="" disabled defaultValue>
                            Select option
                          </option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label>AC facility</label>
                      <div className="form-group">
                        <select
                          required={true}
                          className="custom-select"
                          value={ac}
                          required
                          // calling handle change on changing
                          onChange={handleChange("ac")}
                        >
                          <option value="" disabled defaultValue>
                            Select option
                          </option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Price</label>
                      <div className="form-group">
                        <input
                          type="Number"
                          min="0"
                          className="form-control"
                          placeholder="Price"
                          value={price}
                          required
                          // calling handle change on changing
                          onChange={handleChange("price")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Contact Number</label>
                      <div className="form-group">
                        <input
                          type="Number"
                          className="form-control"
                          placeholder="Contact Number"
                          value={contactNumber}
                          required
                          // calling handle change on changing
                          onChange={handleChange("contactNumber")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-8 mx-auto">
                      <center>
                        <div className="form-group">
                          <button
                            className="btn btn-primary btn-block btn-lg"
                            type="submit"
                          >
                            Click to Add your PG
                          </button>
                        </div>
                      </center>
                    </div>
                  </div>
                </form>

                <a href="/"> Back to Home</a>
                <br />
              </div>
            </div>
          </div>
          {/* col-md-7 */}
          <div className="row row-cols-2 row-cols-xs-12 row-col-sm-12 row-cols-lg-3">
            {pgs.map((pg, key) => (
              <div className="col-12 col-sm-6 col-lg-5" key={pg.id}>
                <PGCard
                  id={pg._id}
                  city={pg.city}
                  state={pg.state}
                  address={pg.address}
                  contactNumber={pg.contactNumber}
                  rooms={pg.rooms}
                  ac={pg.ac}
                  food={pg.food}
                  price={pg.price}
                  pgs={pgs}
                  setPgs={setPgs}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
