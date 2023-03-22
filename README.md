# How to run the app in you local machine

- You'll need an API key:
  Documentation is here: https://api.nasa.gov/ and you can get an API key from that page.

- Add the key as REACT_APP_API_KEY='addYourKeyHere' in a .env file

- npm i

- npm start

- Or you can enjoy the deployed app here:
  https://is-the-end-near.onrender.com/

# Fourth Floor Challenge

- First I created a new repository and then I created a React App (which is the framework I am confident with).

## Plan the Near Earth App:

- Two entries (input or curtain of dates) for start and end.

- Of each object that comes back from that time frame:

  - Name, Diameter, is it hazardous, sentry object

- When the near earth object is clicked on, it should display its next 5 approaches and previous 5 approaches to earth

## Creating the App:

- I'm going to use Postman to see what information I get back with my API key

- I wrote a fetch request in the DatesEntry Component, and I am console.logging the data that I receive

- When looking at data by doing request in postman it only allows the time frame to be a maximum of 7 days. - Need to work on this :construction: I thought I will take a look to see if I can have a calendar with a range of dates

- I targeted the data needed to display, I will work on how it looks once the its got the necessary functionality

- I have created another fetch request for a singular object, right now it returns the approach dates when clicked on the object

- Worked on the style of the app

- Accessibility google lighthouse

- Stretch goals: calendar to select a range of maximum a week, tests, handling errors, authentication and authorisation for user to have a list of favourite stellar bodies
