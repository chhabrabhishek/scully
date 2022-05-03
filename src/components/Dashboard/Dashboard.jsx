import './Dashboard.css';
import Button from '@mui/material/Button';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import TransactionList from '../TransactionList/TransactionList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';

const Dashboard = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [transactionType, setTransactionType] = useState('');
    const [transactionWith, setTransactionWith] = useState('');
    const [transactionReason, setTransactionReason] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [error, setError] = useState(false);

    useEffect(() => {
        if(!sessionStorage.getItem('username')) {
            navigate('/signIn')
        }
    })

    const handleTransactionTypeChange = (event) => {
        setTransactionType(event.target.value);
    };

    const handleTransactionDateChange = (event) => {
        setTransactionDate(event.target.value);
    }

    const handleTransactionWithChange = (event) => {
        setTransactionWith(event.target.value);
    }

    const handleTransactionReasonChange = (event) => {
        setTransactionReason(event.target.value);
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const handleClickOpen = () => {
        fetch('https://scully-server.herokuapp.com/get_users', {
            method: 'GET'
        })
        .then(response => {
            response.json().then(data => {
                const users = data.data.users.filter(item => {
                    return item.username != sessionStorage.getItem("username");
                })
                setUsersList(users);
            })
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTransaction = () => {
        if(!transactionType || !transactionDate || !transactionWith || !amount) {
            setError(true);
        }
        else {
            setError(false);
            const body = {
                transactionType: transactionType,
                transactionDate: transactionDate,
                transactionFrom: sessionStorage.getItem('username'),
                transactionWith: transactionWith,
                reason: transactionReason,
                amount: amount
            }

            const headers = {
                "content-type": "application/json"
            }

            fetch(`https://scully-server.herokuapp.com/add_transaction`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            })
            .then(response => {
                response.json().then(data => {
                    handleClose();
                })
            })
        }
    }

    return (
        <div className='dashboardParent'>
            <div className='addTransactionParent'>
                <p className='greeting'>Hello @{sessionStorage.getItem('username')}</p>
                <Button className='addTransactionButton' variant="text" startIcon={<PaidRoundedIcon />} onClick={handleClickOpen}>
                    Add a Transaction
                </Button>
            </div>
            <div className='transactionListBinder'>
                <TransactionList />
            </div>
            <Dialog open={open} onClose={handleClose} className="dialog">
                <DialogTitle>Add a Transaction</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="simple-select-label">Transaction Type</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            value={transactionType}
                            label="Transaction Type"
                            onChange={handleTransactionTypeChange}>
                            <MenuItem value='lends'>Lends</MenuItem>
                            <MenuItem value='borrows'>Borrows</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Transaction Date"
                        margin="dense"
                        type="date"
                        fullWidth
                        value={transactionDate}
                        onChange={handleTransactionDateChange}
                    />
                    <TextField 
                        label="Transaction From"
                        margin="dense"
                        type="text"
                        fullWidth
                        disabled
                        defaultValue={`@${sessionStorage.getItem("username")}`}
                        variant="outlined" />
                    <FormControl fullWidth>
                        <InputLabel id="simple-select-label">Transaction With</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            value={transactionWith}
                            label="Transaction With"
                            onChange={handleTransactionWithChange}>
                            {
                                usersList.map(item => <MenuItem key={item.username} value={item.username}>{item.username}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        label="Transaction Reason"
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        value={transactionReason}
                        onChange={handleTransactionReasonChange}
                    />
                    <TextField 
                        label="Amount"
                        margin="dense"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                    {error && <p style={{margin: '0', color: 'red'}}>Values can't be empty</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddTransaction}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Dashboard;