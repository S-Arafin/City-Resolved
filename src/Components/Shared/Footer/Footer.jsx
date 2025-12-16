import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Socials from "./Socials";
import Logo from "../Logo";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <Logo className="text-primary font-extrabold text-4xl"></Logo>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <Socials></Socials>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
