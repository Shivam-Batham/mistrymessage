import AuthProvider from "@/context/AuthProvider";
import type { Metadata } from "next";
import React from "react";
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
export const metadata :Metadata ={
    title:"mistryMessage",
    description:"Developed by Shivam Batham"
}

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
return (<html>
    <AuthProvider>
    <body>{children}
        <Toaster />
    </body>
    </AuthProvider>
</html>)
}
