import React  from 'react'
import pages from './Pages';
import profile from './Profile';
import resv from './Resv';
import cust from './Cust';
import owner from './Owner';
import branch from './Branch';
import shop from './Shop';
import notitext from './Notitext';
import grade from './Grade';
import cupon from './Cupon';
import deposit from './Deposit';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [ resv, deposit, cust, owner, shop, branch, notitext, grade, cupon],
    breadcrumbs: false
};

export default menuItems;
