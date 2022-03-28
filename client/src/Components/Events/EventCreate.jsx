import * as React from 'react';
// import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateEvent, getAllEvents } from '../../Api/Event';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                E-Summit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export default function Create() {
    // let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const res = await CreateEvent(data);

    }

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create a new event
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Event Name"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            id="fees"
                            label="Fees"
                            name="fees"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="description"
                            label="description"
                            name="description"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            id="startDate"
                            label="Start Date"
                            type="date"
                            defaultValue="2022-12-25"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            id="endDate"
                            label="End Date"
                            type="date"
                            defaultValue="2022-12-25"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="location"
                            label="Location of Event"
                            name="location"
                            autoFocus
                        />
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Event
                        </Button>


                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}