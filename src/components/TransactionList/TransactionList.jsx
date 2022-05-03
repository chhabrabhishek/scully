import { useEffect, useState } from 'react';
import Transaction from '../Transaction/Transaction';
import './TransactionList.css';

const TransactionList = () => {

    const [filterParam, setFilterParam] = useState('');
    const [searchParam, setSearchParam] = useState('')
    const [transactionList, setTransactionList] = useState([]);
    const [visibleTransactionList, setvisibleTransactionList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/get_transactions/${sessionStorage.getItem('username')}`, {
            method: 'GET'
        })
        .then(response => {
            response.json().then(data => {
                setTransactionList(data.data.transactions);
                setvisibleTransactionList(data.data.transactions)
            })
        })
    }, [])

    const handleSearchTransactions = (event) => {
        setSearchParam(event.target.value);
        let tempTransactionList;
        if(!event.target.value) {
            setvisibleTransactionList(transactionList);
            tempTransactionList = transactionList;
        }
        else{
            tempTransactionList = transactionList.filter(item => {
                return item.reason.includes(event.target.value)
            });
        }
        if(filterParam) {
            tempTransactionList = tempTransactionList.filter(item => {
                return (item.transactionFrom == sessionStorage.getItem("username") && item.transactionType == filterParam) 
                    || (item.transactionWith == sessionStorage.getItem("username") && item.transactionType != filterParam)
            });
        }
        setvisibleTransactionList(tempTransactionList);
    }

    const handleFilterTransactions = (event) => {
        setFilterParam(event.target.value);
        let tempTransactionList;
        if(!event.target.value) {
            setvisibleTransactionList(transactionList);
            tempTransactionList = transactionList;
        }
        else {
            tempTransactionList = transactionList.filter(item => {
                return (item.transactionFrom == sessionStorage.getItem("username") && item.transactionType == event.target.value) 
                    || (item.transactionWith == sessionStorage.getItem("username") && item.transactionType != event.target.value)
            });
        }
        if(searchParam) {
            tempTransactionList = tempTransactionList.filter(item => {
                return item.reason.includes(searchParam)
            });
        }
        setvisibleTransactionList(tempTransactionList);
    }

    return (
        <div className='transactionListParent'>
            <div className='searchFilterParent'>
                <input className='searchTransactions' type='text' placeholder='Search transactions ...' onChange={handleSearchTransactions} />
                <select className='filterTransactionType' defaultValue='' onChange={handleFilterTransactions}>
                    <option value=''>Choose a type ...</option>
                    <option value='lends'>Lends</option>
                    <option value='borrows'>Borrows</option>
                </select>
            </div>
            {
                visibleTransactionList.map(item => <Transaction key={item.transactionId} transactionInfo={item} />)
            }
        </div>
    )
}

export default TransactionList;