import React, {useState} from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
//import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; 

const { SubMenu, Item } = Menu;

const Header = () => {
    const [ current, setCurrent] = useState('home');
    let dispatch = useDispatch();
    let history = useHistory();

    //access data from redux state
    let { user } = useSelector((state) => ({...state}))

    const handleClick = (e) => {
      setCurrent(e.key);
    }

    const logout = () => {
      firebase.auth().signOut();
      dispatch({
        type: "LOGOUT",
        payload: null, 
      });
      history.push('/login');
    }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {user && (
        <SubMenu 
        icon={<SettingOutlined />} 
        title={user.email && user.email.split("@")[0]} //name@gmail.com -- ['name', 'gmail.com']
        className='float-right'>
          <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
      </SubMenu>
      )}
      
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>
      )}

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>
      )}
    </Menu>
  )
}

export default Header
