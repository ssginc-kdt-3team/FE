import React  from 'react'
import pages from './Pages';
import profile from './Profile';
import resv from './Resv';
import cust from './Cust';
import owner from './Owner';
import store from './Store';
import shop from './Shop';
import utilities from './utilities';
import notitext from './Notitext';
import grade from './Grade';
import cupon from './Cupon';
// import deposit from './Deposit';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [pages, profile, resv, cust, owner, shop, store, notitext, grade, cupon, utilities],
    breadcrumbs: false
};

export default menuItems;
