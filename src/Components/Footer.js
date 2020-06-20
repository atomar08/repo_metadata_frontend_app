import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
  
      <div className="footer">
        <center>  &copy; {new Date().getFullYear()} Copyright: <a  href="https://www.github.com"> github.com </a></center>
        
       
      </div>

  );
}

export default Footer;