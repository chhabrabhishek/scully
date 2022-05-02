import './TitleBar.css';
import Button from '@mui/material/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';

const TitleBar = () => {

    const navigate = useNavigate();

    const handleHomeRouting = () => {
        navigate('/home');
    }

    return (
        <div className='titleBarParent'>
            <p className='title' onClick={handleHomeRouting}>
                Scully
            </p>
            <Button className='signOutButton' variant="text" startIcon={<LogoutRoundedIcon className='signOutIcon' />}>
                Sign Out
            </Button>
        </div>
    )
}

export default TitleBar;