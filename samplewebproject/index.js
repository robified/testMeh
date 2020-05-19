document.querySelector('form').addEventListener('submit', (event) => {
    // this is to prevent the browser from submitting the form
    event.preventDefault();

    const { value } = document.querySelector('input');

    const header = document.querySelector('h1');

    // an email is valid if it has an '@' character
    if (value.includes('@')) {
        // must be valid
        header.innerHTML = 'Looks fabulous!';
    } else {
        // must be invalid
        header.innerHTML = 'Invalid email';
    }
});
