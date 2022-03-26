import { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const { loading, request, error } = useHttp();

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('Data', data);
        } catch (e) {
            
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {
            
        }
    }

    return (
        <div>
            <h1>
                Auth page
            </h1>

            Email <input type="text" name="email" autoComplete="off" value={form.email} onChange={changeHandler} />
            <br />
            Password <input type="password" name="password" autoComplete="off" value={form.password} onChange={changeHandler} />
            <br />
            <button type="button" onClick={loginHandler} disabled={loading}>Login</button>
            <br />
            <br />
            <button type="button" onClick={registerHandler} disabled={loading}>Register</button>
            <br />
            {!!error && ( <p>Error: {error}</p> )}
        </div>
    )
}

export default AuthPage;
