import React, { Component } from "react";
//import Table from './Components/table';
//import styled from "styled-components";
class Home extends Component {
  render() {
    return (
      <React.Fragment>

<div id="myCarousel" class="carousel slide" data-ride="carousel">

  {/* <!-- Indicators --> */}
  <ul class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ul>
  
  {/* <!-- The slideshow --> */}
  <div class="carousel-inner">
    
    <div class="carousel-item">
      <img src="https://pplware.sapo.pt/wp-content/uploads/2018/06/pplware_microsoft_github00.jpg" alt="Chicago" width="2100" height="550"></img>
    </div>
    <div class="carousel-item active">
      <img src="https://techcrunch.com/wp-content/uploads/2018/06/40890924-4bad5ce0-6732-11e8-9648-192aa71f0830-1.png" alt="Chicago" width="2100" height="550"></img>
  </div>
  
  {/* <!-- Left and right controls --> */}
  <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#myCarousel" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>
<div class="centercolumn">
  <div class="card">
      
      {/* <img src="https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FK0jagCHTBRKuVb_rt7LQ_g--%7EB%2FaD0xMDY5O3c9MTYwMDthcHBpZD15dGFjaHlvbg--%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D4834%252C3230%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C1069%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-images%252F2019-01%252F2d1e22f0-12ae-11e9-bae7-60d640081814%26client%3Da1acac3e1b3290917d92%26signature%3D269ae0af3a1a1772ffea6759d126791b9ad25184&client=amp-blogside-v2&signature=b765a6af8c48fe4e8719b331068438b93b53beb5" alt="Paris" width="300" height="300"></img> */}
      <h2>About us</h2>
      <p>The application is providing various functionalities related to github operations. Mainly its fetching githubs public repositories metadaa with a very easy approach.
         User needs to provide just project name and repository name and he will get whole logs related to that specific repo.
         Application is also very useful to anaylse commits based on graphical user interface charts. User can concise that query result by using search functionalities. This search is based on commid-id.Not only this pull request and issues of the reposities can also be fetched used the application. 
         To provide better use of the application current location of the user can also be identified using location feature of the application. It is a MVC based application. Which is
         very useful in analysing organization data on daily basis.
         </p> 


    </div>
    </div>

  
    </div>
      </React.Fragment>
      
    );
  }
}


export default Home;
