import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import {
  saveSupplier,
  listSuppliers,
  deleteSupplier,
} from '../actions/supplierActions';

/**
 * 
 * List of already added suppliers screen.
 * 
 * @author 2020-JUN-WE-05
 * @version 1.0
 * @param {*} props 
 * 
 */

 function SuppliersScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [uploading, setUploading] = useState(false);
  const supplierList = useSelector((state) => state.supplierList);
  const { loading, suppliers, error } = supplierList;

  const supplierSave = useSelector((state) => state.supplierSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = supplierSave;

  const supplierDelete = useSelector((state) => state.supplierDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = supplierDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listSuppliers());
    return () => {
    };
  }, [successSave, successDelete]);

  const openModal = (supplier) => {
    setModalVisible(true);
    setId(supplier._id);
    setName(supplier.name);
    setEmail(supplier.email);
    setLocation(supplier.location);
    setImage(supplier.image);
  };
  const submitHandler = (e) => {
     let name_input = document.getElementById("name").value
     let email_input = document.getElementById("email").value
     let image_input = document.getElementById("image").value
     let location_input = document.getElementById("location").value
     if(name_input == '' || email_input == '' || image_input == '' || location_input == ''){
       console.log("sdsd");
     }
     else {
      if (
        dispatch(
          
          saveSupplier({
            _id: id,
            name,
            email,
            image,
            location,
          })
        )) {
          swal({
            title: "SUCCESS!",
            text: "You Added the supplier successfully!",
            icon: "success",
            button: "OK!",
          });
          e.preventDefault();
        }
     }
    
  };
  const deleteHandler = (supplier) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary supplier!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSupplier(supplier._id));
        swal("Poof! Your imaginary supplier has been deleted!", {
          icon: "success",
        }); 
      } else {
        swal("Your imaginary supplier is safe!");
      }
    });
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="supplier-header">
        <h3>Suppliers</h3>
        <button className="supplier_btn" onClick={() => openModal({})}>
          Create Supplier
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Supplier</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                  ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Location</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  id="location"
                  onChange={(e) => setLocation(e.target.value)}
                  ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
          
        </div>
      )}
      
      <div className="supplier-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier._id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.location}</td>
                <td>
                  <button className="button secondary" onClick={() => openModal(supplier)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(supplier)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
export default SuppliersScreen;
