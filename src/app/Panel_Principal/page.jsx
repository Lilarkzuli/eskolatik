"use client"
import React from 'react';
import {UserCookies} from '../api/auth/login/cookie_verification/route';
import Header from '../Snippets/Home/page';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


function Panel_Principal() {
    UserCookies(); 
    const usuario = JSON.parse(Cookies.get('usuario'));
    

    return(
        <div>
            <Header moredata={usuario}></Header>
        </div>
    )
    
}

export default Panel_Principal
