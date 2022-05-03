import { useState } from 'react';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [balance, setBalance] = useState(0);
    const [signUpError, setSignUpError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleBalance = (e) => {
        setBalance(e.target.value);
    }

    const handleSignUp = () => {
        if(!username || !password || !balance) {
            setSignUpError(true);
            setErrorMessage("No field can be empty.");
        }
        else {
            setSignUpError(false);

            const body = {
                username: username,
                password: password,
                balance: balance
            }

            const headers = {
                "content-type": "application/json"
            }

            fetch(`http://localhost:8000/user_sign_up`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            })
            .then(response => {
                response.json().then(data => {
                    if(data.usernameExists) {
                        setSignUpError(true);
                        setErrorMessage("Username already exists");
                    }
                    if(data.userAdded) {
                        setSignUpError(false);
                        sessionStorage.setItem('username', username);
                        navigate('/home');
                    }
                })
            })
        }
    }

    const handleToSignIn = () => {
        navigate('/signIn')
    }

    return (
        <div className='signInSignUpParent'>
            <div className='signInSignUpContent'>
                <div className='signInSignUpTitle'>REGISTER</div>
                <p className='signInSignUpSubTitle'>Let's manage your transactions</p>
                <div className='signInSignUpFields'>
                    <p className='signInSignUpFieldsTitle'>Username:</p>
                    <input className='signInSignUpInput' placeholder='e.g. abhishek_chhabra@gmail.com' onChange={handleUsername} />
                </div>
                <div className='signInSignUpFields'>
                    <p className='signInSignUpFieldsTitle'>Password:</p>
                    <input className='signInSignUpInput' placeholder='•••••••' type='password' onChange={handlePassword} />
                </div>
                <div className='signInSignUpFields'>
                    <p className='signInSignUpFieldsTitle'>Balance:</p>
                    <input className='signInSignUpInput' placeholder='e.g. 5000' type='number' onChange={handleBalance} />
                </div>
                <div className='signInSignUpBtnParent'>
                    <button className='signInSignUpBtn' onClick={handleSignUp}>
                        <LockRoundedIcon style={{fontSize: 'medium', color: '#3f4156', marginRight: '5px'}} />
                        Register
                    </button>
                    {signUpError?<p className='signInSignUpError'>{errorMessage}</p>:<></>}
                </div>
                <p className='signInSignUpBottonText'>Already signed up?</p>
                <p className='toSignUpSignIn' onClick={handleToSignIn}>Sign In</p>
            </div>
        </div>
    );
}

export default SignUp;