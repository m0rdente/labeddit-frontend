import React from 'react'
import { useState } from 'react';
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { goToPostPage, goToLoginPage } from '../../routes/coordinator'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Checkbox } from '@chakra-ui/react';
import { BASE_URL, validateEmail, validatePassword, validateText } from '../../constants/constants';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import { SignupPageContainer } from './SignupPage.Style';

const SignupPage = () => {

  const navigate = useNavigate()

  const [ showPassword, setShowPassword ] = useState(false)
  const [ isChecked, setIsChecked ] = useState(false)
  const [ isEmailValid, setIsEmailValid ] = useState(true)
  const [ isPasswordValid, setIsPasswordValid ] = useState(true)
  const [ isNickNameValid, setIsNickNameValid ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(false)

  const [form, onChangeInputs, clearInputs] = useForm({
    nickName: "",
    email: "",
    password: ""
  })

  const onSubmit = (e) => {
    e.preventDefault()
    setIsEmailValid(validateEmail(form.email))
    setIsPasswordValid(validatePassword(form.password))
    setIsNickNameValid(validateText(form.nickName))
  }

  const signup = async () => {
    try {
      setIsLoading(true)

      const body = {
        nickName: form.nickName,
        email: form.email,
        password: form.password
      }

      const response = await axios.post(BASE_URL + "/users/signup", body)
      window.localStorage.setItem('labeddit-token', response.data.token)
      setIsLoading(false)
      goToPostPage(navigate)
    } catch (error) {
      setIsLoading(false)
      console.error(error?.response?.data?.message)
      window.alert(error?.response?.data?.message)
    }
  }

  return (
    <SignupPageContainer>
      <Header />
      <Flex
        minH={'88vh'}
        maxW={'428px'}
        // align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={4} mx={'auto'} maxW={'lg'} py={12} px={6} justify={'space-between'}
>
          <Stack align={'center'} justify={'flex-start'}>           
            <Text fontFamily={'IBM Plex Sans'} fontStyle={'normal'} fontSize={'33px'} fontWeight={'bold'} color={'#373737'}>
              Olá, boas vindas ao LabEddit ;)
            </Text>
          </Stack>
          <form onSubmit={onSubmit}>
          <Box            
            p={1}
            rounded={'lg'}
            size='363px'
          >
            <Stack spacing={2}>
              <Stack>
                <Box>
                  <FormControl id="nickName" isRequired>
                    <Input
                      name='nickName'
                      type="text"
                      value={form.nickName}
                      onChange={onChangeInputs}
                      placeholder='Apelido'
                      autoComplete='off'
                    />
                  </FormControl>
                </Box>
              </Stack>
              <FormControl id="email" isRequired>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChangeInputs}
                  placeholder='E-mail'
                  autoComplete='off'
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
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
              <Stack spacing={4} mt={20} pt={2} >
                <Text 
                  fontFamily={'Noto Sans'}
                  fontSize={'sm'}
                  fontWeight={'400'}
                  fontStyle={'normal'}
                  align={'start'}>
                  Ao continuar, você concorda com o nosso <Link onClick={() => goToLoginPage(navigate)} color={'blue.400'}>Contrato de usuário </Link>
                e nossa <Link color={'blue.400'}>Política de Privacidade</Link>
                </Text>
                <Checkbox
                  isRequired
                  size={'sm'} 
                  align={'start'}
                  fontFamily={'Noto Sans'}
                  fontSize={'sm'}
                  fontWeight={'400'}
                  fontStyle={'normal'}
                >
                Eu concordo em receber emails sobre coisas legais no Labeddit 
                </Checkbox>
                <Button
                  onClick={signup}
                  loadingText="Submitting"
                  size="lg"
                  variant={'ghost'}
                  type='submit'
                  bgGradient='linear(90deg, #FF6489 0%, #F9B24E 100%)'
                  boxShadow='2xl'
                  borderRadius='27px' 
                  color={'white'}
                  _hover={{
                    bg: 'orange.500',
                  }}
                  >
                  Cadastrar
                </Button>
                <Text align={'center'}>
                  Já possui uma conta? <Link onClick={() => goToLoginPage(navigate)} color={'blue.400'}>Login</Link>
                </Text>
              </Stack>              
            </Stack>
          </Box>
          </form>
        </Stack>
      </Flex>

    </SignupPageContainer>
  )
}

export default SignupPage