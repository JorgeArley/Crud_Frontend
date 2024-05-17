import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Users = () => {
  const url = 'https://crud-backend-osbn.onrender.com/api/users/';

  const [users, setUsers] = useState([])
  const [uid, setUid] = useState('');


  const [name, setName] = useState('');
  const [url_image, setUrl_image] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState();
  const [social_profile, setSocial_profile] = useState(['']);
  const [promote, setPromote] = useState(false);
  const [rating, setRating] = useState(0);
  const [last_login, setLast_login] = useState('');

  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  const getUsers = async () => {
    const resp = await axios.get(url);
    setUsers(resp.data.users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const openModal = (op, uid,
    name,
    url_image,
    role,
    status,
    social_profile,
    promote,
    rating,
    last_login) => {
    setUid('');
    setName('');
    setUrl_image('');
    setRole('');
    setStatus(true);
    setSocial_profile([social_profile]);
    setPromote(true);
    setRating(0);
    setLast_login('');
    setOperation(op);
    if (op === 1) {
      setTitle('Create user');
    }
    if (op === 2) {
      setTitle('Edit user');
      setName(name);
      setUid(uid);
      setUrl_image(url_image);
      setRole(role);
      setStatus(status);
      setSocial_profile([social_profile]);
      setPromote(promote);
      setRating(rating);
      setLast_login(last_login);
    }
  }

  const sendRequest = async(met, params) => {
 
    if (met == 'DELETE') {
      await axios({method: met, url:`${url}${params}`}).then((res) => {
        let type = res.data
        document.getElementById('btnClose').click();
        getUsers();
        Swal.fire({
          title: "Good job!",
          text: "User deleted!",
          icon: "success"
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      })
    }
    if (met == 'POSTPUT') {
      
      let dataToSend = {
        name,
        url_image,
        role,
        status,
        social_profile,
        promote,
        rating,
        last_login,
      }
      dataToSend.social_profile = [social_profile]
      let Nmet = params !== '' ? 'PUT' : 'POST';
      let Nurl = params !== '' ? `${url}${params}` : `${url}`;

      await axios({method: Nmet, url:Nurl, data: dataToSend}).then((res) => {
        let type = res.data
        document.getElementById('btnClose').click();
        getUsers();
        Swal.fire({
          title: "Good job!",
          text: "User saved!",
          icon: "success"
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      })
    }
  }

  return (
    <div className='App'>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="">
            <div className="ms-auto">
              <button onClick={() => openModal(1)} className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modalUsers">
                <i className='fa-solid fa-plus'></i>  Add new user
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className='border border-light'>
                    <th>USER</th>
                    <th></th>
                    <th>USER ROLE</th>
                    <th>STATUS </th>
                    <th>SOCIAL PROFILE</th>
                    <th>PROMOTE</th>
                    <th>RATING</th>
                    <th>LAST LOGIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {users.map((user, id) => (
                    <tr key={id} className='border border-light '>
                      <td>
                        <img className="img-fluid border rounded-circle img-rounded imgUser"src={user.url_image}></img>
                      </td>
                      <td>{user.name}</td>
                      <td> 
                        {user.role.toLowerCase() == 'viewer' && <div className="text-dark badge c-black bg-body-secondary">{user.role}</div>}
                        {user.role.toLowerCase() == 'administrator' && <div className="text-dark badge bg-info-subtle">{user.role}</div>}
                        {user.role.toLowerCase() == 'moderator' && <div className="text-dark badge bg-danger-subtle">{user.role}</div>}
                      </td>
                      <td>
                        {user.status == true && <p className='m-0'><i className="fa-solid fa-circle text-success"></i><span className='text-small'> Active</span></p>}
                        {user.status == false && <p className='m-0'><i className="fa-solid fa-circle text-danger"></i><span className='text-small'> Inactive</span> </p>}
                      </td>
                      <td>
                        {user.social_profile[0] === 'facebook' && <i className="fa-brands fa-facebook"></i> }
                        {user.social_profile[0] === 'instagram' && <i className="fa-brands fa-instagram"></i> }
                        {user.social_profile[0] === 'twitter' && <i className="fa-brands fa-twitter"></i> }
                        {user.social_profile[0] === 'google' && <i className="fa-brands fa-google"></i>}

                      </td>
                      <td>{user.promote == true &&
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                        </div>}{user.promote == false &&
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" unchecked />
                          </div>}
                      </td>
                      <td>
                        
                        {user.rating >= 4.2 && <p className='m-0'><i className="fa-solid fa-arrow-up text-success"></i><span className='text-small'> {user.rating}</span></p>} 
                        {user.rating < 4.2 && <p className='m-0'><i className="fa-solid fa-arrow-down text-danger"></i><span className='text-small'> {user.rating}</span> </p>}


                        </td>
                      <td>{user.last_login}</td>
                      <td>
                        <button onClick={() => openModal(2, user.uid, user.name, user.url_image, user.role, user.status, user.social_profile, user.promote, user.rating, user.last_login)} type="button" className="btn btn-light"
                          data-bs-toggle="modal" data-bs-target="#modalUsers">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      <div id='modalUsers' className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" />

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-user-plus"></i></span>
                <input type="text" id="name" placeholder="name" className="form-control" value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-image"></i></span>
                <input type="text" id="url_image" placeholder="url_image" className="form-control" value={url_image}
                  onChange={(e) => setUrl_image(e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" for="inputGroupSelect01"><i className="fa-solid fa-check"></i></label>
                <select className="form-select" id="inputGroupSelect01" onChange={(e) => setRole(e.target.value)}>
                  <option selected>Choose...</option>
                  <option value="administrator">administrator</option>
                  <option value="viewer">viewer</option>
                  <option value="moderator">moderator</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" for="inputGroupSelect01"><i className="fa-solid fa-filter"></i></label>
                <select className="form-select" id="inputGroupSelect01" onChange={(e) => setStatus(e.target.value)}>
                  <option selected>status...</option>
                  <option value="true">active</option>
                  <option value="false">inactive</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" for="inputGroupSelect01"><i className="fa-solid fa-list-check"></i></label>
                <select className="form-select" id="inputGroupSelect01" onChange={(e) => setSocial_profile(e.target.value)}>
                  <option selected>network...</option>
                  <option value="facebook">facebook</option>
                  <option value="twitter">twitter</option>
                  <option value="google">google</option>
                  <option value="instagram">instagram</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" for="inputGroupSelect01"><i className="fa-solid fa-filter"></i></label>
                <select className="form-select" id="inputGroupSelect01" onChange={(e) => setPromote(e.target.value)}>
                  <option selected>promote...</option>
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-star-half-stroke"></i></span>
                <input type="text" id="rating" placeholder="rating" className="form-control" value={rating}
                  onChange={(e) => setRating(e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-calendar"></i></span>
                <input type="date" id="last_login" placeholder="last_login" className="form-control" value={last_login}
                  onChange={(e) => setLast_login(e.target.value)} />
              </div>

              <div className="d-grid col-6 mx-auto">
                <button className="btn btn-success" onClick={() => sendRequest('POSTPUT', uid)}>
                  <i className="fa-solid fa-floppy-disk"></i> Save
                </button>
                {operation == 2 &&
                  <button className="btn btn-danger" onClick={() => sendRequest('DELETE', uid)}>
                    <i className="fa-solid fa-trash" ></i> Delete
                  </button>
                }
              </div>
              <div className="modal-footer">
                <button id="btnClose" className="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users