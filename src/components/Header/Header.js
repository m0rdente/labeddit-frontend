import { HeaderContainer } from "./Header.Style"
import logo from "../../assets/mini-logo-labenu.svg"
import status from "../../assets/status-bar.svg"
import close from "../../assets/close-icon.svg"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useContext } from "react"
import { goToPostPage, goToLoginPage } from "../../routes/coordinator"
import { 
    Button, 
    Image,
    Link
} from '@chakra-ui/react';
import { CloseButtonIcon } from "../Icons/CloseButtonIcon"

const Header = ({ isLoggedIn }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()

    const logout = () => {
        if(isLoggedIn) {
            window.localStorage.removeItem('labeddit-token')
        }
        goToLoginPage(navigate)        
    }

    const renderHeader = () => {
        switch (location.pathname) {
            case "/":
                return (
                    <HeaderContainer>
                        <CloseButtonIcon visibility={'hidden'} onClick={() => goToPostPage(navigate)} />
                        <Image src={logo} alt="logo Labenu"/>
                        <Button
                            fontFamily={"Noto Sans"}
                            variant={'link'}
                            colorScheme={"blue"}
                            onClick={logout}                            
                        >Logout
                        </Button>
                    </HeaderContainer>
                )
            case "/signup":
                return (
                    <HeaderContainer>
                        <CloseButtonIcon visibility={'hidden'} onClick={() => goToPostPage(navigate)} />
                        <Image src={logo} alt="logo Labenu"/>
                        <Button
                            fontFamily={"Noto Sans"}
                            variant={'link'}
                            colorScheme={"blue"}
                            onClick={() => goToLoginPage(navigate)}
                        >Entrar
                        </Button>
                    </HeaderContainer>
                )
            
            case `/comments/${params.postId}`:
                return (
                    <HeaderContainer>
                        <CloseButtonIcon onClick={() => goToPostPage(navigate)} />
                    
                        <Image src={logo} alt="logo Labenu"/>
                        <Button fontFamily={"Noto Sans"} variant={'link'} colorScheme={"blue"} onClick={logout} 
                        >Logout
                        </Button>
                    </HeaderContainer>
                )

            case `/*`:
                return (
                    <HeaderContainer>
                        <CloseButtonIcon onClick={() => goToPostPage(navigate)} />
                        <Image src={logo} alt="logo Labenu"/>
                        <Button
                            fontFamily={"Noto Sans"}
                            variant={'link'}
                            colorScheme={"blue"}
                            onClick={logout} 
                        >Logout
                        </Button>
                    </HeaderContainer>
                )
            default:
                return (
                    <>
                        <CloseButtonIcon visibility={'hidden'} onClick={() => goToPostPage(navigate)} />
                        <Image visibility={'hidden'} src={logo} alt="logo Labenu"/>
                        <Button
                            fontFamily={"Noto Sans"}
                            variant={'link'}
                            colorScheme={"blue"}
                            onClick={logout} 
                            visibility={'hidden'}
                        >Logout
                        </Button>
                    </>
                )
        }
    }    
        
    return(
        <>
            {renderHeader()}
        </>
    )
}

export default Header