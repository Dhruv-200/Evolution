document.addEventListener("mousemove", (event) => {
	const cube = document.querySelector(".cube");
	const { innerWidth: width } = window;

	// Map mouse X position to rotation angle and clamp it
	const mouseX = event.clientX;
	const maxAngle = 10; // Maximum rotation angle
	const rotationY = Math.max(
		-maxAngle,
		Math.min(maxAngle, ((mouseX / width) * 2 - 1) * maxAngle)
	);

	// Apply the rotation and margin-left to the cube
	cube.style.transform = `rotateY(${rotationY}deg)`;
});

const rangeSlider = document.getElementById("zRange");
const zValueText = document.getElementById("zValue");
const body = document.querySelector("body");

// Initial value
let zTranslation = Number(rangeSlider.value); // Convert the slider value to a number explicitly

// Function to update cube translation
function updateCubeZ() {
	// Calculate the numeric value (in thousands)
	const numericValue = zTranslation * 10000 + 6000000;

	// Format the number in millions with commas
	const formattedValue = new Intl.NumberFormat("en-US").format(numericValue);

	// Update the text content
	zValueText.textContent = `-${formattedValue} Years`;

	if (numericValue < 10000000 || numericValue > 550000000) {
		zValueText.classList.remove("visible");
		zValueText.classList.add("hidden");
	} else {
		zValueText.classList.remove("hidden");
		zValueText.classList.add("visible");
	}

	// Update the CSS variable for total length
	body.style.setProperty("--variable-length", `${zTranslation}px`);
}

// Listen to scroll event
window.addEventListener("wheel", (e) => {
	// Adjust the zTranslation based on scroll direction and speed
	zTranslation += e.deltaY * 5; // Multiply by a negative value to invert direction if needed

	// Clamp the value to ensure it's within 0 to 65000
	zTranslation = Math.max(0, Math.min(65000, zTranslation));

	updateCubeZ();

	// Stop rotation on scroll
	isRotating = false;
});

// Initialize positions on page load
updateCubeZ();

// Handle the infinite Y rotation and stopping on scroll
let isRotating = true;
let rotationYValue = 0;

function rotateCube() {
	if (isRotating) {
		// Use Math.sin to create a smooth oscillation between -10 and 10 degrees
		const time = Date.now() * 0.001; // Time factor for continuous motion
		rotationYValue = Math.sin(time * 0.5) * 5; // Multiplied by 10 to get range from -10 to 10

		const cube = document.querySelector(".cube");
		cube.style.transform = `rotateY(${rotationYValue}deg)`;

		// Continue the animation
		requestAnimationFrame(rotateCube);
	}
}

// Start the rotation
rotateCube();

// DOMContentLoaded to hide opacity effect
document.addEventListener("DOMContentLoaded", () => {
	const frontMain = document.querySelector(".front.main");

	// Add the 'hidden' class to transition opacity
	setTimeout(() => {
		frontMain.classList.add("hidden");
	}, 100); // Small delay to ensure the transition applies
});
