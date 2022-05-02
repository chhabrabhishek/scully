import Transaction from '../Transaction/Transaction';
import './TransactionList.css';

const TransactionList = () => {

    const transactionList = [
        {
            transactionId: '1',
            transactionType: 'lends',
            transactionDate: '2nd May 2022',
            transactionStatus: 'unpaid',
            transactionFrom: 'abhishekchhabra',
            transactionWith: 'anujchhabra',
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dignissimos cum, natus nulla quidem, sint iusto quam accusamus explicabo nobis quisquam. Dolor itaque aperiam, quia minus ratione fuga accusantium voluptates.',
            money: '2500'
        },
        {
            transactionId: '2',
            transactionType: 'borrows',
            transactionDate: '22nd April 2022',
            transactionStatus: 'paid',
            transactionFrom: 'abhishekchhabra',
            transactionWith: 'anujchhabra',
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dignissimos cum, natus nulla quidem, sint iusto quam accusamus explicabo nobis quisquam. Dolor itaque aperiam, quia minus ratione fuga accusantium voluptates.',
            money: '1500'
        },
        {
            transactionId: '3',
            transactionType: 'borrows',
            transactionDate: '1st April 2022',
            transactionStatus: 'paid',
            transactionFrom: 'abhishekchhabra',
            transactionWith: 'anujchhabra',
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dignissimos cum, natus nulla quidem, sint iusto quam accusamus explicabo nobis quisquam. Dolor itaque aperiam, quia minus ratione fuga accusantium voluptates.',
            money: '3500'
        },
        {
            transactionId: '4',
            transactionType: 'lends',
            transactionDate: '2nd February 2022',
            transactionStatus: 'paid',
            transactionFrom: 'abhishekchhabra',
            transactionWith: 'anujchhabra',
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dignissimos cum, natus nulla quidem, sint iusto quam accusamus explicabo nobis quisquam. Dolor itaque aperiam, quia minus ratione fuga accusantium voluptates.',
            money: '2000'
        }
    ]

    return (
        <div className='transactionListParent'>
            {
                transactionList.map(item => <Transaction key={item.transactionId} transactionInfo={item} />)
            }
        </div>
    )
}

export default TransactionList;