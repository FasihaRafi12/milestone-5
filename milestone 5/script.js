// TypeScript for Enhanced Shareable Resume Builder
// Get references to form elements and display sections
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadpdfButton = document.getElementById('download-pdf');
//handle form submission 
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // save from data in localstorage with the username as the key 
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    //resume the content dynamically
    var resumeHTML = "\n <h2> Editable Resume</h2>\n <h3personal information </h3>\n <p> <strong>Name:</strong> <span contenditable = \"true\"> ".concat(name, "<span></p>\n <p><strong> email:</strong><span contenditable = \"true\"> ").concat(email, "<span></p>\n <p><strong> phone : </strong> <span contenditable = \"true\"> ").concat(phone, "<span></p>\n\n <h3>Education</h3>\n <p contenditable = \"true\">").concat(education, "</p>\n <h3>Experience</h3>\n <p contenditable = \"true\">").concat(experience, "</p>\n <h3>Skills</h3>\n <p contenditable = \"true\">").concat(skills, "</p>\n");
    // display the generate rsume 
    resumeDisplayElement.innerHTML = resumeHTML;
    var shareableURL = "".concat(window.location.origin, "?username= ").concat(encodeURIComponent(username));
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
downloadpdfButton.addEventListener('click', function () {
    window.print();
});
window.addEventListener('DOMContentLoaded', function () {
    var urlparams = new URLSearchParams(window.location.search);
    var username = urlparams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
