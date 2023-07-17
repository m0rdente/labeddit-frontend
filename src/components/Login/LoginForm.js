import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue, Image, Divider
} from '@chakra-ui/react';
  import { useState } from 'react';
  import logo from '../../assets/logo-labenu.svg'
  import { useForm } from '../../hooks/useForm';
  
  export default function LoginForm() {

    const [ form, onChangeInputs, clearInputs ] = useForm({
      email: "",
      password: ""
    })
    const [ isEmailValid, setIsEmailValid ] = useState(true)
    
  
    const onSubmit = (e) => {
      e.preventDefault()
      setIsEmailValid(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(form.email))
    }


    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={4} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'} justify={'start'}>
            <Image boxSize='152px' src={logo} alt='Logo Labenu'/>
            <Text fontSize={'16px'} color={'gray.600'}>
            O projeto de rede social da Labenu
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            size='363px'
          >
            <Stack spacing={2}>
              <form onSubmit={onSubmit}/>
              <FormControl id="email" isInvalid={!isEmailValid}>
                <Input  value={form.email} onChange={onChangeInputs}  placeholder='E-mail' />
              </FormControl>
              <FormControl id="password">
                <Input 
                type="password" 
                value={form.password}
                onChange={onChangeInputs} 
                placeholder='Senha' />
              </FormControl>
              <Stack spacing={2}>
                <Stack align={'start'} justify={'space-between'}>
                </Stack>
                <Button
                  type='submit'
                  bgGradient='linear(90deg, #FF6489 0%, #F9B24E 100%)' 
                  boxShadow='2xl'
                  color={'white'}
                  _hover={{
                    bg: 'orange.500',
                  }}>
                  Continuar                
                </Button>
                <Divider colorScheme={'orange'} size="ex" variant="solid"/>
                <Button
                  border= '1px' 
                  borderStyle= 'solid' 
                  bordercolor='#FE7E02'
                  borderRadius='27px'
                  bgGradient={'white'}
                  color={'#FE7E02'}
                  _hover={{
                    bg: 'orange.500',
                  }}>
                  Criar uma conta!
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }