import { Outlet } from "react-router-dom";

function About(props) {
  return (
    <>
      <div>회사 정보 페이지</div>
      <Outlet></Outlet>
    </>
  );
}

export default About;