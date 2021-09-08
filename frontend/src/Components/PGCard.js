import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap"; //imporing components from Bootstarp
import "./PGCard.css";

const PGCard = ({
  id,
  city,
  state,
  address,
  contactNumber,
  rooms,
  ac,
  food,
  price,
  pgs,
  setPgs,
}) => {
  //State to manage new caption and url
  const [newRooms, setNewRooms] = useState(rooms);
  const [newContactNo, setNewContactNo] = useState(contactNumber);
  const [newPrice, setNewPrice] = useState(price);
  const [newFood, setNewFood] = useState(food);
  const [newAc, setNewAc] = useState(ac);

  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOrAHLJ_VS95EQqh7euPF0LvXnRDXL8EWYeGATlVoM6Ixo6catNAUJHz21PyyBQdVEkUQ&usqp=CAU";
  //state for hiding and showing of modals
  const [show, setShow] = useState(false);

  let haveAc = "No Ac";
  let haveFood = "No Food";
  if (ac) haveAc = "Ac";
  if (food) haveFood = "Food";

  let INFO_1 = city + "  |  " + state;
  let INFO_2 = haveAc + " | " + haveFood + " | " + " Rooms - " + newRooms;
  let INFO_3 = "₹" + newPrice + "     |      ✆" + contactNumber;

  //handler functions for modals state management
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //delete functionality function
  const handleDelete = (id) => {
    //delete request for that specific id
    axios
      .delete("http://localhost:5000/deletepg/" + id)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));

    //copying that array except the deleted value
    const newPgs = pgs.filter((m) => m.id !== id);

    //updating the parent component State
    setPgs(newPgs);
    toast.success("Deleted Successfully"); //toast notification
  };

  //edit functionality function
  const handleEdit = (id) => {
    //patch requst to our api
    axios
      .patch("http://localhost:5000/updatePg/" + id, {
        rooms: newRooms,
        contactNumber: newContactNo,
        price: newPrice,
        food: newFood,
        ac: newAc,
      })
      .then((res) => {
        toast.success("Edited Successfully");
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ToastContainer />
      {/* setting up card height and width */}
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
        <div>
          {/* Button to trigger Modal */}
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleShow}
          >
            Edit
          </button>
          {/* Responsive Modal */}
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Update Rooms</Form.Label>
                <Form.Control
                  type="Number"
                  value={newRooms}
                  // on changing the value update the state
                  onChange={(e) => setNewRooms(e.target.value)}
                  placeholder="New Rooms"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Change Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  value={newContactNo}
                  // on changing the value update the state
                  onChange={(e) => setNewContactNo(e.target.value)}
                  placeholder="Enter Contact Number"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Update Price</Form.Label>
                <Form.Control
                  type="Number"
                  value={newPrice}
                  // on changing the value update the state
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Enter New Price"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Update Food Facility</Form.Label>
                <Form.Control
                  as="select"
                  value={newFood}
                  required={true}
                  onChange={(e) => setNewFood(e.target.value)}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Update AC Facility</Form.Label>
                <Form.Control
                  as="select"
                  value={newAc}
                  required={true}
                  onChange={(e) => setNewAc(e.target.value)}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* Button to triggger patch request vai handleEdit function */}
              <Button variant="success" onClick={() => handleEdit(id)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Button for delete Functionality */}
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
