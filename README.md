Neighborhood Map Project
===============================

* If you want to see the project online [click here](http://karlafernandes.github.io/FE-Nanodegree-Project-5/)
* If you download the source, please open index.html in a browser

## List of things that could be improved

* Drop at the start and no animation on filter list
* add [instagram.com](http://www.instagram.com) pictures with #tag name from the place


## Project Overview

Single page application featuring a map of a neighborhood, which has additional functionality including highlighted locations, third-party data about those locations and various ways to browse the content.

* Interact with API servers
* Use of third-party libraries and APIs


# GENERAL INSTRUCTIONS 

## How will I complete this Project?

1. Review our course [JavaScript Design Patterns](https://www.udacity.com/course/ud989-nd).
2. Download the [Knockout framework](http://knockoutjs.com/). Knockout must be used to handle list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by knockout: anything the map api is used for, tracking markers, making the map, refreshing the map.
3. Write code required to add a full-screen map to your page using the Google Maps API. For sake of efficiency, the map API should be called only once.
4. Write code required to display map markers identifying at least 5 locations that you are interested in within this neighborhood. Your app should display those locations by default when the page is loaded.
5. Implement a list view of the set of locations defined in step 4.
6. Provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly in real-time. Providing a search function through a third-party API is not enough to meet specifications.
7. Add functionality using third-party APIs to provide information when a map marker or list view entry is clicked (ex. Yelp reviews, Wikipedia, Flickr images, etc). If you need a refresher on making AJAX requests to third-party servers, check out our Intro to [AJAX course](https://www.udacity.com/course/ud110-nd).
8. Add functionality to animate a map marker when either the list item associated with it or the map marker itself is selected.
9. Add functionality to open an infoWindow with the information described in step 7 when either a location is selected from the list view or its map marker is selected directly.
10. The app's interface should be intuitive to use. For example, the input text area to filter locations should be easy to locate. It should be easy to understand what set of locations is being filtered. Selecting a location via list item or map marker should cause the map marker to bounce or in some other way animate to indicate that the location has been selected and associated info window should open above map marker with additional information.
11. Error Handling: In case of error (e.g. in a situation where a third party api does not return the expected result) we expect your webpage to do one of the following: A message is displayed notifying the user that the data can't be loaded, OR There are no negative repercussions to the UI. Note: Please note that we expect students to handle errors if the browser has trouble initially reaching the 3rd-party site as well. For example, imagine a user is using your neighborhood map, but her firewall prevents her from accessing the Instagram servers. Here is a reference article on [how to block websites](http://www.digitaltrends.com/computing/how-to-block-a-website/) with the hosts file. It is important to handle errors to give users a consistent and good experience with the webpage. Read [this blogpost](http://ruben.verborgh.org/blog/2012/12/31/asynchronous-error-handling-in-javascript/) to learn more .Some JavaScript libraries provide special methods to handle errors. For example: refer to .fail() method discussed [here](http://api.jquery.com/jquery.ajax/#jqXHR) if you use jQuery's ajax() method. We strongly encourage you to explore ways to handle errors in the library you are using to make API calls.


## Helpful Resources
None of these are required, but they may be helpful.

- [Foursquare API](https://developer.foursquare.com/start)
- [MediaWikiAPI for Wikipedia](http://www.mediawiki.org/wiki/API:Main_page)
- [Google Maps Street View Service](https://developers.google.com/maps/documentation/javascript/streetview)
- [Google Maps](https://developers.google.com/maps/documentation/)
- [Project 5 Overview WebCast](https://github.com/udacity/fend-office-hours/tree/master/Javascript%20Design%20Patterns/P5%20Project%20Overview)
- [Knockout JS Tutorials](http://learn.knockoutjs.com/)
- [Todo MVC Knockout Example](http://todomvc.com/examples/knockoutjs/)

