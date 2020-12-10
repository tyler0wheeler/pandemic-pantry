# The Pandemic Pantry
    [The Pandemic Pantry](https://the-pandemic-pantry.herokuapp.com/)
## *The Inspiration*
------------------------
Living in a COVID-19 world has it's own unique set of challenges.  All of our lives completely changed over night and now we are forced to live by a new set of guidelines in order to protect ourselves and others.  This new way of life has forced people to spend much of their free time at home.  With restaurants and bars closed or limited in they way they can serve their patrons, may people have found themselves cooking instead of eating out.  I wanted to create an app that allowed users to find inspiration for their cooking and to inspire others.  
When the virus hit, grocery stores were overrun and picked over.  Suppliers could not keep up with this new spike in demand and shortages of the products we use to be able to come by with ease were not always availible to us.  With these shortages and most people cooking at home, we often had to get creative with the little ingredients we had on hand.

## *So What does this app provide to the User?*
------------------------------------------------
The Pandemic Pantry has an array (pun intended) of features for the user to experience.  The app is broken down into two main parts:
* A third party Search Engine from Spoonacular to search recipes by ingredients
* a full CRUD feature that allows users to upload their own recipes and choose to make them public or private
Users can access the shared recipes and the search function without an account.  Once the user creates a username and password, they have access to the entire site.  They can create, delete, edit, and share recipes.  They can also save recipes they searched on the third party API.  Each user has their own page called "My Cookbook" that stores all of the recipes they create.  In that view they can edit and delete recipes and ingredients.  There is a navagtion bar that provides a clear path to navigate the site for the user.

## *Wireframes*
-----------------
![Wireframe](/wireframes/wireframe1.png)
![Wireframe](/wireframes/wireframe2.png)
![Wireframe](/wireframes/wireframe3.png)

## *Languages Used*
--------------------
* Javascript
* Python
* React
* Flask
* Semantic UI React
* React Reveal
* SQLite
* HTML/CSS

## Problems Encountered
------------------------
My original plan for this application was to use a Postgres database because I wanted to send lists of data to the backend.  Unfortunantly I was unable to figure that out.  Instead I had to use SQLite and figure out how to create one-to-many relations between recipes, users, and ingredients.  I also ran into some trouble with how to display the json I would receive from the backend for the saved recipe searches.  With some javascript tricks of the trade I was able to solve that problem to the best of my ability.  Deploying to Heroku is never easy and that was met with it's own unique challenges but I was able to come out on top.

## *The Future of the Pandemic Pantry*
------------------------------------
As the database grows on the site and more users sign up and interact, I would like to create a search features that allows users to search this database as well as a third party.  I have started writing some code to accomplish that and will be coming in future versions of the site.  I would also like to make the site a bit more interactive.  I am not one of loves the "social" aspect of social media but it is what the user seems to want these days.  Creating a rating system for each recipe would be the extent of that.

## *THANK THANK THANK YOU*
---------------------------
This project marks the end of my journey at General Assembly.  Looking back on all I have learned and created in these short (but long) three months is absolutely amazing to me.  I can not thank the staff of GA enough for providing me the opportunity to change my life for the better.  Deja, Mohammed, Matt, Brian, Nathan, Paresh, and Cheslie: THANK YOU SO MUCH!!!  All the help and knowledge you provided me will not soon be forgotten. 