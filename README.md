# Open Tender Web App

An open source web app powered by the Open Tender unified commerce platform for restaurants.

![image](https://s3.amazonaws.com/betterboh/u/img/prod/2/1626303523_docs_open-tender-web_1800x1041.jpg)

This app provides extensive e-commerce functionality for Open Tender customers. [Check out our demo site](https://web.opentender.io/) to get a sense for what it's capable of (once you start an order, a good address to use is `240 E Illinois St, Chicago, IL`).

The details of all of the available functionality are available on the [Online Ordering](https://www.opentender.io/products/olo) and [Catering](https://www.opentender.io/products/catering) pages of [the Open Tender website](https://www.opentender.io/). This web app handles both order types out of the box, including all manners of ordering: pickup, delivery, outpost, dine-in, catering, etc.

## Getting Started

This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux Toolkit](https://redux-toolkit.js.org/) template. See the "Available Scripts" section below for guidance on basic usage.

To get started, pull down a copy of the repo and run `yarn install` in your new directory. This will install all of the dependencies for the project. Once you've done this, follow the steps below to get up and running.

Add an `.env` file that looks like this:

```
SKIP_PREFLIGHT_CHECK=true
```

Add an `.env.development` file that looks like this:

```
REACT_APP_AUTH_URL=https://api.sandbox.opentender.io
REACT_APP_API_URL=https://api.sandbox.opentender.io/order-api
REACT_APP_CLIENT_ID=[OPEN_TENDER_CLIENT_ID]
REACT_APP_BRAND_ID=[OPEN_TENDER_BRAND_ID]
```

An Open Tender client ID and brand ID will be provided by the Open Tender dev team once your company (if you're a restaurant) or your client (if you're a design agency) has established an Open Tender account. For more information about this, please visit the Open Tender website.

Once those `.env` files have been added, run `yarn start` to start the app. The app should open up at http://localhost:3000, and it should be able to make requests to the Open Tender Sandbox API. Please note that you can change your port by adding `PORT=[PORT_NUMBER]` to your `.env.development` file, such as `PORT=3010`.

## Available Scripts

Since this app was originally started from Create React App (CRA), it comes with all of the regular CRA scripts, and we've added a couple of additional ones:

### `yarn build:staging`

This is used for deploying to staging per the instructions below.

### `yarn prebuild`

This is used for versioning of the app, which allows for cache busting on the client side. See `src/app/version.js` for details into how this works.

In short, the `yarn prebuild` script updates the `meta.json` file that lives in the `public` directory. Each time the `maybeRefreshVersion()` function runs (which runs on every page load by default), it checks to see if the version of the user's app matches this version. If not, it will automatically reload the page, which ensures that the user has the latest and greatest code.

In order to leverage this, each time you push a new version to staging or production, you should increment the app version using `yarn version` (typically in conjunction with one of the `--patch`, `--minor`, or `--major` flags, see [the docs on `yarn version` for details](https://classic.yarnpkg.com/en/docs/cli/version/)), and then run the `yarn prebuild` script and commit the updated `meta.json` file.

This will guarantee that your users always get the latest version of the app, even if they don't refresh the page or load a new window when coming back to the app after they've already visited it.

## `@open-tender` libraries

The Open Tender web app relies heavily on three Open Tender libraries:

### `@open-tender/redux`

This library handles nearly all of the state management for the app and all of the interactions with the Open Tender API.

It provides a number of Redux reducers, actions, async action creators, and selectors that are used extensively throughout the Open Tender web app. All of the state that comes from `@open-tender/redux` lives under the `data` attribute of the Redux store (see `store.js` for details). This includes nearly 30 reducers as of July 2021. See [the `@open-tender/redux` repo](https://github.com/open-tender/open-tender-redux) for the details of each of these reducers or just check out the state using the Redux dev tools.

As an example, to fetch a list of restaurant locations (we can them "revenue centers" in Open Tender), you would simply dispatch an action like so:

```javascript
dispatch(fetchRevenueCenters({ type: 'OLO' }))
```

This will make a request to the Open Tender API to retrieve the restaurants of the `OLO` type for your brand and then load the response into the `data.revenueCenters` reducer, which looks like this:

```javascript
{
  revenueCenters: [],
  loading: 'idle',
  error: null,
}
```

You can then use the `selectRevenueCenters` selector to use the fetched revenue centers in your component like this:

```javascript
const { revenueCenters, loading, error } = useSelector(selectRevenueCenters)
```

### `@open-tender/js`

This library provides a large number of utility and helper functions that are used extensively throughout the Open Tender web app, as well as the `@open-tender/redux` and `@open-tender/components` libraries. This includes loads of datetime functions, as well as functions related to cart management, checkout, and normalizing data. See [the `@open-tender/js` repo](https://github.com/open-tender/open-tender-js) for details.

### `@open-tender/components`

This library provides a number of the most complex components used by the Open Tender web app, including several `GoogleMaps` components, the menu item `Builder` component, and all of the forms (including the massive `CheckoutForm`). Many of these components have been decoupled into custom hooks and presentational components so you can customize the presentation while getting all the complex functionality "for free" (the `useBuilder` custom hook is a prime example). Please see [the `@open-tender/components` repo](https://github.com/open-tender/open-tender-components) for details.

## Styling via Emotion (for CSS-in-JS & theme support)

The Open Tender web app uses [Emotion](https://emotion.sh/docs/introduction) for CSS-in-JS and theme support, specifically the `@emotion/react` and `@emotion/styled` packages (so we rely on Emotion's styled components implementation).

The Open Tender Admin Portal allows each brand to establish a theme through configuration - they can choose their fonts, font sizes, colors, and customize the appearance of various elements such as buttons and links. Once your restaurant company has established an Open Tender account, you should take a tour of all the different style settings available via the Admin Portal and see if / how it can be helpful for you. Here's a quick glimpse:

![image](https://s3.amazonaws.com/betterboh/u/img/prod/2/1626298622_open-tender-styles-config-example.png)

There are A LOT of styles that can be set this way. Of course, you can choose to ignore it entirely and set all your styles in your version of the web app itself, but **we encourage you to read on to understand how the theme works, regardless of how it's being populated**. The reason being that the components coming from the `@open-tender/components` library leverage the built-in theme, so you'll need to embrace it in some way if you want to use any of these out-of-the-box components. The `CheckoutForm` component, for instance, is a very complex component that perhaps you don't want to have to think about - no need to reinvent the wheel if you don't have to.

When the app initially loads, the first thing it does is make a request to the Open Tender `/order-api/config` endpoint, which returns a payload that includes a `theme` attribute. An example of the theme object can be seen [here](https://github.com/open-tender/open-tender-web/blob/main/THEME.md).

This theme object is then provided to the Emotion `ThemeProvider` component in the `App` component, which makes the theme available to all lower level styled components via `props.theme` ([see the Theming section of the Emotion docs](https://emotion.sh/docs/theming)).

The theme is used extensively in the `GlobalStyles` component to establish the global styles of the app, leveraging `css`, `Global` and `withTheme` from Emotion. It's also used throughout many of the components themselves, so it's very helpful to understand how it works.

## Configuration

When the app initially loads, it makes a requst to the Open Tender `/order-api/config` endpoint to retrieve the content, styles, and other settings that the brand has configured in the Open Tender Admin Portal (see `src/slices/configSlice` for details of how this works). This configuration data is used extensively throughout the app, and it's important that this data is up to date.

The config object looks like this:

```javascript
{
  "brand": {},
  "clientId": "string",
  "content": {},
  "settings": {},
  "theme": {}
}
```

It gets loaded into the app state via the `config` reducer, and then gets used by the app to populate content on most of the pages of the app. By leveraging the `content` attribute, you can allow your customers to customize the copy throughout the app and change it over time without needing your help.

The `configSlice` also establishes an API instance using the `OpenTenderAPI` class from the `@open-tender/redux` library, which leverages the brand's API credentials to make requests to the Open Tender API. This is how the `@open-tender/redux` library makes all of its requests to the API and updates the state of the app accordingly.

## Testing Credit Cards

You can use the following card numbers for testing credit card payments:

- Visa: `4111111111111111`
- MasterCard: `5431111111111111`
- Discover: `6011601160116611`
- American Express: `341111111111111`

For all cards:

- Expiration: `10/25`
- CVV: `999`
- Zip code: `77777`

**Please note that any amounts less than $1.00 will generate a failure.** Amounts $1.00 or greater will result in a successful transaction.

## Deploying to Production and Staging Environments

Open Tender supports testing vs. both production and sandbox environments.

The repo contains example `.env.production` and `.env.staging` files that you can use for deploying to production and staging environments. The important differences include the following environment variables:

```
REACT_APP_AUTH_URL=https://api.opentender.io
REACT_APP_API_URL=https://api.opentender.io/order-api
REACT_APP_CLIENT_ID=[OPEN_TENDER_CLIENT_ID]
```

The production API lives at `https://api.opentender.io` and the sandbox API lives at `https://api.sandbox.opentender.io`. Your Client ID will also be different for each environment.

Two other env vars are worth noting:

### `REACT_APP_SENTRY_DSN`

The Open Tender web app supports Sentry for bug tracking. You will need to create a Sentry account and acquire a Sentry DSN to make use of this.

### `REACT_APP_RECAPTCHA_KEY`

The Open Tender web app supports Google Recaptcha v2 on certain payment forms, which can be found in the following components that come from the `@open-tender/components` library:

- `CreditCardForm`
- `GiftCardsForm`
- `DonationForm`

If your companny or client has chosen to use Google Recaptcha in these components, you will need to create a Google Recaptcha v2 account that works for the relevant domains.
