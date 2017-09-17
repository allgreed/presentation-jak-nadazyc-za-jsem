String.prototype.capitalize = function() 
{
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const axios = require('axios');

const HTTP = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

HTTP.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error), // "rethrows" error
);

exports.promiseRequest = function promiseRequest(url)
{
    return HTTP.get(url);
}

exports.translate = require('google-translate-api');

exports.print =
{
    hello()
    {
        console.log("Getting user data...");
    },
    name(id, username)
    {
        console.log(`\nUser#${id} is: ${username.capitalize()}\n`);
    },
    post(contents)
    {
        console.log(`His/her second post states that: \n\n${contents.capitalize()}\n`)
    },
    translation(translation)
    {
        console.log(`Which means: \n\n${translation.capitalize()}\n`)
    }
}

const _request = require('request');

exports.request = function request(url, callback)
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
