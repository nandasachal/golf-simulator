import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import golfRangeSvg from './assets/images/golfrange.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function GolfRangeComponent() {

    const [naturalWidth, setNaturalWidth] = useState(null);
    const [naturalHeight, setNaturalHeight] = useState(null);

    useEffect(() => {
        const image = new Image();
        image.src = golfRangeSvg;

        image.onload = () => {
        const newNaturalWidth = image.width;
        const newNaturalHeight = image.height;

        setNaturalWidth(newNaturalWidth);
        setNaturalHeight(newNaturalHeight);
        };
    }, []);

    // Calculate the aspect ratio
    const aspectRatio = naturalWidth && naturalHeight ? (naturalHeight / naturalWidth) * 100 : 0;

    return (
        <div>
            <div className="image-placeholder" style={{ paddingTop: `${aspectRatio}%` }}></div>
            <img src={golfRangeSvg} alt="Golf Range" className="golf-range rounded"/>
        </div>
    );
}

export default GolfRangeComponent;