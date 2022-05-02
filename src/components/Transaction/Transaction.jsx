import './Transaction.css';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

const Transaction = () => {
    return (
        <div className='transactionParent'>
            <div className='userAndDateParent'>
                <p className='username'>Lend To @anujchhabra</p>
                <p className='date'>2nd May 2022</p>
            </div>
            <p className='price'>₹ 2500</p>
            <p className='reason'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus iusto adipisci recusandae ab dolorem, omnis, non incidunt rem facere maiores soluta consectetur fuga provident alias reprehenderit quidem at hic assumenda!</p>
            <hr className='divider'></hr>
            <div className='paidParent'>
                <RadioButtonUncheckedRoundedIcon className='paidIcon' fontSize='small' />
                <p className='paid'>Unpaid</p>
            </div>
        </div>
    )
}

export default Transaction;