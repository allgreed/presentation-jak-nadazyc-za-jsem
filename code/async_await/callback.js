const {translate, request, print} = require('./boilerplate');

function printUserData(userID)
{
    print.hello();

    request(`https://jsonplaceholder.typicode.com/users/${userID}`, data =>
    {
        const { username } = data;

        print.name(userID, username);

        request(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`, data =>
        {
            const secondPostContents = data[2].body;

            print.post(secondPostContents);

            translate(secondPostContents, {from: 'la', to: 'en'})
            .then(data => 
            {
                const translatedPostContents = data.text;

                print.translation(translatedPostContents);
            })
            .catch(error => 
            {
                console.error("Translation error", error);
            });
        })
    });
}

/*
Call
*/

console.log("Tick");
printUserData(2);
console.log("Tock");
