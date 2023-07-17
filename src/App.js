import React, { useEffect, useState } from "react"
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalContext } from "./contexts/GlobalContext"
import Router  from "./routes/Router"
import axios from "axios"
import { BASE_URL } from "./constants/constants"
import { GlobalStyle } from "./GlobalStyles"
import { useProtectedPage } from "./hooks/useProtectedPage"

export default function App() {
  const [ posts, setPosts ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ liked, setLiked ] = useState(false)
  const [ disliked, setDisLiked ] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem('labeddit-token')

    if (token) {
      fetchPosts()
    }
  }, [])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const token = window.localStorage.getItem('labeddit-token')
      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.get(BASE_URL + "/posts", config)
      setPosts(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error?.response?.data?.message)
      window.alert("Erro ao buscar os posts!")
    }
  }
  
  const context = { posts, fetchPosts, isLoading, setIsLoading, isLoggedIn, setIsLoggedIn }
  return (
    <ChakraProvider resetCSS  >
      <GlobalContext.Provider value={context}>
        <Router/> 
      </GlobalContext.Provider>
    </ChakraProvider>
  )
}