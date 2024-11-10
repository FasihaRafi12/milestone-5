// TypeScript for Enhanced Shareable Resume Builder

// Get references to form elements and display sections
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement  = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadpdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

//handle form submission 
form.addEventListener('submit',(event:Event)=> {
    event.preventDefault();
    // collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
// save from data in localstorage with the username as the key 
const resumeData= {
    name,
    email,
    phone,
    education,
    experience,
    skills
};
localStorage.setItem(username,JSON.stringify(resumeData));
//resume the content dynamically
 const resumeHTML = `
 <h2> Editable Resume</h2>
 <h3personal information </h3>
 <p> <strong>Name:</strong> <span contenditable = "true"> ${name}<span></p>
 <p><strong> email:</strong><span contenditable = "true"> ${email}<span></p>
 <p><strong> phone : </strong> <span contenditable = "true"> ${phone}<span></p>

 <h3>Education</h3>
 <p contenditable = "true">${education}</p>
 <h3>Experience</h3>
 <p contenditable = "true">${experience}</p>
 <h3>Skills</h3>
 <p contenditable = "true">${skills}</p>
`;
// display the generate rsume 
resumeDisplayElement .innerHTML = resumeHTML
 const shareableURL =`${window.location.origin}?username= ${encodeURIComponent(username)

 }`;
 shareableLinkContainer.style.display='block';
 shareableLinkElement.href= shareableURL;
 shareableLinkElement.textContent=shareableURL;


})
downloadpdfButton.addEventListener('click',()=>{
    window.print();
});
window.addEventListener('DOMContentLoaded',()=>{
    const urlparams = new URLSearchParams(window.location.search)
    const username =urlparams.get(`username`)
    if(username){
        const savedResumeData = localStorage.getItem(username);
        if(savedResumeData){
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username')as HTMLInputElement).value=username;
            (document.getElementById('name')as HTMLInputElement).value=resumeData.name;
            (document.getElementById('email')as HTMLInputElement).value=resumeData.email;
            (document.getElementById('phone')as HTMLInputElement).value=resumeData.phone;
            (document.getElementById('education')as HTMLTextAreaElement).value=resumeData.education;
            (document.getElementById('experience')as HTMLTextAreaElement).value=resumeData.experience;
            (document.getElementById('skills')as HTMLTextAreaElement).value=resumeData.skills;
        }
    }
})