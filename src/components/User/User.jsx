import g1 from "../../../public/g1.png";
import Btn from "../Shared/Button/Btn";
import SubHeading from "../SubHeading/SubHeading";

const User = ({ dateAndTime, name, email }) => {
  return (
    <div className="list">
      <div className="img">
        <img src={g1} alt="" />
      </div>
      <div className="UserDetails">
        <div>
          <SubHeading name={name} subheading={email} />
        </div>
      </div>
      <div className="dateAndTime">{dateAndTime}</div>
    </div>
  );
};

export default User;
