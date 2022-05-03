import './SignIn.css';
import { useState } from 'react';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signInError, setSignInError] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSignIn = () => {
        if(!username || !password) {
            setSignInError(true);
        }
        else {
            setSignInError(false);
            sessionStorage.setItem('username', username);
            navigate('/home');
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
                    {signInError?<p className='signInSignUpError'>Username or password are either empty or doesnot exist.</p>:<></>}
                </div>
                <p className='signInSignUpBottonText'>Haven't signed up yet?</p>
                <p className='toSignUpSignIn' onClick={handleToSignUp}>Sign Up</p>
            </div>
        </div>  
    );
}

export default SignIn;