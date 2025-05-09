document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener("submit", (e) => {
        console.log("::::FORM REGISTRATION::::")
        e.preventDefault()

        const formData = new FormData(registrationForm);

        axios.post('http://localhost:3300/register', formData)
        .then(res => {
            console.log(res.data.message || "Registered successfully")
        })
        .catch(err => {
            console.log(err.response.data.message || "Registration failed")
            console.log(err)
        })
        
    })
})