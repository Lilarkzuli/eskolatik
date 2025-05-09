'use client'; // Esto es esencial para usar hooks y el router en Next.js

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
export function UserCookies() {
    const router = useRouter();

    useEffect(() => {
        const userCookie = getCookie('usuario');
        if (!userCookie) {
            router.push('/Login');
        }
    }, [router]);
}