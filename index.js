'use strict';

const vandium = require( 'vandium' );

const getSizeOfWebsitePromise = require(

    './lambda_function_logic/get_size_of_website_promise'
);

const websiteUrlRegex = /^https:\/\/lessonshop.net$|^https:\/\/vandium.io$|https:\/\/github.com$/;

const validation = {

    // NOTE: can also validate "pathParameters", and "queryStringParameters"
    // in the same way as validating the "body" below

    body: {

        websiteUrl: vandium.types.string().regex( websiteUrlRegex ),
    }
};


exports.handler = vandium.api()
    .headers({

        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    })
    .POST(
        /* NOTE: using a POST request for demonstrative purposes only.
         A GET request makes more sense for this particular function
         because this function is getting something */

        validation,

        event => {

            console.log( 'the event:', JSON.stringify( event, null, 4 ) );

            const websiteUrl = event.body.websiteUrl;

            console.log( 'the requested website url is:', websiteUrl );

            console.log( 'getting the size of the requested website' );

            return getSizeOfWebsitePromise(

                websiteUrl

            ).then( sizeOfWebsite => {

                const data = {

                    sizeOfWebsite
                };

                console.log(

                    'Successfully got the size of the website,',
                    'returning the following object:',
                    JSON.stringify( data, null, 4 )
                );

                return data;
            });
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
