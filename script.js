document.addEventListener("DOMContentLoaded", function () {
    const clubFaceInput = document.getElementById("club-face");
    clubFaceInput.addEventListener("input", updateClubFace);

    const swingPathInput = document.getElementById("swing-path");
    swingPathInput.addEventListener("input", updateSwingPath);
    
    const ballFlightInputOne = document.getElementById("club-face");
    ballFlightInputOne.addEventListener("input", updateBallFlight);

    const ballFlightInputTwo = document.getElementById("swing-path");
    ballFlightInputTwo.addEventListener("input", updateBallFlight);

    function updateClubFace() {
        const clubHead = document.getElementById("club-head");
        const curveAmount = clubFaceInput.value; // Get the slider value
        clubHead.style.transform =  `translate(-50%, -50%) rotate(${curveAmount}deg)`;

        const clubFaceTitle = document.getElementById("club-face-label");
        clubFaceTitle.textContent = "Club Face: (" + curveAmount + " degrees)";
        console.log(clubHead.style.transform)
    }

    function updateSwingPath() {
        const swingPath = document.getElementById("swing-path-arrow");
        const curveAmount = swingPathInput.value; // Get the slider valuu
        swingPath.style.transform =  `translate(-50%, -50%) rotate(${curveAmount}deg)`;

        const clubFaceTitle = document.getElementById("swing-path-label");
        clubFaceTitle.textContent = "Swing Path: (" + curveAmount + " degrees)";
    }

    function updateBallFlight() {
        const ballFlightVisual = document.getElementById("ballFlightVisual");

        let svgContent = "";
        if (swingPathInput.value > clubFaceInput.value) {
            // Fade Path
            svgContent = `
            <svg viewBox="0 0 200 164" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48.4597 23.2885C47.9084 23.2554 47.4347 23.6755 47.4016 24.2268L46.8626 33.2107C46.8295 33.762 47.2496 34.2357 47.8009 34.2688C48.3522 34.3019 48.8259 33.8818 48.859 33.3305L49.3382 25.3448L57.3238 25.824C57.8751 25.8571 58.3488 25.437 58.3819 24.8857C58.415 24.3344 57.9949 23.8607 57.4436 23.8276L48.4597 23.2885ZM193.982 80.9047C159.203 82.2453 133.819 80.08 111.74 71.5363C89.6764 62.9983 70.8088 48.0495 49.148 23.6232L47.6517 24.9502C69.4238 49.5019 88.5426 64.7041 111.019 73.4015C133.48 82.093 159.189 84.2473 194.059 82.9032L193.982 80.9047Z" fill="black"/>
            </svg>

            `;
        } else if (swingPathInput.value == clubFaceInput.value) {
            // Straight
            svgContent = `
            <svg viewBox="0 0 200 164" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.2929 81.2929C28.9024 81.6834 28.9024 82.3166 29.2929 82.7071L35.6568 89.0711C36.0474 89.4616 36.6805 89.4616 37.0711 89.0711C37.4616 88.6805 37.4616 88.0474 37.0711 87.6568L31.4142 82L37.0711 76.3431C37.4616 75.9526 37.4616 75.3194 37.0711 74.9289C36.6805 74.5384 36.0474 74.5384 35.6568 74.9289L29.2929 81.2929ZM186 81L30 81L30 83L186 83L186 81Z" fill="black"/>
            </svg>
            `;
        } else {
            // Draw Path
            svgContent = `
            <svg viewBox="0 0 200 164" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.0699 141.358C45.0575 141.91 45.4951 142.368 46.0472 142.38L55.045 142.582C55.5971 142.594 56.0547 142.157 56.0671 141.605C56.0795 141.053 55.642 140.595 55.0898 140.582L47.0918 140.403L47.2713 132.405C47.2837 131.853 46.8462 131.395 46.294 131.383C45.7419 131.37 45.2842 131.808 45.2718 132.36L45.0699 141.358ZM190.362 81.2503C158.224 80.8311 134.178 83.9777 112.039 93.1164C89.9065 102.252 69.7655 117.341 45.3786 140.658L46.7607 142.103C71.0738 118.857 91.0038 103.963 112.802 94.9651C134.593 85.9701 158.337 82.8327 190.336 83.2502L190.362 81.2503Z" fill="black"/>
            </svg>
            `;
        }
        // Set the new SVG content
        ballFlightVisual.innerHTML = svgContent;
    }

    // Initialize based on the initial slider value
    updateClubFace();
    updateSwingPath();
    updateBallFlight();
});

