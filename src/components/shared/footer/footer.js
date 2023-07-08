import React from 'react';
import styles from '../../styles/footer.module.scss';


const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-text"]}>
        <span>© 2023 HTA Group. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
