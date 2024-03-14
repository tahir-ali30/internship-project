import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const token = (useSelector(state => state.user.token) || localStorage.getItem('auth')?.token) ?? null;

    useEffect(() => {
        if (token === null) {
            navigate('/login', { replace: true });
        }
    }, [navigate, token]);

    return (
        children
    )
}
