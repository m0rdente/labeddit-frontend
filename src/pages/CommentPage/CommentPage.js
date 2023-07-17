import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from '../../components/CommentCard/CommentCard'
import EmptyCommentCard from '../../components/EmptyCommentCard/EmptyCommentCard'
import Header from '../../components/Header/Header'
import PostCard from '../../components/PostCard/PostCard'
import { BASE_URL } from '../../constants/constants'
import { CommentsPageContainer } from './CommentPage.Style'
import { useProtectedPage } from '../../hooks/useProtectedPage'

const CommentPage = () => {
  const params = useParams()

  const [ comments, setComments ] = useState([])
  const [ currentPost , setCurrentPost ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ liked, setLiked ] = useState(false)
  const [ disliked, setDisLiked ] = useState(false)

  useProtectedPage()
  useEffect(() => {
    const token = window.localStorage.getItem('labeddit-token')

    if (token) {
      fetchCurrentPost()
      fetchComments()
    }
  }, [])

  const fetchCurrentPost = async () => {
    try {
      setIsLoading(true)

      const token = window.localStorage.getItem('labeddit-token')

      const config = {
        headers: {
          Authorization: token
        }
      }

      const response = await axios.get(BASE_URL + `/posts/${params.postId}`, config)
      setCurrentPost(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error?.response?.data)
      window.alert("Erro ao buscar o post!")
    }
  }
  
  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const token = window.localStorage.getItem('labeddit-token')

      const config = {
        headers: {
          Authorization: token
        }
      }

      const response = await axios.get(BASE_URL + `/comments/${params.postId}`, config)
      setComments(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error?.response)
      window.alert("Erro ao buscar os comentários!")
    }
  }  
  
  const handleLike = (id) => {
      const body = {
          like: true
      }
      likeDislikeComment(id,body)
      setLiked(!liked)
      setDisLiked(disliked)
    }

    const handleDislike = (id) => {
      const body = {
          like: false
      }
      likeDislikeComment(id,body)
      setDisLiked(!disliked)
      setLiked(liked)
      }
    const likeDislikeComment = async (id, body) => {
      try {
        const token = window.localStorage.getItem('labeddit-token');
        const config = {
          headers: {
            Authorization: token
          }
        }
      
        await axios.put(BASE_URL + `/comments/${id}/like`, body, config)
 
      } catch (error) {
        console.error(error?.response)
        window.alert(error?.response?.data)
      }
    }    
  
    useEffect(() => {
      fetchComments()
     }, [ liked, disliked ])

     useEffect(() => {
      fetchComments()
     }, [ ])
  
  
  return (
    <CommentsPageContainer>
     <Header/>    
      <PostCard
        isLoading={isLoading} 
        post={currentPost}
      />     
      <EmptyCommentCard
      fetchComments={fetchComments}
      />
     {comments && comments?.map((comment) => {
      return <CommentCard
        key={comment.id}
        comment={comment}
        handleLike={handleLike}
        handleDislike={handleDislike}
        liked={liked}
        path={'comments'} 
        disliked={disliked}
        likeDislikeComment={likeDislikeComment}
        isLoading={isLoading} 
      />
     })}

    </CommentsPageContainer>
  )
}

export default CommentPage