import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import './Login.css'
import TextField from '@mui/material/TextField';
import { Link, Route, useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { fontWeight } from '@mui/system';
import loginBackground from '../images/loginBg.jpg'



export default function Login() {
    const useStyles = makeStyles({
        logo: {
            textAlign: "center",
            color: ""
        },

        textBox: {
            "&&": {
                marginTop: "15px"
            }
        },

        buttonWrapper: {
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "column"

        },
    })
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const { login } = React.useContext(AuthContext);

    const handleClick = async () => {
        try {
            setError('');
            setLoading(true);
            let res = await login(email, password);
            setLoading(false);
            history.push('/');

        }
        catch (err) {
            setError(err);
            setTimeout(() => {
                setError('');
            }, 2000)
            setLoading(false);
        }
    }



    return (
        <div style={{
            backgroundImage: `url(${loginBackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh'
        }
        }>
            <div className='loginWrapper' style={{justifyContent: "flex-end", marginRight: "10px"}}>
                <div className='loginCard'>
                    <Card sx={{ maxWidth: 345, height: 400 }}>
                        <CardContent>
                            <Typography className={classes.logo} variant="h3" component="div">
                                ᎽᎾᎶᎪ
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                            </Typography>
                            <Typography variant="body2" color="text.secondary">

                            </Typography>
                            <TextField className={classes.textBox} label="Email address" fullWidth id="fullWidth" margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField className={classes.textBox} label="Password" fullWidth id="fullWidth" type="password" margin="dense" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </CardContent>
                        <CardActions className={classes.buttonWrapper}>
                            <Button style={{
                                width: "150px",
                                marginBottom: "25px",
                                // fontFamily: 'Roboto Mono',
                                color: "#ffffff",
                                backgroundColor: "#000000"
                            }} variant="outlined" onClick={handleClick} disabled={loading}>Login</Button>

                            <Link to="/signup" style={{ textDecoration: "none" }}><Button style={{
                                width: "240px",
                                marginLeft: "0px",
                                // fontFamily: 'Roboto Mono',
                                color: "#ffffff",
                                backgroundColor: "#000000"
                            }} variant="outlined">New here? <span style={{ fontWeight: 'bold', marginLeft: '5px', color: "#ffa500" }}> Enroll Now!</span></Button>
                            </Link>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    );
}

