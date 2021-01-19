<p align="center">
  <a href="https://marverlous-app-test.netlify.app/">
    <img alt="App Icon" src="https://github.com/LuisHCK/marvelous-app-test/blob/main/src/images/icon.png?raw=true" width="60" />
  </a>
</p>
<h1 align="center">
  Marvelous App
</h1>

A [GatsbyJS](https://www.gatsbyjs.com/) test project that consumes Marvel's public API

## 🚀 [Live Demo](https://marverlous-app-test.netlify.app/)

&nbsp;

## 👾 Libraries used

- [axios](https://github.com/axios/axios): HTTP Client
- [react-lazyload](https://github.com/twobin/react-lazyload): Lazy load images and components
- [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component): Infinite scroll
- [sass](https://github.com/sass/dart-sass): CSS Pre-processor

## 👨‍💻 Quick start

1.  **Clone the repo**

    ```shell
    # Clone using SSH
    git clone git@github.com:LuisHCK/marvelous-app-test.git
    
    # Clone using https
    git clone https://github.com/LuisHCK/marvelous-app-test.git
    ```
    
2.  **Add your dotenv**
    
    ```shell
    # .env.develop and .env.production
    GATSBY_APIKEY=my-sexy-api-key
    GATSBY_SERVER_URL=https://gateway.marvel.com/v1/public/
    ```

3.  **Start developing with docker.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd marvelous-app-test/
    docker-compose up --build
    ```

4.  **Open the code and start customizing!**

    The site is now running at http://localhost:8000!

    Edit `src/pages/index.js` to see your site update in real-time!
