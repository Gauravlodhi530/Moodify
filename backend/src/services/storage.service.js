var ImageKit = require("imagekit");
var mongoose = require('mongoose');

// Validate environment variables
if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT || !process.env.IMAGEKIT_PUBLIC_KEY) {
    console.error('Missing ImageKit configuration in environment variables');
    process.exit(1);
}

var imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY
});


function uploadFile(file){
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file:file.buffer,
            fileName:(new mongoose.Types.ObjectId()).toString(), 
            folder:"music"
        },(error,result)=>{
            if(error){
                reject(error);
            }else{
             resolve(result);
            }
        })
    });
}

module.exports = uploadFile;

// const authEndpoint = "https://accounts.spotify.com/authorize";
// const clientId = "d34a9314e43247799bb0c173eae6aff3";
// const redirectUri = "https://gauravkumarportfolio.vercel.app/callback"
// // "&"http://localhost:3000/callback";
// const scopes = [
//   "user-read-private",
//   "user-read-email",
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   "streaming"
// ];

// const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

// module.exports = loginUrl;
