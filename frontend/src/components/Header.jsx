import {useNavigate} from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import {logout} from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {

  //  to access specific data from the Redux store's state
  // .cart is get from store.js
  // object destructuring
  const {cartItems} = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout())
      dispatch(resetCart());
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
<Container>
  <LinkContainer to="/">
    <Navbar.Brand>
    <img src={logo} alt='ProShop'/>
    ProShop
    </Navbar.Brand>
    </LinkContainer>

    {/* Generates hamburger menu when navbar is in collapsed state */}
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>

    {/* Wraps the collapsible part */}
    <Navbar.Collapse id="basic-navbar-nav">
        
        <Nav className="ms-auto">
          <SearchBox />
            {/* Nav item with nav link and nav icon */}
            <LinkContainer to="/cart">
<Nav.Link>
  <FaShoppingCart /> Cart
{
  cartItems.length > 0 && (
    <Badge pill bg='info' style={{marginLeft: '7px'}}>
{cartItems.reduce((acc, currentItem) => acc + currentItem.qty, 0)}
    </Badge>
  )
}
</Nav.Link>
</LinkContainer>

{userInfo ? (
  <NavDropdown title={userInfo.name} id='username'>
    <LinkContainer to='/profile'>
    <NavDropdown.Item>Profile</NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
  </NavDropdown>
) : (
  <LinkContainer to="/login">
<Nav.Link><FaUser/> Sign In</Nav.Link>
</LinkContainer>
)}

{userInfo && userInfo.isAdmin && (
  <NavDropdown title='Admin' id='adminMenu'>
    <LinkContainer to='/admin/productlist'>
    <NavDropdown.Item>Products</NavDropdown.Item>
    </LinkContainer>

    <LinkContainer to='/admin/userlist'>
    <NavDropdown.Item>Users</NavDropdown.Item>
    </LinkContainer>

    <LinkContainer to='/admin/orderlist'>
    <NavDropdown.Item>Orders</NavDropdown.Item>
    </LinkContainer>
  </NavDropdown>
)}
        </Nav>
    </Navbar.Collapse>
</Container>
        </Navbar>
    </header>
  )
}

export default Header