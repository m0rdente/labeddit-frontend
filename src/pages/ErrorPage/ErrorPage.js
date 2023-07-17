import React from 'react'
import Header from '../../components/Header/Header'
import { ErrorPageContainer, NotFound } from './ErrorPage.Style'

const ErrorPage = () => {
  return (
    <ErrorPageContainer> <Header/> <NotFound/>
    </ErrorPageContainer>
  )
}

export default ErrorPage