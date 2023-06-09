# README

## brdfeedr app

This is the "brd feedr" app, fulfilling the requirements of my Phase 4 project at Flatiron.

It acts kind of like Yelp for birds, allowing Bird users to create, explore, and create Reviews for Bird Feeders (all of which are named for restaurants in Chicago), and then view, edit, and delete the Reviews that they have made. While a Bird at the moment cannot view specific Reviews that other Birds have made, they can view the total number of Reviews for each Feeder, as well as the average rating.

More features (such as viewing other Birds' profiles) will be coming!

### Sessions and Cookies

Logging in assigns the :bird_id from the Bird resource as the :user_id in sessions, allowing the ability to stay logged in and to authenticate certain routes, namely bird.update, review.update, and review.delete. A user can only update or delete (as appropriate) resources that they created. 

## Deployed

This app is currently deployed through Render at the following URL: 
https://brd-feedr-app.onrender.com

However, if you'd like to run it locally perform the following steps:

(make sure you have Rails and PostreSQL installed)

$ bundle install
$ rails db:create
$ rails db:migreate db:seed
$ rails server

In the client folder:

$ npm install
$ npm start

### Client

brd feedr utilizes a React client, incorporating Client-Side Routing to separately render a user's Home Page, a user's Reviews, and all the Feeders. On logging out useHistory returns to the Home Page route, making sure that the next user to log in will view the proper component upon logging in.

#### Components

App
 - base component, contains Header and all Routes. Conditionally renders all Route components upon successful fetch of user and feeders in their respective Context components

SignupForm
 - allows a new user to create a profile

LoginForm
 - allows an existing user to log in with their username and password

Header
 - contains app title
 - displays NavBar and Logout

NavBar
 - provides links to different routes for purposes of client side routing

Logout
 - displays currently logged in user, logout button

UserProfile
 - displays information about the user
 - contains buttons that render modals containg forms to update general user info (EditUserForm) and the user's password (EditUserPWForm)

EditUserForm
 - allows the user to update their Fun Fact and Neighborhood

EditUserPWForm
 - allows the user to update their password

UserRevContainer
 - contains a version of UserProfile with no edit buttons
 - holds all ReviewCards

ReviewCard
 - displays data about each Review the user has created
 - includes edit and delete buttons

EditRevForm
 - form that allow the user to edit fields in existing Reviews

FeedersContainer
 - main container for all Feeder related components
 - allows sorting of all Feeders
 - contains FeederForm, FeederSortMenu, and all FeederCards

FeederForm
 - allows the user to create a new Feeder

FeederSortMenu
 - allows the user to choose how they'd like the FeederCards to be displayed (alphabetically, by neighborhood, by rating, etc). The function that performs the actual sort is contained in FeedersContext

FeederCard
 - displays info about each Feeder
 - conditionally renders button to create a Review if certain criteria are met

RevForm
 - allows the user to create a Review for a given Feeder

#### Context

This app includes 2 context components in order to incorporate global state - one for User data and one for Feeder data.

The UserContext provides the User object, along with the reviews belonging to that user, to other components as needed. It also contains the functions responsible for updating User state whenever the User creates, updates, or deletes a review, allowing for up-to-date info on the number of reviews the user has created and details for each of those reviews. 

The FeederContext provides an array containing all the Feeders, including those that the User has not reviewed. Much like UserContext it contains a number of functions relating to the Feeder array in order to streamline the assorted components that use the array. Notably, it handles the processes of sorting the Feeders based on certain inputs from the sort menu, finding and returning a feeder from its ID, adding new feeders to the array, and updating the related Reviews information whenever a User creates, updates, or deletes one of their reviews. 

The Context Providers wrap the App component in index.js, allowing App to access the global state and render the assorted Routes upon successfully fetching both sets of data. 

### Server

bird feedr uses Ruby on Rails as an API, serving JSON data to the React front end. It uses PostreSQL as a database system in order to facilitate deployment using Render.

#### Table Organization

At the current stage brd feedr has 3 tables, creating a many-to-many relationship. A wireframe chart displahing the relationships graphically along with available methods for certain models can be found at the following Google Drive link: 
https://drive.google.com/file/d/11rz559FoxH49diXA6JAypMabereqe2mP/view?usp=sharing

#### Models

##### Birds

Has many Reviews
Has many Feeders, through Rerviews

integer - id
string - username
string - species
string - neighborhood
string - img_url
string - fun_fact
string - password_digest

Methods - .num_reviews

##### Feeders

Has many Reviews
Has many Birds, through Rerviews

integer - id
string - name
integer - refill_freq
string - neighborhood

Methods - .average_rating, .num_reviews

##### Reviews

Belongs to Bird
Belongs to Feeder

integer - id
integer - bird_id
integer - feeder_id
integer - rating
string - text
datetime - updated_at

#### Controllers

Using Rails convention, each controller gets its own file. 

Birds has create, read, and update capabilities.
Feeders has create, read, and update capabilities.
Reviews has full CRUD capabilities, but update and delete can only be performed by the user who created them when that user is logged in.

## Roadmap

Options for future expansion/development:
 - Add Links to Feeders to allow user to see more info about each Feeder, including all reviews for each Feeder and the Birds who created them
 - Add ability to explore other Bird profiles, including viewing their reviews
 - Add ability to follow other Birds, incorporating a many-to-many relationship between Follower Birds and Followee Birds