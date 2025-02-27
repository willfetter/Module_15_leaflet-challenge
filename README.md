# Module_15_leaflet-challenge
 Module 15 - Mapping - By William Fetter
 
# Description
This assignment creates a leaflet visualization diplaying all USGS earthquake data for the past 7 days. It shows earthquake locations with circles, the magnitude or the earthquakes as represented by the size of the circles, and the depth of the earthquakes as represented by the color of the circles. 

# Instructions for Use
Launch the visualization by opening "index.html" file with Live Server, or my viewing by following the link: https://willfetter.github.io/leaflet-challenge/

Map layers can be via the drop down menu on the top right. Select the map background desired along with the layers desired to be turned on or off. 

# Background Information
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

# Input Files
The initial input files for the assignment are located within the "Module_15_leaflet-challenge/Starter_Code" folder

# OutPut Files
The resulting output files for the assignment are located within the main "Module_15_leaflet-challenge" directory and are located in the file:
- static/js/logic.js
  
## Instructions
#### Part 1 - Create the Earthquate Visualization
Your first task is to visualize an earthquake dataset. Complete the following steps:
1. Get your dataset. To do so, follow these steps:
     - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize.
     - When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. 
2. Import and visualize the data by doing the following:
     - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
       - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
     - Include popups that provide additional information about the earthquake when its associated marker is clicked.
     - Create a legend that will provide context for your map data.
     - Your visualization should look something like the preceding map.
  
#### Part 2 - Gather and Plot More Data (Optional with no extra points earning)
Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplatesLinks to an external site..

This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.

Perform the following tasks:
 * Plot the tectonic plates dataset on the map in addition to the earthquakes.
 * Add other base maps to choose from.
 * Put each dataset into separate overlays that can be turned on and off independently.
 * Add layer controls to your map.
  
## Resources:
 - Class information and videos - for basics of coding and building foundation
 - Stack overflow - for trouble shooting, and researching best code practices
 - Dataset created by the United States Geological Survey 
