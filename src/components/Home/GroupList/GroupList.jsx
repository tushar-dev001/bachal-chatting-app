import { Button } from "@mui/material";
import Btn from "../../Shared/Button/Btn";
import Heading from "../../Shared/Heading/Heading";
import User from "../../User/User"
import "./GroupList.css";
import g1 from '../../../../public/g1.png'


const GroupList = () => {
  return (
    <div className='box'>
        <h3 className='title'>
            Group List
        <Button variant="contained" className='btn'>Create Group</Button>
        </h3>

        <div className="list">
            <div className="img">
                <img src={g1} alt="" />
            </div>
            <div className="details">
                <h4 className='group-name'>Friends Reunion</h4>
                <p className='group-title'>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button variant="contained" className='btn'>Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={g1} alt="" />
            </div>
            <div className="details">
                <h4 className='group-name'>Friends Reunion</h4>
                <p className='group-title'>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button variant="contained" className='btn'>Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={g1} alt="" />
            </div>
            <div className="details">
                <h4 className='group-name'>Friends Reunion</h4>
                <p className='group-title'>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button variant="contained" className='btn'>Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={g1} alt="" />
            </div>
            <div className="details">
                <h4 className='group-name'>Friends Reunion</h4>
                <p className='group-title'>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button variant="contained" className='btn'>Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={g1} alt="" />
            </div>
            <div className="details">
                <h4 className='group-name'>Friends Reunion</h4>
                <p className='group-title'>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button variant="contained" className='btn'>Join</Button>
            </div>
        </div>
    </div>
    // <>
    //   {/* <div className="box">
    //     <h3 className="title">
    //       <Heading title="Group List" />
    //       <Btn title="Create Group" />
    //     </h3>

    //     <div className="btn-btn">
    //       <User />
    //       <div className="button">
    //         <Btn title="Join" />
    //       </div>
    //     </div>
    //     <div className="btn-btn">
    //       <User />
    //       <div className="button">
    //         <Btn title="Join" />
    //       </div>
    //     </div>
    //     <div className="btn-btn">
    //       <User />
    //       <div className="button">
    //         <Btn title="Join" />
    //       </div>
    //     </div>
    //     <div className="btn-btn">
    //       <User />
    //       <div className="button">
    //         <Btn title="Join" />
    //       </div>
    //     </div>
    //     <div className="btn-btn">
    //       <User />
    //       <div className="button">
    //         <Btn title="Join" />
    //       </div>
    //     </div>
    //     <div className="btn-btn">
    //       <User />
    //       <div className="button">
    //         <Btn title="Join" />
    //       </div>
    //     </div>
    //   </div> */}
    // </>
  );
};

export default GroupList;
