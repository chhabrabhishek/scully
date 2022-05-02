import './Dashboard.css';
import Button from '@mui/material/Button';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import TransactionList from '../TransactionList/TransactionList';

const Dashboard = () => {
    return (
        <div className='dashboardParent'>
            <div className='addTransaction'>
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