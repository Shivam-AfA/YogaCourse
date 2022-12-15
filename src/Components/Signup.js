import * as React from 'react';
import { auth } from '../firebase.mjs';
import { AuthContext } from '../Context/AuthContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import './Login.css'
import TextField from '@mui/material/TextField';
import { Link, useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import signUpbackground from '../images/signupBg.jpg'
import { database } from '../firebase.mjs';
import axios from 'axios';
import Alert from '@mui/material/Alert';


export default function Signup() {
    const useStyles = makeStyles({
        logo: {
            textAlign: "center",
            fontWeight: "bold",
            color: ""
        },

        textBox: {
            "&&": {
                marginTop: "10px"
            }
        },

        buttonWrapper: {
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "column"
        }

    })
    let dt = new Date();
    const { month } = { "month": dt.getMonth() + 1 };
    // console.log({ month });
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [age, setAge] = React.useState('');
    const [batch, setBatch] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const history = useHistory();
    const { signup } = React.useContext(AuthContext);


    const handleChange = (event) => {
        setBatch(event.target.value);
    };

    // why is async used here?
    const handleClick = async () => {
        try {
            // setLoading(true);
            if (name == '' || email == '' || password == '' || mobile == '' || age == '' || batch == '') {
                await setError('Please fill all the details!')
            }
            else if (age < 18 || age > 65) {
                await setError('You should be above 18 years and below 65 years of age');
            }
            else {

                let userObj = await signup(email, password);
                console.log(auth.currentUser);
                const { id } = { "id": `${auth.currentUser.uid}` }
                // console.log( id );
                axios.post("http://localhost:4000/create",
                    {
                        id,
                        name,
                        email,
                        mobile,
                        age,
                        batch,
                        month
                    })

                history.push('/');
            }
        }
        catch (err) {
            setError(err);
            setTimeout(() =>
                setError(''), 2000)
        }
    }


    return (
        <div style={{
            backgroundImage: `url(${signUpbackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh'
        }
        }>
            <div className='loginWrapper' style={{ justifyContent: "flex-end", marginRight: "10px" }}>
                <div className='loginCard'>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            {error != '' &&
                                <Alert style={{ maxWidth: 345, marginBottom: "10px" }} severity="error">{error}</Alert>
                            }

                            <Typography className={classes.logo} variant="h5" component="div">
                                Begin your Journey today!
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                            </Typography>
                            <Typography variant="body2" color="text.secondary">

                            </Typography>

                            <TextField className={classes.textBox} label="Full Name" fullWidth id="fullWidth" margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
                            <TextField className={classes.textBox} label="Email address" type="email" fullWidth id="fullWidth" margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField className={classes.textBox} label="Create password" fullWidth id="fullWidth" margin="dense" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <TextField className={classes.textBox} label="Mobile number" fullWidth id="fullWidth" margin="dense" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            <TextField className={classes.textBox} label="Age" fullWidth id="fullWidth" margin="dense" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                            <FormControl className={classes.textBox} fullWidth>
                                <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={batch}
                                    label="Batch"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'6 AM - 7 AM'}>6 AM - 7 AM</MenuItem>
                                    <MenuItem value={'7 AM - 8 AM'}>7 AM - 8 AM</MenuItem>
                                    <MenuItem value={'8 AM - 9 AM'}>8 AM - 9 AM</MenuItem>
                                    <MenuItem value={'5 PM - 6 PM'}>5 PM - 6 PM</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>


                        <CardActions className={classes.buttonWrapper}>
                            <Button style={{
                                marginBottom: "15px",
                                color: "#ffffff",
                                backgroundColor: "#000000"
                            }} variant="outlined" disabled={loading} onClick={handleClick}><span style={{ fontWeight: 'bold', marginLeft: '5px', color: "#ffa500" }}> Sign up!</span></Button>
                            <Link to="/" style={{ textDecoration: "none" }}><Button style={{
                                width: "190px",
                                marginLeft: "0px",
                                color: "#ffffff",
                                backgroundColor: "#000000"
                            }} variant="outlined">Back to login</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div >
    );
}

