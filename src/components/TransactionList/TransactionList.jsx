import { useEffect, useState } from 'react';
import Transaction from '../Transaction/Transaction';
import './TransactionList.css';

const TransactionList = () => {

    const [transactionList, setTransactionList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/getTransactions', {
            method: 'GET'
        })
        .then(response => {
            response.json().then(data => {
                setTransactionList(data.data.transactions);
            })
        })
    }, [])

    return (
        <div className='transactionListParent'>
            {
                transactionList.map(item => <Transaction key={item.transactionId} transactionInfo={item} />)
            }
        </div>
    )
}

export default TransactionList;