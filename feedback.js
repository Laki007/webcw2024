function validateForm() {
  const name = document.getElementById('fname').value;
  const email = document.getElementById('lname').value;
  const improvement = document.getElementById('improvement').value;
  const visitYes = document.getElementById('yes').checked;
  const visitNo = document.getElementById('no').checked;
  const informativeYes = document.getElementById('informative').checked;
  const informativeNo = document.getElementById('informative').checked;

  // Check if name is filled
  if (!name) {
    alert("Please enter your name.");
    return false;
  }

  // Check if email is valid (optional - remove if email is not required)
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Check if at least one radio button is selected for "First Visit" question
  if (!visitYes && !visitNo) {
    alert("Please answer if this is your first visit.");
    return false;
  }

  // Check if at least one radio button is selected for "Informative Website" question
  if (!informativeYes && !informativeNo) {
    alert("Please answer if the website was informative and easy to navigate.");
    return false;
  }

  // Check if "Improvement" field is filled only if "No" is selected for "Informative Website"
  if (!informativeYes && !improvement) {
    alert("Please provide suggestions for improvement if the website wasn't informative.");
    return false;
  }

  return true;
}

function updateRatingValue(val) {
  document.getElementById('ratingValue').innerHTML = val;
}

// Add your code to submit the form data to an email address here
// This example uses a placeholder function for demonstration purposes
function submitFeedback() {
  // Implement logic to send form data to email using an email service API or server-side script
  alert("Thank you for your feedback! We will review it shortly.");
}
