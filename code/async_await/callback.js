const _request = require('request');
const translate = require('google-translate-api');

// Wrapper
function request(url, callback)
{
    _request(url, function (error, response, body)
    {
        if (!error)
        {
            const requestIsValid = (response.statusCode >= 200 && response.statusCode < 300)

            if(requestIsValid)
            {
                callback(JSON.parse(body));
            }
            else
                console.error("Resource error", error);
        }
        else
            console.error("Network error", error);
    });
}

// Real code starts here

function printUserData(userID)
{
    console.log("Getting user data...");

    request(`https://jsonplaceholder.typicode.com/users/${userID}`, data =>
    {
        console.log(`\nUser#${userID} is: ${data.username}\n`);

        request(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`, data =>
        {
            const secondPost = data[2];
            const secondPostContents = secondPost.body;

            console.log(`His/her second post states that: \n${secondPostContents}\n`)

            translate(secondPostContents, {from: 'la', to: 'en'})
            .then(response => 
            {
                const translatedPostContents = response.text;

                console.log(`Which means: \n${translatedPostContents}\n`)
            })
            .catch(error => 
            {
                console.error("Translation error", error);
            });
        })
    });
}

/*
Actual calling
*/
console.log("Tick");
printUserData(2);
console.log("Tock");