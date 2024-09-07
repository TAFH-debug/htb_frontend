import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export function Header() {
    return <Navbar>
    <NavbarBrand>
      <p className="font-bold text-inherit"><a href="/">ACME</a></p>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="#">
          Features
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Customers
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Integrations
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="/signin">Sign In</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/signup" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
    </Navbar>
}