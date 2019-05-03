This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### View Live

You can the app live at [https://weather-app-landing-page.netlify.com](https://weather-app-landing-page.netlify.com)

### Run locally

Run `npm install`.<br>
Run `npm start`.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Setup Notes

##### I added the following packages to expedite development:
* axios - makes easy API calls<br>
* react-ga - tracking user clicks with Google Analytics<br>
* material-ui - reusuable web components that would reduce css and grid layout build time for all devices. Material-UI components also come with default props like `disabled` that can be easily modified with event handlers<br>

### Design Notes
For this app, I wanted to create a clear call to action while previewing some app features. On the weather panel (left side), I displayed a preview weather report view with a `see more` link that would shake the call-to-action panel to incentize sign up. The `see more` link is attached to a React Google Analytics event listener that tracks whether this design decision is effective.<br><br>

On the call-to-action panel, I created a simple sign up form with a clean zipcode input form and bright checkbox on click. The sign up button glows hot pink when the form has the data it needs. When the button is clicked, it toggles a seperate Google Analytics event listener for tracking.<br><br>

I created seperate folders for reusability to contain google analytics logic, handle material-ui component imports and attach a shake animation to a link. I also create a Styles.js file so I could quickly replicate and scale the landing page UI decisions to future similar projects.


