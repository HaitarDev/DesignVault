import React, { ReactNode } from "react";

function UploadLayout({ children }: { children: ReactNode }) {
  return <div className="bg-gradient-to-b from-amber-50 pt-8">{children}</div>;
}

export default UploadLayout;
