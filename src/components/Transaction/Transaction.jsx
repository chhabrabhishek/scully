import './Transaction.css';
import Button from '@mui/material/Button';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState } from 'react';

const Transaction = (props) => {

    const [transactionStatus, setTransactionStatus] = useState(props.transactionInfo.transactionStatus == 'paid'? true: false);

    const handleMarkAsPaid = () => {
        setTransactionStatus(true);
    }

    return (
        <div className='transactionParent'>
            <div className='userAndDateParent'>
                <p className='username'>{props.transactionInfo.transactionType == 'lends'? 'Lend To': 'Borrowed From'} @{props.transactionInfo.transactionWith}</p>
                <p className='date'>{props.transactionInfo.transactionDate}</p>
            </div>
            <p className='price'>₹ {props.transactionInfo.money}</p>
            <p className='reason'>{props.transactionInfo.reason}</p>
            <hr className='divider'></hr>
            <div className='paidMarkButtonParent'>
                <div className='paidParent'>
                    {transactionStatus? <CheckCircleRoundedIcon className='paidIcon' fontSize='small' />: <RadioButtonUncheckedRoundedIcon className='paidIcon' fontSize='small' />}
                    <p className='paid'>{transactionStatus? 'Paid': 'Unpaid'}</p>
                </div>
                {props.transactionInfo.transactionType == 'lends' && !transactionStatus &&
                    <Button className='markAsPaidButton' variant="text" onClick={handleMarkAsPaid}>
                        Mark as paid
                    </Button>
                }
            </div>
        </div>
    )
}

export default Transaction;