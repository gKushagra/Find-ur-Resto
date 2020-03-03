# Find-ur-Resto
 Pick-ur-Resto, a web application to help people find resturants of their choice!
How does it makes easier using my website to locate resturants? 

->When the page loads up, it displays the nearest resturants to the user's location along with his location displayed in location input field. If the user isn't satisfied with the results the search gave back, he can enter certain cuisines/resturants for example, Burger King or Smoothie King or KFC or Mexican or Thai, etc. whichever he likes the most or is searching for. Upon clicking the 'Find-ur-Resto!'  button,  the search returns nearest resturants that best match users search criteria. Most relevant and required information is displayed, like if resturant is open, price for two, rating based on reviews, phone number and a link to Yelp page of the resturant is user wants to discover more! The UI is easy to read, simple and uses vibrant colors, and displays all the information required. Also, the website is Mobile ready! 

Website URL: https://gkushagra.github.io/Find-ur-Resto/

Github Repository: https://github.com/gKushagra/Find-ur-Resto



Folder Structure (Important Files):

--css 

        -main.css

--js 

        -main.js



/index.html



File descriptions:

1. index.html: contains html code for website

2. main.css: contains css for the website.

3. main.js: contains the functions to fetch data from api, get user location, display data, and take user input.

Note, adequate comments are added!



My approach:

1. Create a prototye of the website; design the layout, pick colors, add forms to take user input.

2. Write th code for the designed prototype in HTML and CSS.

3. Using HTML5 Geolocation, get the current coordinates of user and using Geocoding API, get the current address by passing coordinates in Query String. Display the address in Location input field.

4. Inject Script for Google Maps JavaScript API to access the API upon page load.

5.  Initialize the map canvas and write a function to plot the markers on the map.

6. Populate the current location marker on map.

Now, initially we can fetch resturants nearby the users location.

7. Ajax call to fetch JSON data from the Yelp Fusion Api (Authorization added in header) using the Query String:

?term=food&latitude=${lat}&longitude=${lon}&limit=50

where, lat and lon are users current coordinates.

Note, that the page doesn't refresh and when ajax call is successfull, data is displayed nicely in the <div>. 

8. Once the call is successfull, loop over the data  and append the data in the <div>. Also, plot the markers method is called to generate the markers on the map canvas.

Till now we displayed the results based on users current location. Now, we add the functionality to let the user search for 

his/her favorite cuisine and his/her location in the input fields and click on "Find-ur-Resto!" button to search.

9. The Query string this time would be:

?term=${cuisine}&location=${location}&limit=50

where, location is the address user entered and cuisine what the user entered as input.

10. Once a successfull ajax call is made, the '#displayResults' <div> is set empty to clear previous data and newly fetched data is displayed. Also, the markers plotted.  
