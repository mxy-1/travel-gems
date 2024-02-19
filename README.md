# Travel Gems 

## Description
Travel gems is an application that allows users to search and view unique, user generated travel locations, known as travel gems. Logged in users can upload new gems, save and review travel gems. This full-stack application was created as a group project, with an aim of exploring and utilising new technologies, including Next.js, MongoDB and Google Maps API. To view the website, visit https://travel-gems.vercel.app/explore.

## Requirements
- Node.js version 20.8.0 or above. For the latest version, visit: https://nodejs.org/en/
- Google Maps API key: https://developers.google.com/maps/documentation/javascript/get-api-key. NEXT_PUBLIC_GOOGLE_API_KEY will be the same value as GOOGLE_API_KEY
- MongoDB URI: https://www.mongodb.com/cloud/atlas/register

## Getting started
1. Clone the repository: ```git clone https://github.com/mxy-1/travel-gems.git```
2. Set up the project and install the relevant packages: ```npm install```
3. Create a .env file in the root directory
4. Create a value for AUTH_SECRET. This can be done on the command line: ```openssl rand -base64 32```. For more details: https://next-auth.js.org/configuration/options.
5. Add to the .env file and replace with your API keys:
```
AUTH_SECRET=<API_KEY>
MONGODB_URI_DEV=<API_KEY>
GOOGLE_API_KEY=<API_KEY>
NEXT_PUBLIC_GOOGLE_API_KEY=<API_KEY>
```
6. ```npm run dev``` and go to http://localhost:3000 to view the website.

## Usage 
To demo the project, users can visit the website and log in with the following details:
- username: bob
- password: bob

## Contributors
Thanks to my group for their hard work:
- Dominique Anekore: ultacc / DominiqueCoding
- Spencer Clarke-Griffiths: SpencerCGriffiths
- Hala Hassan: hala-jash
- Josh Holt: theRohirrim
- Winnie Kwok: winniekwoknorth

## Acknowledgements
Thank you to the tutors at Northcoders that have supported me throughout the course. The knowledge and skills I gained here made creating this application possible.