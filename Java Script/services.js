// Open popup for different test types
function openPopup(testType) {
  const popup = document.getElementById(testType + 'Popup');
  popup.style.display = 'flex';
  popup.setAttribute('aria-hidden', 'false');
}

// Close popup for different test types
function closePopup(testType) {
  const popup = document.getElementById(testType + 'Popup');
  popup.style.display = 'none';
  popup.setAttribute('aria-hidden', 'true');
}

// Handle background click to close popup
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });
});

// Generate random reference number
function generateReferenceNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Handle form submission for any test type
function handleFormSubmission(testType) {
  document.getElementById(testType + 'Form').onsubmit = function (event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById(testType + 'Name').value;
    const phone = document.getElementById(testType + 'Phone').value;
    const date = document.getElementById(testType + 'Date').value;
    const time = document.getElementById(testType + 'Time').value;

    if (!time) {
      alert('Please select a preferred time.');
      return;
    }

    // Generate reference number
    const referenceNumber = generateReferenceNumber();
    document.getElementById(testType + 'ReferenceNumber').textContent = referenceNumber;

    // Show confirmation message
    document.getElementById(testType + 'ConfirmationMessage').style.display = 'block';

    // Add event listener for download button
    document.getElementById(testType + 'DownloadReceipt').onclick = function () {
      generatePDF(name, phone, date, time, referenceNumber, testType);
    };
  };
}

// Generate PDF for any test type
function generatePDF(name, phone, date, time, referenceNumber, testType) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Care Plus ${testType.charAt(0).toUpperCase() + testType.slice(1)} Booking Confirmation`, 20, 20);
  doc.setFontSize(12);
  doc.text(`Name: ${name}`, 20, 40);
  doc.text(`Phone Number: ${phone}`, 20, 50);
  doc.text(`Preferred Date: ${date}`, 20, 60);
  doc.text(`Preferred Time: ${time}`, 20, 70);
  doc.text(`Reference Number: ${referenceNumber}`, 20, 80);

  // Save the PDF
  doc.save(`${testType.charAt(0).toUpperCase() + testType.slice(1)}BookingConfirmation.pdf`);
}

// Initialize form handlers for each test type
['bloodTest', 'urineTest', 'xrayTest', 'mriTest'].forEach(testType => {
  handleFormSubmission(testType);

  // Handle cancel button for each test type
  document.getElementById(testType + 'CancelButton').onclick = function() {
    closePopup(testType);
  };
});
