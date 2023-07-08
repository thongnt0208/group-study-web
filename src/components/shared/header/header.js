import React from 'react';
import PropTypes from 'prop-types';
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import styles from '../../styles/header.module.scss';

const Header = ({ isLoggedIn, handleLogout }) => {
  const items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      to: '/profile'
    },
    {
      label: 'Invitation',
      icon: 'pi pi-envelope',
      to: '/invitation'
    },
    {
      label: 'Group Detail',
      icon: 'pi pi-info-circle',
      to: '/group-detail'
    },
    {
      label: 'Group List',
      icon: 'pi pi-list',
      to: '/groups'
    }
  ];

  return (
    <div className="header">
      <Menubar
        model={items.map((item) => ({
          label: (
            <Link to={item.to} className="p-menuitem-link">
              <i id={styles["icon"]} className={`pi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          )
        }))}
        end={
          isLoggedIn
            ? [
                {
                  label: 'Logout',
                  icon: 'pi pi-power-off',
                  command: () => handleLogout('/login')
                }
              ]
            : []
        }
        start={<div />}
      />
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  handleLogout: () => {}
};

export default Header;
