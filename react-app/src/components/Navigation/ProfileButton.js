import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = (e) => {
    e.stopPropagation()
    console.log("showMenu: ", showMenu)
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    console.log("showMenu: ", showMenu)
  })

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={handleLogout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
