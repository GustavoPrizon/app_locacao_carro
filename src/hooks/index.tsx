import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";

interface AuthProvidderProps {
  children: ReactNode;
}

function AppProvider({ children }: AuthProvidderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
