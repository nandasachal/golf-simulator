import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import golfBallPath_0_0_v2 from './assets/images/0_0_v2.svg';
import golfBallPath_0_0 from './assets/images/0_0.svg';
import golfBallPath_0_1 from './assets/images/0_1.svg';
import golfBallPath_0_2 from './assets/images/0_2.svg';
import golfBallPath_0_3 from './assets/images/0_3.svg';
import golfBallPath_0_4 from './assets/images/0_4.svg';
import golfBallPath_0_5 from './assets/images/0_5.svg';
import golfBallPath_0_6 from './assets/images/0_6.svg';
import golfBallPath_0_neg_1 from './assets/images/0_neg_1.svg';
import golfBallPath_0_neg_2 from './assets/images/0_neg_2.svg';
import golfBallPath_0_neg_3 from './assets/images/0_neg_3.svg';
import golfBallPath_0_neg_4 from './assets/images/0_neg_4.svg';
import golfBallPath_0_neg_5 from './assets/images/0_neg_5.svg';
import golfBallPath_0_neg_6 from './assets/images/0_neg_6.svg';
import './App.css';

function GolfRangeComponent(props) {

    const CPAngle = parseInt(props.clubPathAngle);
    const CFAngle = parseInt(props.clubFaceAngle);

    console.log("clubFaceAngle: " +CFAngle);
    console.log("clubPathAngle: " +CPAngle);

    var difference = CPAngle - CFAngle;


    console.log(difference);
    if (difference == 0) {
        var pathVisual = golfBallPath_0_0_v2;
    } else if (CPAngle == 0) {
        if (CFAngle > 0 && CFAngle <= 2) {
            pathVisual = golfBallPath_0_1;
        } else if (CFAngle > 2 && CFAngle <= 4) {
            pathVisual = golfBallPath_0_2;
        } else if (CFAngle > 4 && CFAngle <= 6) {
            pathVisual = golfBallPath_0_3;
        } else if (CFAngle < 0 && CFAngle >= -2) {
            pathVisual = golfBallPath_0_neg_1;
        } else if (CFAngle < -2 && CFAngle >= -4) {
            pathVisual = golfBallPath_0_neg_2;
        } else if (CFAngle < -4 && CFAngle >= -6) {
            pathVisual = golfBallPath_0_neg_3;
        }
    } else if (CPAngle > CFAngle) {
        if (Math.abs(difference) <= 2) {
            pathVisual = golfBallPath_0_neg_1; 
        } else if (Math.abs(difference) <= 4) {
            pathVisual = golfBallPath_0_neg_2;
        } else if (Math.abs(difference) <= 6) {
            pathVisual = golfBallPath_0_neg_3;
            console.log("SWITCHED");
        } else if (Math.abs(difference) <= 8) {
            pathVisual = golfBallPath_0_neg_4;
        } else if (Math.abs(difference) <= 10) {
            pathVisual = golfBallPath_0_neg_5;
        } else if (Math.abs(difference) <= 12) {
            pathVisual = golfBallPath_0_neg_6;
        } 
    } else if (CPAngle < CFAngle) {
        if (Math.abs(difference) <= 2) {
            pathVisual = golfBallPath_0_1; 
        } else if (Math.abs(difference) <= 4) {
            pathVisual = golfBallPath_0_2;
        } else if (Math.abs(difference) <= 6) {
            pathVisual = golfBallPath_0_3;
        } else if (Math.abs(difference) <= 8) {
            pathVisual = golfBallPath_0_4;
        } else if (Math.abs(difference) <= 10) {
            pathVisual = golfBallPath_0_5;
        } else if (Math.abs(difference) <= 12) {
            pathVisual = golfBallPath_0_6;
        } 
    }

    const transformStyle = {
        transform: "rotate(" + props.clubPathAngle*3 +"deg)",
        transformOrigin: '56.5% 100%', // Set the transform-origin property here
    };
    return (
        <div>
        <img 
            src={pathVisual} 
            alt="Golf Range" 
            class="golf-ball-path"
            style={transformStyle}
        />
        </div>
    );
}

export default GolfRangeComponent;