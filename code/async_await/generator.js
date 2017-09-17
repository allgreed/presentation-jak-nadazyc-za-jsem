const {translate, promiseRequest, print} = require('./boilerplate');

function runGenerator(generatorFunction) {
    const generator = generatorFunction()
    let ret;

    (function iterate(data){
        _action = generator.next(data);

        if (!_action.done) 
        {
            const isPromise = ("then" in _action.value);

            if (isPromise)
                _action.value.then(iterate);
            else 
                setTimeout(() => { iterate( _action.value ); }, 0 );
        }
    })();
}


function printUserData(userID)
{
    function _printUserData(userID)
    {
        return function* __printUserData()
        {
            print.hello();
            let data;

            data = yield promiseRequest(`users/${userID}`)
            const { username } = data;
            print.name(userID, username);

            data = yield promiseRequest(`posts?userId=${userID}`)
            const secondPostContents = data[2].body;
            print.post(secondPostContents);
            
            data = yield translate(secondPostContents, {from: 'la', to: 'en'})
            const translatedPostContents = data.text;
            print.translation(translatedPostContents);
        }
    }

    runGenerator(_printUserData(userID));
}

// /*
// Call
// */

console.log("Tick");
printUserData(2);
console.log("Tock");
