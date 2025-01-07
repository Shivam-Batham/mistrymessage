import type { Metadata } from "next";
import React from "react";

export const metadata :Metadata ={
    title:"mistryMessage",
    description:"Developed by Shivam Batham"
}

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
return (<html>
    <body>{children}</body>
</html>)
}
