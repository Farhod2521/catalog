import {useState} from 'react';
import {Hydrate, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Toaster} from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';
import '@/styles/globals.css'
import reactQueryClient from "@/config/react-query";
import {SessionProvider} from "next-auth/react"
import '@/services/i18n'
import {CounterProvider} from "@/context/counter";


export default function App({Component, pageProps: {session, ...pageProps}}) {
    const [queryClient] = useState(() => reactQueryClient);
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps?.dehydratedState}>
                    <NextNProgress height={5} color={'#1890FF'}/>
                    <CounterProvider>
                        <Component {...pageProps} />
                    </CounterProvider>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    <Toaster/>
                </Hydrate>
            </QueryClientProvider>
        </SessionProvider>
    );
}
