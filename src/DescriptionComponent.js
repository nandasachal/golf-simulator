import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css';

function DescriptionComponent(props) {

    const background = "In the diagram, the target is straight, at 0° Club Path Angle. When using the toggles, " 
    + "a negative angle means pointing to the left more, and a positive angle means pointing to the right. "
    + "Club Path Angle is the direction of your swing in relation to the target. Club Face Angle is the direction of the "
    + "actual club face in relation to the target. The simulation is created assuming you are an amateur right-handed golfer, "
    + "carrying a driver about 250 yards. The results are estimates intended for conveying an idea and educating, not actuals.";
    var clubPathDirectionDescription = "";
    var ballCurveDescription = "";

    if (props.clubPathDirection == "straight") {
        clubPathDirectionDescription = "The Club Path Angle is pointing straight at the target, so your ball is going to start out on line. "
    } else {
        clubPathDirectionDescription = "The Club Path Angle is pointing to the " + props.clubPathDirection + ", so your ball is going to start out " + props.clubPathDirection + " of the target. "
    };

    console.log(props.ballCurve);

    if (props.ballCurve.length == 0) {
        ballCurveDescription = "Since your Club Path Angle is the same as your Club Face Angle, the ball flight will be straight."
    } else {
        ballCurveDescription = "Additionally, because the club path angle is " + props.ballCurve[0]
        + " the club face angle, this means you are swinging " + props.ballCurve[1]
        + " across the ball more (or the club face is " + props.ballCurve[2] + " to the target), creating a " + props.ballCurve[3] 
        + " ball flight. If the difference in angles is larger, the larger the curve in ball flight you will experience. "
        + "If the curve is moderate, this is typically referred to as a " + props.ballCurve[4]
        + ". If the curve is more aggressive this is considered a " + props.ballCurve[5] + ". "
        + "In this case, you are seeing a " + props.ballCurve[6] + ".";
    };

    return (
        <div>
            {clubPathDirectionDescription}{ballCurveDescription}
        </div>
    );
};

export default DescriptionComponent;