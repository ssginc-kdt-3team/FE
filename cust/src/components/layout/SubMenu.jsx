import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/layout/SubMenu.module.css';
import menuData from "../../data/menuData";

function SubMenu({isSubMenuOpen, setIsSubMenuOpen}) {
  return (
    <div 
      id={styles.subMenuWrap} 
      className={isSubMenuOpen ? styles.open : styles.close} 
      onMouseOver={() => setIsSubMenuOpen(true)} 
      onMouseOut={() => setIsSubMenuOpen(false)}
    >      
      <ul className='center flex-gap-48'>
        {
          menuData && menuData.map( data => (
            <li key={data.id}>
            {
              data.subMenu ? (
                <ul id={styles.subMenu}>
                  {
                    data.subMenu.map( subData => (
                      <Link to={subData.link} key={subData.id} onClick={() => setIsSubMenuOpen(false)}>
                        <li>{subData.name}</li>
                      </Link>
                    ))
                  }
                </ul>
              )
              : ''
            } 
            </li>
            // <Link to={data.link} key={data.id} onClick={() => setIsSubMenuOpen(false)}>
            //   <div>{data.name}</div>
            // </Link>
          ))
        }
      </ul>
    </div>
  );
}

export default SubMenu;