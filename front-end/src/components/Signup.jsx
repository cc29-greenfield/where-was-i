import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login.css';
import Swal from 'sweetalert2';
const firebase = require('firebase/app');
const fire = require('firebase/auth');

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID, 
  appId: process.env.REACT_APP_APP_ID,
});
const auth = fire.getAuth(app);

function Signup({ setIsSignUp }) {
  const [loginEmail, setloginEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createUsername, setCreateUsername] = useState('');

  function createUser(e) {
    let check = true;
    e.preventDefault();
    fire
      .createUserWithEmailAndPassword(auth, loginEmail, createPassword)
      .then(async (userCredential) => {
        var user = userCredential.user;
        const checkstat = await fetch('https://where-was-i-server.onrender.com/user', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            auth_token: user.uid,
            username: createUsername,
            email: user.email,
          }),
        }).then(Swal.fire('Good job your account was created you can login'));
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${errorMessage}`,
        });
      });
    const node = document.getElementsByClassName('user1');
    node[0].value = '';
    node[1].value = '';
    node[2].value = '';
    setCreatePassword('');
    setloginEmail('');
    setCreateUsername('');
    setIsSignUp(false);
  }
  function backToLogin() {
    setIsSignUp(false);
  }

  return (
    <div className='signup-container'>
      <h2>Signup for Where Was I?</h2>
      <h3>Keep track of all your TV show progress in one place.</h3>
      <form onSubmit={createUser} className='form-signup'>
        <div className='user-field'>
          <label for='username'>
            <FontAwesomeIcon icon={faUser} />
          </label>
          <input
            className='user1'
            placeholder='Username'
            type='text'
            name='username'
            value={createUsername}
            onChange={(event) => setCreateUsername(event.target.value)}
          />
        </div>
        <div className='email-field'>
          <label for='email'>
            {' '}
            <FontAwesomeIcon icon={faEnvelope} />
          </label>
          <input
            className='user1'
            placeholder='Email'
            type='text'
            name='email'
            value={loginEmail}
            onChange={(event) => setloginEmail(event.target.value)}
          />
        </div>
        <div className='pass-field'>
          <label for='password'>
            <FontAwesomeIcon icon={faLock} />
          </label>
          <input
            className='user1'
            placeholder='Password'
            type='password'
            name='password'
            value={createPassword}
            onChange={(event) => setCreatePassword(event.target.value)}
          />
        </div>
        <div className='btn-field'>
          <button type='submit' className='btn'>
            Signup
          </button>
          <button onClick={backToLogin} className='btn delete-btn'>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
