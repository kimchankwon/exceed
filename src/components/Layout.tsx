import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useHeaderTheme } from "../hooks/useHeaderTheme";
import { HeaderThemeProvider } from "./HeaderThemeContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const headerTheme = useHeaderTheme();

  return (
    <HeaderThemeProvider value={headerTheme}>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </HeaderThemeProvider>
  );
};

export default Layout;
