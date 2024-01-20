const firebaseConfig = {
    apiKey: "AIzaSyDSAUJOiIwEvu-w9WKnC84incHQmIj7v2E",
    authDomain: "theem-doc.firebaseapp.com",
    projectId: "theem-doc",
    storageBucket: "theem-doc.appspot.com",
    messagingSenderId: "407111670911",
    appId: "1:407111670911:web:3f7857bbd5262aa586334a",
    measurementId: "G-SKQMMJQDXD"
  };
export {firebaseConfig};


// Firebase configuration
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Variable to access database collection
const db = firebase.firestore();

// Get Signup Form Submit Button
let signupButton = document.querySelector(".signupbtn");

// Create Event Listener To Allow Form Submission
signupButton.addEventListener("click", (e) => {
  // Prevent Default Form Submission Behavior
  e.preventDefault();

  // Get Form Values
  let firstName = document.getElementById("name").value;
  let lastName = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Check if the user already exists
  db.collection("fomData")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const fn = doc.data().fname;
        if (firstName === fn) {
          console.log("User already exists");
          return;
        }
      });

      // Save Form Data To Firebase
      db.collection("fomData")
        .add({
          fname: firstName,
          lname: lastName,
          email: email,
          password: password,
        })
        .then(() => {
          // Alert
          alert("Your Form Has Been Submitted Successfully");

          // Clear form after submission
          clearForm();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
});

// Function to clear the form fields
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}



