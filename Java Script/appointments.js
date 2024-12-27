let queueNumbers = {
    cardiologist: 1,
    dermatologist: 1,
    orthodontist: 1,
};

// Open form for the specified consultant
function openForm(consultant) {
    document.getElementById(`popup-form-${consultant}`).style.display = "flex";
    document.getElementById(`greeting-message-${consultant}`).style.display = "none"; // Hide greeting message initially
    populateAvailabilityDropdown(consultant); // Populate date dropdown dynamically
}

// Populate the availability dropdown with dates (Thursday to Sunday)
function populateAvailabilityDropdown(consultant) {
    const availabilityDropdown = document.getElementById(`availability-${consultant}`);
    const today = new Date();
    
    // List of days from Thursday to Sunday
    const daysOfWeek = ["Thursday", "Friday", "Saturday", "Sunday"];
    const dates = [];

    // Get the date for each day (starting from today)
    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayIndex = (today.getDay() + (i < today.getDay() ? 7 : 0) + (i - today.getDay())) % 7;
        const nextDay = new Date(today.setDate(today.getDate() + (dayIndex - today.getDay())));
        const dayOfWeek = daysOfWeek[i];
        const dateFormatted = nextDay.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        dates.push({ day: dayOfWeek, date: dateFormatted });
    }

    // Populate the dropdown with day and date combinations
    availabilityDropdown.innerHTML = '<option value="" disabled selected>Select a Date</option>';
    dates.forEach(dateObj => {
        const option = document.createElement("option");
        option.value = dateObj.date;
        option.textContent = `${dateObj.day}, ${dateObj.date}`;
        availabilityDropdown.appendChild(option);
    });
}

// Close form for the specified consultant
function closeForm(consultant) {
    document.getElementById(`popup-form-${consultant}`).style.display = "none";
    document.getElementById(`appointment-form-${consultant}`).style.display = "block"; // Reset form visibility
}

// Add form submission event listeners for all consultants
["cardiologist", "dermatologist", "orthodontist"].forEach((consultant) => {
    document.getElementById(`appointment-form-${consultant}`).addEventListener("submit", function (event) {
        event.preventDefault();
        showGreetingMessage(consultant);
    });
});

// Show greeting message and reference number for the specified consultant
function showGreetingMessage(consultant) {
    const doctorDropdown = document.getElementById(`doctor-option-${consultant}`);
    const selectedDoctorName = doctorDropdown.options[doctorDropdown.selectedIndex].text;

    if (!doctorDropdown.value) {
        alert("Please select a doctor.");
        return;
    }

    // Show greeting message and reference number
    document.getElementById(`greeting-message-${consultant}`).style.display = "block";
    document.getElementById(`appointment-form-${consultant}`).style.display = "none"; // Hide form fields
    document.getElementById(`queue-number-display-${consultant}`).textContent = queueNumbers[consultant];
}

// Generate and download PDF for the specified consultant
function downloadPDF(consultant) {
    const fullName = document.getElementById(`full-name-${consultant}`).value;
    const phoneNumber = document.getElementById(`phone-number-${consultant}`).value;
    const availability = document.getElementById(`availability-${consultant}`).value;
    const paymentOption = document.getElementById(`payment-option-${consultant}`).value;
    const doctorDropdown = document.getElementById(`doctor-option-${consultant}`);
    const selectedDoctorName = doctorDropdown.options[doctorDropdown.selectedIndex].text;

    if (!doctorDropdown.value) {
        alert("Doctor selection is required.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add text content to the PDF
    doc.text(`Appointment Details`, 20, 20);
    doc.text(`Full Name: ${fullName}`, 20, 30);
    doc.text(`Phone Number: ${phoneNumber}`, 20, 40);
    doc.text(`Availability: ${availability}`, 20, 50);  // This now includes both day and date
    doc.text(`Payment Option: ${paymentOption}`, 20, 60);
    doc.text(`Selected Doctor: ${selectedDoctorName}`, 20, 70);
    doc.text(`Reference Number: ${queueNumbers[consultant]}`, 20, 80);

    // Save the PDF
    doc.save(`appointment-details-${consultant}.pdf`);

    // Increment the queue number after PDF is downloaded
    queueNumbers[consultant]++;
}
