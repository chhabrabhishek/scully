import './TitleBar.css';
import Button from '@mui/material/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const TitleBar = () => {
    return (
        <div className='titleBarParent'>
            <p className='title'>
                Scully
            </p>
            <Button variant="outlined" startIcon={<LogoutRoundedIcon />}>
                Sign Out
            </Button>
        </div>
    )
}

export default TitleBar;