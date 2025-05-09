"use client"
import React ,{useEffect, useState} from 'react';
import { UserCookies } from '@api/auth/login/cookie_verification/route';
import Header from '@snippets/Home/Home';

import {getCookie} from 'cookies-next/client';


function Panel_Principal() {
    UserCookies(); 
    const [usuario, setUsuario] = useState(null); // Iniciamos como null

    useEffect(() => {
        
        const user = getCookie('usuario');
        setUsuario(user);
    }, []); 
    
    return(
        <div>
            <Header moredata={usuario}></Header>
        </div>
    )
    
}

export default Panel_Principal
