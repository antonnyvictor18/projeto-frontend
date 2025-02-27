'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { useEffect, useState } from 'react';
import LoginPage from './(full-page)/auth/login/page';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface RootLayoutProps {
    children: React.ReactNode;
}

const publicRoutes = ['/auth/login', '/auth/newUser'];

const checkAuth = () => {

    if(localStorage.getItem('TOKEN_APLICACAO_FRONTEND') != undefined){
        return true;
    }

    return false;
}

export default function RootLayout({ children }: RootLayoutProps) {

    const router = useRouter();
    const pathname = usePathname();
    const [pageLoaded, setPageLoadded] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = checkAuth();
        setIsAuth(auth);
        setPageLoadded(true);

        if (!publicRoutes.includes(pathname) && !auth) {
            router.push('/auth/login');
        }
    }, [router, pathname]);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                {publicRoutes.includes(pathname) || isAuth ? (
                    <PrimeReactProvider>
                        <LayoutProvider>
                            {children}
                        </LayoutProvider>
                    </PrimeReactProvider>
                ) : (
                    pageLoaded ? (
                        <PrimeReactProvider>
                            <LayoutProvider>
                                <LoginPage />
                            </LayoutProvider>
                        </PrimeReactProvider>
                    ) : null
                )}
            </body>
        </html>
    );
}
