import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title"></h5>
            <p>
             
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title"></h5>
            <ul>
              {/* <li className="list-unstyled">
                <a href="#!"></a>
              </li> */}
              
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid><center>  &copy; {new Date().getFullYear()} Copyright: <a href="https://www.github.com"> github.com </a></center>
        
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;