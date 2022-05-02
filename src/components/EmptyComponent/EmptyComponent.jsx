import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const EmptyComponent = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home');
    })
}

export default EmptyComponent