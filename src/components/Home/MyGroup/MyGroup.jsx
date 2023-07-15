import { Button } from "@mui/material";
import g1 from '../../../../public/g1.png'

const MyGroup = () => {
  return (
    <div className='box'>
        <h3 className='title'>
            My Group
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
  );
};

export default MyGroup;
