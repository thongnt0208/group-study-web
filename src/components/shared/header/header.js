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

  const renderMenuItem = (item) => {
    return {
      label: (
        <Link to={item.to} className="p-menuitem-link">
          <i className={`pi ${item.icon}`}></i>
          <span>{item.label}</span>
        </Link>
      )
    };
  };

  const renderEndItem = (item) => {
    return (
      <li key={item.label} className={styles.listItem}>
        <button className="p-menuitem-link" onClick={item.command}>
          <i className={`pi ${item.icon}`}></i>
          <span>{item.label}</span>
        </button>
      </li>
    );
  };

  const endItems = isLoggedIn
    ? [
        {
          label: 'Logout',
          icon: 'pi pi-power-off',
          command: handleLogout
        }
      ]
    : [];

  return (
    <div className={styles.header}>
      <Menubar
        model={items.map(renderMenuItem)}
        end={isLoggedIn ? renderEndItem(endItems[0]) : null}
        start={<div />}
      />
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
