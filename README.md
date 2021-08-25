# Introduction - TASKr

Team TYTHON welcomes you to its InceptionU - Project 3 submission... TASKr.

Our team consists of members Art Treleaven (dev), Ben Isenstein (dev), Chloe Silvester (dev), Donna Dempsey (dev), and Tony Enerson (Product Owner / Scrum Master).

THE CHALLENGE :
Household tasks never getting done? Whether forgetting the schedule or not knowing what to do, maintaining a home or managing a few can be challenging, but we have an answer!

OUR SOLUTION :
Now with TASKr, the recurring home management app, your maintenance tasks are only a
click away. Upon creation of an account, you create your digital home with a customizable list of tasks based on industry-recognized standards.
Notifications, lists and calendars are among the views you have to remind yourself of upcoming tasks and we’ll help you keep records once you are finished. We can even assist with finding service providers and tracking your costs, no matter how many homes you manage. 


# Background

The TASKr project began from the same REACT mono-repo structure of Greg Fenton's SUPERHOEROES template.
It is a MERN (MongoDB, ExpressJS, ReactJS, Node.js) application made
of two processes:
   1. an Express "server" providing API support for retrieving and submitting
   data from the backend
   2. a React "client" providing a web-based UI


# Using the online app

TASKr has been deployed to the web using HEROKU, and can be launched using the following URL.
https://taskr-1.herokuapp.com/


# Working with this Codebase
## Starting the Express server

In a command shell (CMD, PowerShell, Terminal, etc.) run the commands:
1. `cd server`
1. `npm install`
1. `npm run start`

The server is now running on port *3000*.

## Starting the React client

In a command shell run the commands:
1. `cd client`
1. `npm install`
1. `npm run start`

Your browser should open to `http://localhost:4444`.  The React development
system is running on port *4444*.

# Using your own MongoDB instance

You can run MongoDB locally on your machine or you can sign up for a no-cost(!)
account at `https://www.mongodb.com/`.

Once you have your MongoDB instance set up, simply edit the login information
that is found in `server/models/db.js` using a locally stored ".env" file to store your unique and confidential connection string.
