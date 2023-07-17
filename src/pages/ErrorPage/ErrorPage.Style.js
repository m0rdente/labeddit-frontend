import styled from "styled-components"
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import { goToPostPage, goToSignupPage } from '../../routes/coordinator'
export function NotFound() {

  const navigate = useNavigate()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient='linear(90deg, #FF6489 0%, #F9B24E 100%)'
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Página não encontrada
      </Text>
      <Text color={'gray.500'} mb={6}>
       A página que você está procurando parece não existir
      </Text>
      <Button
        onClick={() => goToPostPage(navigate)}
        bgGradient='linear(90deg, #FF6489 0%, #F9B24E 100%)'
        color="white"
        variant="solid">
        Voltar para página de posts
      </Button>
    </Box>
  );
}
export const ErrorPageContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`