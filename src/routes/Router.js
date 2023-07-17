import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PostPage from '../pages/PostPage/PostPage'
import CommentPage from '../pages/CommentPage/CommentPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="/comments/:postId" element={<CommentPage/>} />
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router