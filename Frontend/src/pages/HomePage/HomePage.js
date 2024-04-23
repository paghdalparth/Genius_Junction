import React from 'react';
import TopBar from './TopBar/TopBar';
import Sidebar from '../student/Dashboard/Sidebar/Sidebar';
import StudentsAbout from './TopBar/studentsAbout'; 
import EducatorAbout from './TopBar/educatorAbout'
import CoursesCard from './TopBar/OurCourses/CoursesCard';
import OnlineCourses from './TopBar/OurCourses/OnlineCourses';
import ChooseUs from './ChooseUs/ChooseUs';
import AboutUs from './AboutUS/AboutUs';
import Footer from './Footer/Footer';
import HomeNavbar from './Navbar/HomeNavbar';
// import OurCourses from './TopBar/OurCourses/OurCourses';

const HomePage = () => {
  return (
    <div>
      <HomeNavbar/>
      <TopBar id="home"/>
      <StudentsAbout id="Student"/>
      <EducatorAbout id="Educator"/>
      {/* <CoursesCard id="our-free-courses"/> */}
      {/* <OnlineCourses id="courses"/> */}
      <AboutUs id="aboutus" />
      <ChooseUs />
      <Footer id="contactus"/>
    </div>
  );
};

export default HomePage;
