import './Dashboard.css';
import Button from '@mui/material/Button';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import TransactionList from '../TransactionList/TransactionList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!sessionStorage.getItem('username')) {
            navigate('/signIn')
        }
    })

    return (
        <div className='dashboardParent'>
            <div className='addTransaction'>
                <p className='greeting'>Hello @{sessionStorage.getItem('username')}</p>
                <Button className='addTransactionButton' variant="text" startIcon={<PaidRoundedIcon />}>
                    Add a Transaction
                </Button>
            </div>
            <div className='transactionListBinder'>
                <p className='textAllTransactions'>
                    All Transactions
                </p>
                <TransactionList />
            </div>
        </div>
    )
}

export default Dashboard;