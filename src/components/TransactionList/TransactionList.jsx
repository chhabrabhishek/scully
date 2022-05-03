import { useEffect, useState } from 'react';
import Transaction from '../Transaction/Transaction';
import './TransactionList.css';
import CanvasJSReact from '../../assets/canvasjs/canvasjs.react';

const TransactionList = () => {

    const [options, setOptions] = useState({})
    const [filterParam, setFilterParam] = useState('');
    const [searchParam, setSearchParam] = useState('');
    const [balance, setBalance] = useState(sessionStorage.getItem("balance"));
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalLent, setTotalLent] = useState(0);
    const [transactionList, setTransactionList] = useState([]);
    const [visibleTransactionList, setvisibleTransactionList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/get_transactions/${sessionStorage.getItem('username')}`, {
            method: 'GET'
        })
        .then(response => {
            response.json().then(data => {
                setTransactionList(data.data.transactions);
                setvisibleTransactionList(data.data.transactions);
                let tempTotalLent = 0;
                let tempTotalDebt = 0;
                let tempBalance = Number.parseInt(balance);
                const dataPointsLent = [];
                const dataPointsBorrowed = [];
                data.data.transactions.map(item => {
                    if(item.transactionFrom == sessionStorage.getItem("username")) {
                        if(item.transactionType == 'lends') {
                            tempTotalLent = tempTotalLent + item.amount;
                            tempBalance = tempBalance - item.amount;
                            dataPointsLent.push({
                                x: new Date(item.transactionDate),
                                y: item.amount
                            })
                        }
                        if(item.transactionType == 'borrows') {
                            tempTotalDebt = tempTotalDebt + item.amount;
                            tempBalance = tempBalance + item.amount;
                            dataPointsBorrowed.push({
                                x: new Date(item.transactionDate),
                                y: item.amount
                            })
                        }
                    }
                    if(item.transactionWith == sessionStorage.getItem("username")) {
                        if(item.transactionType == 'borrows') {
                            tempTotalLent = tempTotalLent + item.amount;
                            tempBalance = tempBalance - item.amount;
                            dataPointsLent.push({
                                x: new Date(item.transactionDate),
                                y: item.amount
                            })
                        }
                        if(item.transactionType == 'lends') {
                            tempTotalDebt = tempTotalDebt + item.amount;
                            tempBalance = tempBalance + item.amount;
                            dataPointsBorrowed.push({
                                x: new Date(item.transactionDate),
                                y: item.amount
                            })
                        }
                    }
                });
                setOptions({
                    animationEnabled: true,
                    title:{
                        text: "Credit and Debit Transactions"
                    },
                    axisX: {
                        valueFormatString: "YYYY MM DD"
                    },
                    axisY: {
                        title: "Amount",
                        prefix: "$"
                    },
                    data: [
                        {
                            yValueFormatString: "$#,###",
                            xValueFormatString: "YYYY MM DD",
                            type: "spline",
                            dataPoints: dataPointsLent,
                            name: 'Lent',
                            showInLegend: true,
                        },
                        {
                            yValueFormatString: "$#,###",
                            xValueFormatString: "YYYY MM DD",
                            type: "spline",
                            dataPoints: dataPointsBorrowed,
                            name: 'Borrowed',
                            showInLegend: true,
                        }
                    ]
                })
                setBalance(tempBalance);
                setTotalDebt(tempTotalDebt);
                setTotalLent(tempTotalLent);
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
            <div className='statisticsParent'>
                <p className='statistics'>Balance: ₹{balance}</p>
                <p className='statistics'>Total Debt: ${totalDebt}</p>
                <p className='statistics'>Total Lent: ${totalLent}</p>
            </div>
            <div>
                <CanvasJSReact.CanvasJSChart options = {options} />
            </div>
            <p className='textAllTransactions'>
                All Transactions
            </p>
            <p style={{margin: '0', color: '#696d97', fontSize: 'small'}}>
                {visibleTransactionList.length} transactions available
            </p>
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