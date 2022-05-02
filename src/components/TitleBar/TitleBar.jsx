import './TitleBar.css';
import Button from '@mui/material/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';

const TitleBar = (props) => {

    const navigate = useNavigate();

    const handleHomeRouting = () => {
        navigate('/home');
    }

    const handleSignOut = () => {
        navigate('/signIn');
    }

    return (
        <div className='titleBarParent'>
            <p className='title' onClick={handleHomeRouting}>
                Scully
            </p>
            {
                props.showSignOut && 
                <Button className='signOutButton' variant="text" startIcon={<LogoutRoundedIcon className='signOutIcon' />} onClick={handleSignOut}>
                    Sign Out
                </Button>
            }
        </div>
    )
}

export default TitleBar;