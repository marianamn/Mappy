Team Leage of the Five
=========

----------

##Mappy##


###Team members usernames:###
-   Natali_Adamova
-   marianamn
-   Wazer
-   nProdanov
-   vaspet


###Project desctiption:###
Mappy is an application which tests geography knowledge via 2 types of games:

-  **Guess the Contry Game** - You are given a map of all 50 European countries and a question: Where is ...? You should hoover over the map and click on the place where you think this particular country is situated. If your answere is correct one point will be added to your game scores. You can check your score progress in Rankings.
-  **Test your Knowledge Game** - Choose a particular country from the map and click on it. A question will pop up with four possible answeres that you can choose from. There is only one correct answere. If your answere is correct one point will be added to your game scores. You can check your score progress in Rankings.


###Public (accessible without authentication) dynamic web pages:###

- **/** - home page - shows links to the Games
- **/terms** - shows games rules
- **/rankings** - shows total games score of the Top 10 players
- **/rankings/guess-the-country-score** - shows Guess the country game score of the Top 10 players
- **/rankings/test-your-knowledg-score** - shows Test your knowledg game score of the Top 10 players
- **/countries** - lists all European countries  flags list
- **/countries?page=pages** - shows the next page of countries
- **/countries/:id** - shows country detailed information
- **/more-games** - related games to visit

###Login/Redister:###

- **/auth/register** - Registration form
- **/auth/login** - LogIn form

###Private (authenticated) dynamic web pages:###

- **/game/guess-the-country** - shows the Guess the country game and a question: Where is ...? for quessing the correct country
- **/game/test-your-knowledge** - shows the Test your knowledg game
- **game/test-your-knowledge/country** - shows the question for the selected country
- **/users/username** - shows the profile information for the selected user
- **/communication/chat** - shows the chat page
- **/rankings/guess-the-country-score** - shows Guess the country game score of the Top 10 players with active username link
- **/rankings/test-your-knowledg-score** - shows Test your knowledg game score of the Top 10 players with active username link

###Admin dynamic web pages:###

- **/admin/panel** - alows the Admin of the page to: change user role; add question or see the analytics
- **/admin/panel/createQuestion** - shows add question page
- **/admin/panel/analytics** - shows the whole analytics page for all  users
- /**admin/panel/analytics/user/:id** - shows detailed analytics page for the specific user and his actions in the app


###Public RESTful routes:###

- **/api/register**
- **/auth/login**
- **/api/users** - autocomplete functionality for Search by username functionality


###Private RESTful routes:###

- **/api/chat**
- /**api/users/username**
- **/api/countries**
- **/api/profile**
- **/api/evaluate** - question handlerer


###Additional functionality:###

- Sign in with Facebook
- Search by username
- Update personal profile information
- See Top players profile information
- Error handling and data validation
- Handled special HTML characters and tags like 
- Responsive design
- Share page on Facebook
- Git source code link
- Watch project youTube video link
 
###Unit tests (72 tests):###

- Test analytics data model - **3 tests**
- Test authentication data - **2 tests**
- Test chat data - **2 tests**
- Test country data - **7 tests**
- Test question data - **6 tests**
- Test user data - **19 tests**
- Test validator data - **13 tests**
- Test admin router - **12 tests**
- Test home router - **2 tests**
- Test comunication router - **2 tests**