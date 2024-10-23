
# Link Shortener Application

Welcome to the Link Shortener app! This web application allows users to shorten long URLs, store user-specific history, and manage authentication with JWT. Users can view, edit, and delete their shortened URL history. The app also features contact and issue reporting functionality, providing seamless communication with the admin.


## Features ✨



- JWT Authentication:  Secure authentication using JSON Web Tokens (JWT). Only registered users can shorten URLs, view history, and manage their accounts.
- Shorten URLs: Instantly shorten any URL for easier sharing.
- User History: After logging in, users can view their personal URL shortening history, edit or delete entries.
- Delete History: Delete any or all URLs from your shortening history.
- Admin Contact Form: Users can report issues via a contact form that is stored in the database for the admin to review.
- Three Pages:
    -  Home Page: Displays all key features of the app.
    - About Page: Provides detailed information about the application.
    - Contact Page: Contains a form to report issues to the admin.


## Tech Stack 🛠️

**Client:** Ejs, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB (for storing user history and contact form data)

**Authentication:** JSON Web Tokens (JWT)

**Templating Engine:** EJS


## Installation & Setup 🖥️

To get started with the project locally:

**1.** Clone the Repository:

```bash
 git clone https://github.com/yourusername/link-shortener.git

```
**2.** Install Dependencies:

```bash
cd link-shortener
npm install

```
**3.** Start the Application:

```bash
 npm start

```

The app will be available at http://localhost:3000.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=3000`

`JWT_SECRET=<your_secret>`

`MONGO_URI=<your_mongo_db_connection_string>`



## Endpoints 🌐

**User Authentication 🔑**
   - POST /login: Authenticate the user using JWT.
   - POST /register: Register a new user.
   - GET /logout: Logout and destroy JWT session.
**URL Shortening & History 🔗**
   - POST /shorten: Shorten a given URL (requires authentication).
   - GET /showhistory: Fetch user’s URL shortening history.
   - DELETE /deletehistory/
        - Delete a specific URL history item.
**Contact & Reporting Issues 📞**
   - POST /contact: Submit the contact form to report issues. Saves data in the database for the admin.


## Page Overview 📄

**Home Page 🏠**

This is the central hub where users can:
- Shorten URLs.
- View and manage their shortened URL history (after login).
- Access the login and registration forms.

**About Page ℹ️**
- Provides a brief overview of the application, describing its purpose and functionality.

**Contact Page 📬**
- Users can submit a form to report issues, and the data will be stored in the database for the admin to address.



## Contributing

We welcome contributions! If you'd like to improve the app, feel free to submit a pull request or open an issue.

**1.** Fork the repository.

**2.** Create a new branch (git checkout -b feature-branch).
Make your changes.

**3.** Push your branch and submit a pull request.


## Contact

If you have any questions or suggestions, feel free to reach out:

**Email:** ankitbisht9837@gmail.com

**LinkedIn:** https://www.linkedin.com/in/ankitb-webd9905/

**GitHub:** https://github.com/ankitbisht020
 
 
 
***Enjoy using the Link Shortener! 😊***
