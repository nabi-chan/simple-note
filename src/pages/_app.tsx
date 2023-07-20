import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import "@blocknote/core/style.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { JetBrains_Mono } from "next/font/google";
import { DevTools } from "jotai-devtools";
import { Provider, createStore } from "jotai";
import dynamic from "next/dynamic";
import Script from "next/script";
import { env } from "@/env.mjs";
import * as gTag from "@/hooks/useGtag";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/ErrorBoundary";

const ChannelTalk = dynamic(() => import("@/components/ChannelTalk"), {
  ssr: false,
});

const jetbrainsMono = JetBrains_Mono({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

const customStore = createStore();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  gTag.useGTag();

  return (
    <div className={jetbrainsMono.className}>
      <Provider store={customStore}>
        <Head>
          <title>nabi-simple-note</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
          />
        </Head>
        <SessionProvider session={session}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <ChannelTalk />
        </SessionProvider>
        <DevTools />
      </Provider>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="colored"
      />
      {env.NEXT_PUBLIC_GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </div>
  );
};

export default api.withTRPC(MyApp);
