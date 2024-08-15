import Navbar from "@/components/navbar/navbar";
import React, { ReactNode } from "react";

function PrimaryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-amber-50">
      <Navbar />
      {children}
    </div>
  );
}

export default PrimaryLayout;
