import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && password.trim()) {
            localStorage.setItem('loggedIn', 'true');
            navigate('/calendar');
            window.location.reload();
        } else {
            alert('Please enter a valid email and password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Clinic Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 cursor-pointer text-white w-full py-2 rounded" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
