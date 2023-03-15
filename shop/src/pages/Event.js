import { Outlet } from "react-router-dom";

function EventPage (props) {
  return(
    <div>
      <h5>오늘의 이벤트</h5>
      <Outlet></Outlet>
    </div>
  )
};

function EventOne (props) {
  return(
    <div>첫 주문시 양배추즙 서비스</div>
  )
};

function EventTwo (props) {
  return(
    <div>생일기념 쿠폰받기</div>
  )
};

export { EventPage, EventOne, EventTwo }