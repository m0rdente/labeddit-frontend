import React from 'react'
import Header from '../../components/Header/Header'
import logo from '../../assets/logo-labenu.svg'
import { useForm } from "../../hooks/useForm"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, validateEmail, validatePassword } from '../../constants/constants'
import { goToPostPage, goToSignupPage } from '../../routes/coordinator'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { LoginPageContainer } from './LoginPage.Style'
import { useContext } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import { Flex, Box, FormControl, Input, Stack, Button, Text, Image, Divider, Spinner, InputRightElement, InputGroup } from '@chakra-ui/react'
const LoginPage = () => {

  const navigate = useNavigate()
  const context = useContext(GlobalContext)

  const { setIsLoggedIn, isLoggedIn } = context

  const [form, onChangeInputs, clearInputs] = useForm({
    email: "",
    password: ""
  })
  const [ isEmailValid, setIsEmailValid ] = useState(true)
  const [ isPasswordValid, setIsPasswordValid ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showPassword, setShowPassword ] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setIsEmailValid(validateEmail(form.email))
    setIsPasswordValid(validatePassword(form.password))
  }

  const login = async () => {
    try {
      setIsLoading(true)

      const body = {
        email: form.email,
        password: form.password
      }

      const response = await axios.post(BASE_URL + "/users/login", body)
      window.localStorage.setItem('labeddit-token', response.data.token)
      setIsLoading(false)
      goToPostPage(navigate)
    } catch (error) {
      setIsLoading(false)
      console.error(error?.response?.data?.message)
      window.alert("Erro ao fazer o login!")
    }
  }

  return (
    <LoginPageContainer>
      <Header isLoggedIn={isLoggedIn} />
      <Flex
        minW={'428px'}
        align={'start'}
        justify={'center'}
        >
        <Stack spacing={4} maxW={'lg'} px={6} justify={'space-between'}>
          <Stack align={'center'} justify={'start'}>
            <Image boxSize='152px' src={logo} alt='Logo Labenu' />
            <Text fontSize={'16px'} color={'gray.600'}>
              O projeto de rede social da Labenu
            </Text>
          </Stack>
          <Box
            p={1}
            rounded={'lg'}
            size='363px'
          >
            <form onSubmit={onSubmit}>
              <Stack spacing={2} py={16} minW='363px'>
                <FormControl id="email" isInvalid={!isEmailValid}>
                  <Input
                    name='email'
                    type="email"
                    value={form.email}
                    onChange={onChangeInputs}
                    placeholder='E-mail'
                    autoComplete='off' 
                  />
                </FormControl>
                <FormControl id="password">
                  <InputGroup>
                  <Input
                    name='password'
                    type="password"
                    value={form.password}
                    onChange={onChangeInputs}
                    placeholder='Senha'
                    autoComplete='off'    
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement> 
                </InputGroup>

                </FormControl>
                <Stack spacing={2} py={10}>
                  <Stack
                    align={'start'}
                    justify={'space-between'}>
                  </Stack>
                  <Button
                    onClick={login}
                    type='submit'
                    bgGradient='linear(90deg, #FF6489 0%, #F9B24E 100%)'
                    boxShadow='2xl'
                    borderRadius='27px's
                    color={'white'}
                    _hover={{
                      bg: 'orange.500',
                    }}>
                      {isLoading ? <Spinner/> : 'Continuar'}                    
                  </Button>
                  <Stack divider={true}></Stack>
                  <Divider colorScheme={'orange'} size="ex" variant="solid" />
                  <Button
                    onClick={() => goToSignupPage(navigate)}
                    border='1px'
                    borderStyle='solid'
                    bordercolor='#FE7E02'
                    borderRadius='27px'
                    bgGradient={'white'}
                    color={'#FE7E02'}
                    _hover={{
                      bg: 'orange.500',
                    }}>
                    Crie uma conta
                  </Button>
                </Stack>
              </Stack>
            </form >
          </Box>
        </Stack>
      </Flex>
    </LoginPageContainer>
  )
}

export default LoginPage