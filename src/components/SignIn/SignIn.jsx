import './SignIn.css';
import { useState } from 'react';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signInError, setSignInError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSignIn = () => {
        if(!username || !password) {
            setSignInError(true);
            setErrorMessage("Username or password can't be empty")
        }
        else {
            setSignInError(false);

            const body = {
                username: username,
                password: password
            }

            const headers = {
                "content-type": "application/json"
            }

            fetch(`http://localhost:8000/user_login`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            })
            .then(response => {
                response.json().then(data => {
                    if(!data.userExists) {
                        setSignInError(true);
                        setErrorMessage("Username and password doesn't match");
                    }
                    if(data.userExists) {
                        setSignInError(false);
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('balance', data.balance);
                        navigate('/home');
                    }
                })
            })
        }
    }

    const handleToSignUp = () => {
        navigate('/signUp');
    }

    return (
        <div className='signInSignUpParent'>
            <div className='signInSignUpContent'>
                <div className='signInSignUpTitle'>LOGIN</div>
                <p className='signInSignUpSubTitle'>Let's manage your transactions</p>
                <div className='signInSignUpFields'>
                    <p className='signInSignUpFieldsTitle'>Username:</p>
                    <input className='signInSignUpInput' placeholder='e.g. abhishek_chhabra@gmail.com' onChange={handleUsername} />
                </div>
                <div className='signInSignUpFields'>
                    <p className='signInSignUpFieldsTitle'>Password:</p>
                    <input className='signInSignUpInput' placeholder='•••••••' type='password' onChange={handlePassword} />
                </div>
                <div className='signInSignUpBtnParent'>
                    <button className='signInSignUpBtn' onClick={handleSignIn}>
                        <LockRoundedIcon style={{fontSize: 'medium', color: '#3f4156', marginRight: '5px'}} />
                        Login
                    </button>
                    {signInError?<p className='signInSignUpError'>{errorMessage}</p>:<></>}
                </div>
                <p className='signInSignUpBottonText'>Haven't signed up yet?</p>
                <p className='toSignUpSignIn' onClick={handleToSignUp}>Sign Up</p>
            </div>
        </div>  
    );
}

export default SignIn;