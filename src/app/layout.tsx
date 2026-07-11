"use client";

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "./Provider/AppContext";
import Sidebar from "./Herramientas/Sidebar";
import Navbar from "./Herramientas/Navbar";
import { AppProviderPrincipal } from "./Provider/AppProvider";
import LoadingCharge from './Herramientas/Loading';

function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  const { loadingRoute, setLoadingRoute } = useAppContext();

  useEffect(() => {
    setLoadingRoute(false);
  }, [pathname, setLoadingRoute]);

  return (
    <>
      {showSidebar && (
        <div className="fixed top-0 left-0 right-0 z-40">
          <Navbar />
        </div>
      )}

      {showSidebar && (
        <div className="fixed left-0 h-[calc(100vh-5rem)] w-64 z-50 bg-white shadow">
          <Sidebar />
        </div>
      )}

      <main className={`${showSidebar ? "pl-64" : "pl-0"} bg-gray-100 h-full`}>
        {loadingRoute ? (
          <div className="flex justify-center items-center h-screen">
            <LoadingCharge/>
          </div>
        ) : (
          children
        )}
      </main>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased m-0">
        <AppProviderPrincipal>
          <LayoutContent>{children}</LayoutContent>
        </AppProviderPrincipal>
      </body>
    </html>
  );
}