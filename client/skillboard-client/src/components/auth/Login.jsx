import { useState, useContext } from 'react';
import { api } from '../../api';
import { AuthContext } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.token);
            navigate('/'); 
        } 
        catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.authForm}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>

                {error && <p className={styles.error}>{error}</p>}

                <p>
                    Don't have an account? <Link to="/register">Register Here!</Link>
                </p>
            </div>
        </div>
    );
}