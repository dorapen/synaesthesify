# Data Visualisation Experiments with Spotify API.
Synaesthesify (Synaesthesia + Spotify) is an experimental project to explore
ways of playing around with song-related data provided by Spotify API.
It uses [track features API](https://developer.spotify.com/web-api/get-audio-features/)
to generate visualisation.

# Running the app
You will need to first create your Spotify App and get Client ID and Client Secret.
You can do it from [here](https://beta.developer.spotify.com/dashboard/).

Once you have your keys, create `.env` file and insert your data as follows.
```
CLIENT_ID = your_key_here
CLIENT_SECRET = your_secret_here
```

After that, simply run
```bash
yarn install
```
or if you are using npm
```bash
npm install
```
to install dependencies.

Finally, run
```bash
yarn start
```
or
```
npm run start
```
to run the application.
