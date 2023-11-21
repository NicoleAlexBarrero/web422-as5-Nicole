import React, { useState } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
const MainNav = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExpanded(false); //
    const searchField = e.target.elements.search.value;
    const query = `title=true&q=${searchField}`;
    setSearchHistory((current) => [...current, query]); //
    router.push(`/artwork?${query}`);
  };
  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="fixed-top navbar-dark bg-primary"
      >
        <Navbar.Brand>Nicole Barrero</Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setIsExpanded(!isExpanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="basic-navbar-nav">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link
                active={router.pathname === "/"}
                onClick={() => setIsExpanded(false)}
              >
                Home
              </Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link
                active={router.pathname === "/search"}
                onClick={() => setIsExpanded(false)}
              >
                Advanced Search
              </Nav.Link>
            </Link>
            &nbsp;
            <Form className="d-flex nav-form" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                name="search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            &nbsp;
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/favourites"}>
                  <NavDropdown.Item
                    href="#action/3.1"
                    onClick={() => setIsExpanded(false)}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Nav.Link>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/history"}>
                  <NavDropdown.Item
                    href="#action/3.2"
                    onClick={() => setIsExpanded(false)}
                  >
                    Search History
                  </NavDropdown.Item>
                </Nav.Link>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
