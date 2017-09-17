const {translate, promiseRequest, print} = require('./boilerplate');

async function printUserData(userID)
{
    print.hello();
    let data;

    data = await promiseRequest(`users/${userID}`)
    const { username } = data;
    print.name(userID, username);

    data = await promiseRequest(`posts?userId=${userID}`)
    const secondPostContents = data[2].body;
    print.post(secondPostContents);
    
    data = await translate(secondPostContents, {from: 'la', to: 'en'})
    const translatedPostContents = data.text;
    print.translation(translatedPostContents);
}

// /*
// Call
// */

console.log("Tick");
printUserData(2);
console.log("Tock");
