# Laboratory Exercise 1 - Social Network-Based Programming

## Laboratory Exercise Objectives

The goal of this laboratory exercise is to learn the basics of social network-based programming and get familiar with:

- **NoSQL databases**
- **API communication**
- **Integration of different web services**

---

## 📋 Task

Design, create and implement an application whose functionality will be part of project. You need to combine and use several web resources through APIs (Application Programming Interface) and a NoSQL database.

---

## 🎯 Task Framework

### Mandatory Requirements:

1. **🔗 Three Data Sources + NoSQL Database**

   - Use at least **three data sources**
   - Use **one NoSQL database**

2. **👤 Social Media Login**

   - Enable login using a social network (one data source)
   - Google

3. **💾 User Data Storage**

   - Store basic user data after login
   - Data: first name, last name, email address
   - Save to NoSQL database

4. **🔄 Data Fetching and Storage**

   - Fetch arbitrary content from selected data sources
   - Store content in database
   - Display application capabilities after successful login

5. **⚙️ Data Manipulation**

   - Enable manipulation of stored data
   - Examples: filtering by parameters, data deletion
   - Implement in client-side part

6. **🎨 Client-Side Display**
   - Minimum requirement: data not displayed in JSON format
   - User interface required

## Data Sources

- #### 1. **🎞️ Movie Information** - OMDb API
- **URL:** [omdbapi.com](https://omdbapi.com)
- **Purpose:** Get detailed movie information and metadata
- **Data:** Movie titles, ratings, plot, cast, genres, posters
- **Use:** Search and display movie details

#### 2. **📺 Streaming Availability** - RapidAPI Streaming Availability
- **URL:** [rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability)
- **Purpose:** Find where movies are available to stream
- **Data:** Streaming platforms (Netflix, Amazon Prime, Hulu, etc.), availability by country
- **Use:** Show users where they can actually watch recommended movies