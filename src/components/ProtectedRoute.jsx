import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const user = (useSelector(state => state.user.userData) || localStorage.getItem('auth')?.user) ?? null;

    useEffect(() => {
        if (user === null) {
            navigate('/login', { replace: true });
        }
    }, [navigate, user]);

    return (
        children
    )
}
