'use strict';

const https = require( 'https' );


module.exports = ( websiteUrl ) => {

    return new Promise( (resolve, reject) => {

        https.get( websiteUrl, response => {

            response.on( 'error', err => {

                console.log( 'an error occured:', err );
                console.log( 'here is the error message:', err.message );

                reject( err );
            });

            let theWebsiteString = '';

            // another chunk of data has been recieved,
            // you need to add all the chunks together to get the whole website
            response.on( 'data', chunkOfData => {

                theWebsiteString += chunkOfData;
            });

            // the whole response has been recieved
            response.on( 'end', () => {

                console.log(

                    'here is the complete result of the get request: ',
                    theWebsiteString
                );

                const sizeOfWebsite = theWebsiteString.length;

                console.log(

                    'here is the size of the website: ',
                    sizeOfWebsite
                );

                resolve( sizeOfWebsite );
            });
        });
    });
};
