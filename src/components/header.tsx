import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";

const Header = () => {
    return (
        <Navbar isBordered={true}>
            <NavbarBrand>
                LOGO
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem>
                   RScores
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="" justify="end">
             </NavbarContent>
        </Navbar>
    )
}

export default Header