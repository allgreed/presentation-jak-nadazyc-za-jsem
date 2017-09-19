const {translate, promiseRequest, print} = require('./boilerplate');

function printName(userID)
{
    return promiseRequest(`users/${userID}`)
    .then(data =>
    {
        const { username } = data;

        print.name(userID, username);
    });
}

function printPost(userID)
{
    return promiseRequest(`posts?userId=${userID}`)
    .then(data =>
    {
            const secondPostContents = data[2].body;

            print.post(secondPostContents);

            return secondPostContents;
    });
}

function printTranslation(secondPostContents)
{
    translate(secondPostContents, {from: 'la', to: 'en'})
    .then(data =>
    {
            const translatedPostContents = data.text;

            print.translation(translatedPostContents);
    });
}


function printUserData(userID)
{
    print.hello();

    printName(userID)
    .then(nothingRealy => printPost(userID))
    .then(postContents => printTranslation(postContents))
    .catch(error => 
    {
        console.error("Promise rejection", error);
    });
}

// /*
// Call
// */

console.log("Tick");
printUserData(2);
console.log("Tock");
