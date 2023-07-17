import { useContext, useState } from 'react'

import { useForm } from '../../hooks/useForm'
import axios from 'axios'
import { BASE_URL, validateText } from '../../constants/constants'
import { GlobalContext } from '../../contexts/GlobalContext'
import { Box, Flex, useColorModeValue, Stack, FormControl, Button, Spinner, Textarea, Skeleton } from '@chakra-ui/react'

export default function EmptyPostCard() {

  const context = useContext(GlobalContext)

  const { posts, fetchPosts } = context

      const [isLoading, setIsLoading] = useState(false)
      const [isContentValid, setIsContentValid] = useState(true)

      const [form, onChangeInputs, clearInputs] = useForm({
        content: ""
      })
      
      const createPost = async () => {
        try {
          setIsLoading(true)
          const token = window.localStorage.getItem('labeddit-token');
          const config = {
            headers: {
              Authorization: token
            }
          }
          const body = {
            content: form.content,
          }
    
          isContentValid && await axios.post(BASE_URL + "/posts", body, config)
          setIsLoading(false)
          clearInputs()
          window.alert("Post criado com sucesso!")
          fetchPosts()
        } catch (error) {
          setIsLoading(false)
          console.error(error?.response)
          window.alert(error?.response?.data)
        }
      }

      const onSubmit = () => {
        setIsContentValid(validateText(form.content))
      }

        return (
        <Flex
          minH={'10vh'}
          align={'start'}
          justify={'center'}
        >
          <Skeleton
            isLoaded={!isLoading}
            w="364px"
            borderRadius={'12px'}
            >
        <Stack spacing={4} mx={'auto'} maxW={'lg'} borderBottom={'1px'} borderBottomColor={'linear(90deg, #FF6489 0%, #F9B24E 100%)'}>          
          <Box
            rounded={'lg'}
          >
            <form onSubmit={onSubmit} >
              <Stack spacing={2} py={6} >
                <FormControl id="content" isRequired >
                  <Textarea                    
                    name='content'
                    type="text"
                    value={form.content}
                    onChange={onChangeInputs}
                    placeholder='Escreva seu post...'
                    autoComplete='off'
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    w= '364px'
                    h= '131px'
                  />
                </FormControl>                
                <Stack spacing={2}>                  
                  <Button
                    onClick={createPost}
                    type='submit'
                    bgGradient='linear(90deg, #FF6489 0%, #F9B24E 100%)'
                    boxShadow='2xl'
                    borderRadius='12px'
                    color={'white'}
                    _hover={{
                      bg: 'orange.500',
                    }}>
                      {isLoading ? <Spinner/> : 'Postar'}                    
                  </Button>               
                </Stack>
              </Stack>
            </form >
          </Box>
        </Stack>
        </Skeleton>
      </Flex>
    )
}

