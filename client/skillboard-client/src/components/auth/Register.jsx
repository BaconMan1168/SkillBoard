import { useState, useContext } from 'react';
import { api } from '../../api';
import { AuthContext } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css'

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { email, name, password });
            login(res.data.token);
            navigate('/topics/select'); 
        } 
        catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.authForm}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">Register</button>
                </form>

                {error && <p className={styles.error}>{error}</p>}

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
