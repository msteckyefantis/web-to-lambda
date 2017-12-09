'use strict';

const vandium = require( 'vandium' );

const getSizeOfWebsitePromise = require(

    './lambda_function_logic/get_size_of_website_promise.js'
);

const websiteRegex = /^https:\/\/lessonshop.net$|^https:\/\/vandium.io$|https:\/\/github.com$/;

const validation = {

    // NOTE: can also validate "pathParameters", and "queryStringParameters"
    // in the same way as validating the "body" below

    body: {

        website: vandium.types.string().regex( websiteRegex ),
    }
};


exports.handler = vandium.api()
    .headers({

        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    })
    .POST(

        validation,

        event => {

            console.log( 'the event:', JSON.stringify( event, null, 4 ) );

            const website = event.website;

            console.log( 'getting the size of the requested website' );

            return getSizeOfWebsitePromise( website );
        }

    ).onError( err => {

        console.log( 'error in 😎The Vandium Framework😎 wrapped Lambda function:', err );

        return {

            statusCode: err.status || err.statusCode || 400,

            body: {

                message: err.message
            }
        };
    });
