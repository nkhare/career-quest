document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const resultText = document.getElementById("result");
    const jobcardButton = document.getElementById("jobcardButton"); // Show details button

    let spinning = false;
    let spinSpeed = 10;
    let startAngle = 0;
    let selectedJob = "";
    const numSegments = jobs.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;

    // Define colors dynamically
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F3FF33", "#FFA500", "#800080", "#00CED1", "#FFD700"];

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < numSegments; i++) {
            let start = startAngle + i * anglePerSegment;
            let end = startAngle + (i + 1) * anglePerSegment;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, start, end);
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(start + anglePerSegment / 2);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.font = "bold 18px Arial";
            ctx.fillText(jobs[i], radius * 0.6, 0);
            ctx.restore();
        }

        // Draw pointer arrow
        ctx.beginPath();
        ctx.moveTo(centerX - 20, centerY - radius - 25);
        ctx.lineTo(centerX + 20, centerY - radius - 25);
        ctx.lineTo(centerX, centerY - radius - 5);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    function spinWheel() {
        if (spinning) return;
        spinning = true;
        spinSpeed = Math.random() * 20 + 10;

        function animateSpin() {
            if (spinSpeed > 0.2) {
                startAngle += (spinSpeed * Math.PI) / 180;
                spinSpeed *= 0.98;
                requestAnimationFrame(animateSpin);
            } else {
                spinning = false;
                selectJob();
            }
            drawWheel();
        }

        jobcardButton.style.display = "none"; // Hide button until new job is selected
        animateSpin();
    }

    function selectJob() {
        const pointerAngle = (3 * Math.PI) / 2;
        let normalizedStartAngle = startAngle % (2 * Math.PI);
        if (normalizedStartAngle < 0) normalizedStartAngle += 2 * Math.PI;
        let adjustedAngle = pointerAngle - normalizedStartAngle;
        if (adjustedAngle < 0) adjustedAngle += 2 * Math.PI;
        const segmentAngle = (2 * Math.PI) / numSegments;
        let selectedIndex = Math.floor(adjustedAngle / segmentAngle);
        selectedJob = jobs[selectedIndex];

        resultText.innerText = "Congratulations! You've unlocked the " + selectedJob + " Career Card!";
        jobcardButton.style.display = "block"; // Show button after spin completes

        // Send the selected job to Flask
        fetch("/set_selected_job", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ job: selectedJob })
        }).then(response => response.json());
    }

    jobcardButton.addEventListener("click", function() {
        window.location.href = "/jobcard";
    });

    canvas.addEventListener("click", spinWheel);
    drawWheel();
});

/* spinwheel */
/*document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const resultText = document.getElementById("result");
    const jobcardButton = document.getElementById("jobcardButton"); // Show details button

    let spinning = false;
    let spinSpeed = 10;
    let startAngle = 0;
    let selectedJob = "";
    const numSegments = jobs.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;

    // Define colors dynamically
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F3FF33", "#FFA500", "#800080", "#00CED1", "#FFD700"];

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Outer Dark Circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 2, 0, 2 * Math.PI);
        ctx.fillStyle = "#222"; // Dark outer circle
        ctx.fill();
        ctx.closePath();

        for (let i = 0; i < numSegments; i++) {
            let start = startAngle + i * anglePerSegment;
            let end = startAngle + (i + 1) * anglePerSegment;

            // Create a gradient for a glowing effect
            let gradient = ctx.createLinearGradient(centerX, centerY - radius, centerX, centerY + radius);
            gradient.addColorStop(0, colors[i % colors.length]);
            gradient.addColorStop(1, "#ffffff"); // Light fade

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, start, end);
            ctx.fillStyle = gradient;
            ctx.fill();


            // Add a darker border around each segment
            ctx.strokeStyle = "#000"; 
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();

            // Add shadow effect for 3D look
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 5;

            // Draw text with better styling
            ctx.save();
            ctx.translate(centerX, centerY); // Move origin to center
            ctx.rotate(start + anglePerSegment / 2); // Rotate to segment center
            ctx.textAlign = "center"; // Align text in the middle
            ctx.textBaseline = "middle"; // Vertically center text
            ctx.fillStyle = "#000"; // White text for contrast
            ctx.font = "bold 18px Arial"; 
            ctx.fillText(jobs[i], radius * 0.6, 0); // Move text inside the segment
            ctx.restore();

        }

        // Reset shadow for other elements
        ctx.shadowBlur = 0;

        // Draw a center circle for aesthetic appeal
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFD700"; // Gold color
        ctx.fill();

        ctx.lineWidth = 2;  // Set border thickness
        ctx.strokeStyle = "#000"; // Black border
        ctx.stroke();  // Apply border

        ctx.closePath();


        // Draw arrow (indicator) - Made bigger & stylish
        ctx.beginPath();
        ctx.moveTo(centerX - 20, centerY - radius - 25);
        ctx.lineTo(centerX + 20, centerY - radius - 25);
        ctx.lineTo(centerX, centerY - radius - 5);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    function spinWheel() {
        if (spinning) return;
        spinning = true;
        spinSpeed = Math.random() * 20 + 10;

        function animateSpin() {
            if (spinSpeed > 0.2) {
                startAngle += (spinSpeed * Math.PI) / 180;
                spinSpeed *= 0.98;
                requestAnimationFrame(animateSpin);
            } else {
                spinning = false;
                selectJob();
            }
            drawWheel();
        }

        animateSpin();
    }

    function selectJob() {
        const pointerAngle = (3 * Math.PI) / 2; // Indicator at top
        let normalizedStartAngle = startAngle % (2 * Math.PI);
        if (normalizedStartAngle < 0) normalizedStartAngle += 2 * Math.PI;
        let adjustedAngle = pointerAngle - normalizedStartAngle;
        if (adjustedAngle < 0) adjustedAngle += 2 * Math.PI;
        const segmentAngle = (2 * Math.PI) / numSegments;
        let selectedIndex = Math.floor(adjustedAngle / segmentAngle);
        selectedJob = jobs[selectedIndex];

        resultText.innerText = "Congratulations! You've unlocked the " + selectedJob + " Career Card!";
        jobcardButton.style.display = "block"; // Show button
        // Send the selected job to Flask
        fetch("/set_selected_job", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ job: selectedJob })
        }).then(response => response.json());

        canvas.removeEventListener("click", spinWheel); // Disable further spins
    }

    jobcardButton.addEventListener("click", function() {
        window.location.href = "/jobcard"; // Redirect to job details
    });

    canvas.addEventListener("click", spinWheel);
    drawWheel();
});
*/
/*
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');

    // Toggle dropdown on button click
    dropdownButton.addEventListener('click', function(event) {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
        event.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!dropdownContent.contains(event.target) && !dropdownButton.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });
});
*/


function toggleDropdown() {
    document.getElementById("dropdownContent").classList.toggle("show");
}

// Function to handle job selection from the dropdown
function selectJob(job) {
    // Display the result message
    document.getElementById("result").innerText = `Congratulations! You've unlocked the ${job} Career Card! 🎉`;

    // Send the selected job to Flask
    fetch("/set_selected_job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job: job })
    }).then(response => response.json());

    // Hide the dropdown
    document.getElementById("dropdownContent").classList.remove("show");

    // Make the 'Show Jobcard Details' button visible
    document.getElementById("jobcardButton").style.display = "block";
}

// Ensure jobcardButton exists before adding an event listener
const jobcardButton = document.getElementById("jobcardButton");
if (jobcardButton) {
    jobcardButton.addEventListener("click", function() {
        window.location.href = "/jobcard"; // Redirect to job details
    });
}

// Close the dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.matches('.career-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};
/*Index.html */

document.addEventListener('DOMContentLoaded', function() {
    var app = document.getElementById('narrative');

    var typewriter = new Typewriter(app, {
      loop: false,
      delay: 75,
      cursor: '|', // Customize cursor if desired
    });

    typewriter
      .pauseFor(500)
      .typeString('It is important to find work that you enjoy and that makes you happy.')
      .pauseFor(300)
      .typeString('As Steve Jobs wisely said, "The only way to do great work is to love what you do.')
      .callFunction(() => {
        // Remove the cursor after typing is complete
        const cursor = document.querySelector('.Typewriter__cursor');
        if (cursor) {
          cursor.style.display = 'none';
        }
      })
      .start();
});
