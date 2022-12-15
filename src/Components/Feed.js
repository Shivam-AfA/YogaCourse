import * as React from 'react';
import { auth } from "../firebase.mjs";
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { database } from '../firebase.mjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

function Feed() {

    console.log(auth.currentUser.uid);


    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [age, setAge] = React.useState('');
    const [batch, setBatch] = React.useState('');
    const [originalBatch, setOriginalBatch] = React.useState('');
    const [month, setMonth] = React.useState(0);
    const [flag, setFlag] = React.useState(false);


    React.useEffect(() => {
        const loadData = async () => {
            let id = auth.currentUser.uid;
            let data = await database.users.doc(auth.currentUser.uid).get();
            let mainData = await data.data();
            setName(mainData.name);
            setEmail(mainData.email);
            setMobile(mainData.mobile);
            setAge(mainData.age);
            setOriginalBatch(mainData.batch);
            setBatch(mainData.batch);
            setMonth(mainData.month)
        }

        loadData();

    }, [])

    const handleChange = async (event) => {
        await setBatch(event.target.value);
        console.log(event.target.value);
        console.log(batch);
        console.log(originalBatch);
        event.target.value !== originalBatch ?
            setFlag(true) :
            setFlag(false);
        console.log(flag);

    };



    const { logout } = React.useContext(AuthContext);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "flex-end", flexDirection: 'column' }}>
            <button style={{ fontFamily: "Montserrat", background: "#000", color: "#fff", marginRight: '50px', marginTop: '30px' }} onClick={logout}>Logout</button>
            <div className='comp' style={{ width: '70%', marginTop: "5rem" }}>
                <Box>
                    <h3>Name: {name}</h3>
                    <h3>Email: {email}</h3>
                    <h3>Mobile: {mobile}</h3>
                    <h3>Age: {age}</h3>
                    <h3>Batch: {originalBatch}</h3>
                    <h3>Month Enrolled: {month}</h3>
                </Box>


                <FormControl >
                    <InputLabel id="demo-simple-select-label">Change Batch</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={batch}
                        label="Change Batch"
                        onChange={handleChange}
                    >
                        <MenuItem value={'6 AM - 7 AM'}>6 AM - 7 AM</MenuItem>
                        <MenuItem value={'7 AM - 8 AM'}>7 AM - 8 AM</MenuItem>
                        <MenuItem value={'8 AM - 9 AM'}>8 AM - 9 AM</MenuItem>
                        <MenuItem value={'5 PM - 6 PM'}>5 PM - 6 PM</MenuItem>
                    </Select>
                </FormControl>
                {flag ? <Alert severity="success" style={{width: "30%", marginTop: "15px"}}>
                    <strong>Hurray!</strong>Your batch will change from next month
                </Alert>
                : <Alert severity="info" style={{width: "30%", marginTop: "15px"}}>
                    You can change your batch here
                </Alert>}



            </div>
        </div>

    )
}

export default Feed;