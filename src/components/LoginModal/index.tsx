import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { AppContext } from '../../App';
import { login } from '../../services/user';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
    const appContext = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => appContext.setLoginModalVisible(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        login(email, password).then(res => {
            localStorage.setItem('token', res.data.token)
            appContext.setLogged(true);
            handleClose();
        }).catch(err => {
            setError(err.response.data.message);
        }).finally(() => {
            setLoading(false);
        });
    };

  return (
    <Modal
        open={appContext.loginModalVisible}
        onClose={handleClose}
        aria-labelledby="modal-login-title"
        aria-describedby="modal-login-description"
    >
        <Box sx={style}>
            <Typography id="modal-login-title" variant="h6" component="h2">
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ height: '50px', marginTop: '10px' }}>
                    {
                        loading ? <CircularProgress /> : 'Submit'
                    }
                </Button>
            </form>
        
            {error && <Alert icon={<CloseIcon fontSize="inherit" />} severity="error" sx={{ marginTop: '20px' }}>
                {error}
            </Alert>}
        </Box>
    </Modal>
  );
};