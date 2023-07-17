export const goToLoginPage = (navigate) => { navigate('/login') }

export const goToSignupPage = (navigate) => { navigate('/signup') }

export const goToPostPage = (navigate) => { navigate('/') }

export const goToCommentPage = (navigate, postId) => { navigate(`/comments/${postId}`) }
