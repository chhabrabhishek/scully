import Transaction from '../Transaction/Transaction';
import './TransactionList.css';

const TransactionList = () => {
    return (
        <div className='transactionListParent'>
            {
                [1,2,3,4,5].map(item => <Transaction />)
            }
        </div>
    )
}

export default TransactionList;