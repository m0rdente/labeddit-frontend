import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../contexts/GlobalContext'
import Header from '../../components/Header/Header'
import PostCard from '../../components/PostCard/PostCard'
import EmptyPostCard from '../../components/EmptyPostCard/EmptyPostCard'
import { PostPageContainer } from './PostPage.Style'
import { BASE_URL } from '../../constants/constants'
import { useProtectedPage } from '../../hooks/useProtectedPage'
import { PostContext } from '../../contexts/PostContext'

const PostPage = () => {
  const context = useContext(GlobalContext)
  const { posts, fetchPosts, isLoading, setIsLoading } = context
  useProtectedPage()
  useEffect(() => {
    const token = window.localStorage.getItem('labeddit-token')
    if (token) {
      fetchPosts()
    }
  }, [])
  const [ liked, setLiked ] = useState(false)
  const [ disliked, setDisLiked ] = useState(false)
 
  
  const handlePostLike = (id) => {
      const body = {
          like: true
      }
      likeDislikePost(id,body)
      setLiked(!liked)
      setDisLiked(disliked)
    }

    const handlePostDislike = (id) => {
      const body = {
          like: false
      }
      likeDislikePost(id, body)
      setDisLiked(!disliked)
      setLiked(liked)
      }

    const likeDislikePost = async (id, body) => {
      try {

        const token = window.localStorage.getItem('labeddit-token');

        const config = {
          headers: {
            Authorization: token
          }
        }
      
        await axios.put(BASE_URL + `/posts/${id}/like`, body, config)
 
      } catch (error) {
        console.error(error?.response)
      }
    }    
  
    useEffect(() => {
      fetchPosts()
     }, [ liked, disliked ])  
    const postContext ={
      handlePostLike,
      handlePostDislike
    }
 
  return (
    <PostContext.Provider value={postContext} >
      <PostPageContainer>
          <Header/>
          <EmptyPostCard/>
          {posts && posts.map((post) => { return <PostCard key={post.id} post={post} handlePostLike={handlePostLike} handlePostDislike={handlePostDislike} liked={liked} disliked={disliked} />
          })}
      </PostPageContainer>
    </PostContext.Provider>
  )
}

export default PostPage