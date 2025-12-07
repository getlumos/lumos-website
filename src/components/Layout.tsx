import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  /** If true, shows the navbar even on homepage (where Hero has its own nav) */
  showNavbar?: boolean;
  /** If true, adds padding-top for navbar space */
  withNavbarSpace?: boolean;
}

export const Layout = ({ children, showNavbar = true, withNavbarSpace = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {showNavbar && <Navbar />}
      <main className={`flex-1 ${withNavbarSpace && showNavbar ? "pt-16" : ""}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
