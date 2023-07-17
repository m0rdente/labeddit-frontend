import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { goToLoginPage } from "../routes/coordinator"

export const useProtectedPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('labeddit-token')
        if (!token) {
          goToLoginPage(navigate)    
        }
      }, [navigate])
}