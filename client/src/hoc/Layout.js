import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { GlobalContext } from '../store';
import { butter } from '../store/api';
import Aux from './_Aux';
import ScrollToTop from '../components/scroll.js';
import Blog from "../components/blog/blog";
import BlogDetail from '../components/blogdetail/blogdetail';
import logo from '../components/images/logo_black.png';
import logo_2 from '../components/images/logo_white.png';
import { Grid, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class Layout extends Component {
  static contextType = GlobalContext

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const [state, dispatch] = this.context;
    const { data } = await butter.post.list({ page: 1, page_size: 20 });
    for (var i = 0; i < data.data.length; i++) {
      if (data.data[i].categories[0].name === 'food') {
        data.data[i].categories[0].name = "recipes";
        data.data[i].categories[0].slug = "recipes";
      } else if (data.data[i].categories[0].name === 'lifestyle') {
        data.data[i].categories[0].name = "living";
        data.data[i].categories[0].slug = "living";
      } else if (data.data[i].categories[0].name === 'wellness') {
        data.data[i].categories[0].name = "health & wellness";
        data.data[i].categories[0].slug = "health & wellness";
      }
    }

    let mediaURLs = [];
    // const old_token = "IGQVJYWEtJREJIT0hVNGo3U2tkQnRyOUs3WDNWeWs4MWxCUTFFMnoyaUR0REM3YnBrT0hyQjBmc3Vtcld0X184VUhHeWYzRjBhaVZAqQXVtYzF5NmJwY19BNUdnRDRwRmQ2NmU1U2FNMWYxUFRzTkVtZAwZDZD"
    const access_token = "IGQVJWRy00eG9vU015ZA21tZAHFvVE1mUzlBVjA1TVIwRFFKVUlhWVZAYQi11ZAHpHbFN3aDNINERUQmt1V0hVdHhJN3lFa3o2WmtLVHo0SUhtNG5PcktqeHpaRTVibUhTNlg5WmZANYndFYnY1aVhsTDd4cgZDZD";
    await fetch(`https://graph.instagram.com/v10.0/17841408078439206/media?access_token=${access_token}&limit=10`)
      .then(res => res.json())
      .then(
        async (result) => {
          for (var i = 0; i < 6; i++) {
            await fetch(`https://graph.instagram.com/${result.data[i].id}?fields=id,media_type,permalink,media_url,username,timestamp&access_token=${access_token}`).then(res => res.json()).then((media) => {
              mediaURLs.push({ media_url: media.media_url, permalink: media.permalink });
            })
          }
        }
      )

    dispatch({
      type: "update_pages",
      data
    });
    dispatch({
      type: "get_instagram_images",
      mediaURLs
    })
  }
  menuClick = () => {
    var x = document.getElementById("myTopnav");
    var mainLogo = document.getElementById("main-menu-logo");
    var fixedTopNav = document.getElementById("myTopnav-fixed");
    if (x.className !== 'topnav') {
      x.className = "topnav";
      fixedTopNav.style.display = 'none';
      mainLogo.style.display = 'block';
    }
  }
  myFunction = () => {
    var x = document.getElementById("myTopnav");
    var mainLogo = document.getElementById("main-menu-logo");
    var fixedTopNav = document.getElementById("myTopnav-fixed");
    if (x.className === "topnav") {
      x.className += " responsive";
      fixedTopNav.style.display = 'block';
      fixedTopNav.style.paddingBottom = '30px';
      mainLogo.style.display = 'none';
    } else {
      x.className = "topnav";
      fixedTopNav.style.display = 'none';
      x.style.paddingBottom = '40px';
      mainLogo.style.display = 'block';
    }
  }

  render() {
    const [state, dispatch] = this.context;
    const blogCategoryPaths = state.categories.map((category, i) => `${i === 0 ? "/" : "/" + category}`);
    const blogDetailPaths = state.pages.data.map(page => `/${page.categories[0].name}/${page.slug}`);

    return (
      <ScrollToTop>
        <Aux>
          <div>
            <section className="nav-bar">
              <ul className="topnav" id="myTopnav">
                <li>
                  <p>
                    <NavLink to="/">
                      <img src={logo} className="main-menu-logo" id="main-menu-logo" />
                    </NavLink>
                  </p>
                </li>
                <li className="top-menu-item">
                  <NavLink to="/living" className="menu-item" id="last-item" onClick={() => this.menuClick()}>LIVING</NavLink>
                </li>
                <li className="top-menu-item">
                  <NavLink to="/health & wellness" className="menu-item" onClick={() => this.menuClick()}>HEALTH & WELLNESS</NavLink>
                </li>
                <li className="top-menu-item">
                  <NavLink to="/recipes" className="menu-item" onClick={() => this.menuClick()}>RECIPES</NavLink>
                </li>
                <li className="top-menu-item">
                  <NavLink to="/travel" className="menu-item" onClick={() => this.menuClick()}>TRAVEL</NavLink>
                </li>
                <li className="top-menu-item">
                  <NavLink to="#" className="icon" onClick={() => this.myFunction()}><span></span></NavLink>
                </li>
              </ul>
              <ul className="topnav" id="myTopnav-fixed">
                <li>
                  <p>
                    <NavLink to="/">
                      <img src={logo} className="main-menu-logo" />
                    </NavLink>
                  </p>
                </li>
              </ul>
            </section>
          </div>

          <Switch>
            <Route path="/" exact component={Blog} />
            <Route path={blogCategoryPaths} exact component={Blog} />
            <Route path={blogDetailPaths} exact component={BlogDetail} />
          </Switch>

          <section className="desktop-screen" style={{ position: "relative" }}>
            {/* <div className="footer-top-effect" /> */}
            <section className="site-footer">
              <div className="wrapper just">
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <div className="footer-left">
                        <NavLink to="/">
                          <img src={logo} className="main-menu-logo" style={{ paddingLeft: '5px' }} />
                        </NavLink>
                        <div className="footer-social">
                          <a href="https://www.instagram.com/finelyfed/" target="_blank">
                            <Icon id="insta-icon" name="instagram" style={{ color: '#242424', fontSize: '18px' }} />
                          </a>
                          <a href="/">
                            <Icon id="pinterest-icon" name="pinterest square" style={{ color: '#242424', fontSize: '18px' }} />
                          </a>
                        </div>
                      </div>
                    </Grid.Column>

                    <Grid.Column width={11}>
                      <div className="footer-right">
                        <nav>
                          <NavLink to="/travel">TRAVEL</NavLink>
                          <NavLink to="/recipes">RECIPES</NavLink>
                          <NavLink to="/health & wellness">HEALTH & WELLNESS</NavLink>
                          <NavLink to="/living" style={{ marginRight: '-6px' }}>LIVING</NavLink>
                        </nav>
                        <p style={{ marginRight: '18px', color: '#242424' }}>ALL RIGHTS RESERVED © FINELY FED 2020</p>
                      </div>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </div>
            </section>
          </section>

          <section className="mobile-screen">
            <section className="site-footer">
              <div className="wrapper just">
                <div className="footer-left">
                  <NavLink to="/">
                    <img src={logo} className="main-menu-logo" />
                  </NavLink>
                  <nav>
                    <NavLink to="/travel" style={{ marginLeft: '3px' }}>TRAVEL</NavLink>
                    <NavLink to="/recipes">RECIPES</NavLink>
                    <NavLink to="/health & wellness">HEALTH & WELLNESS</NavLink>
                    <NavLink to="/living">LIVING</NavLink>
                  </nav>
                  <div className="footer-social">
                    <a href="https://www.instagram.com/finelyfed/" target="_blank">
                      <Icon name="instagram" style={{ color: '#242424', fontSize: '18px' }} />
                    </a>
                    <a href="/">
                      <Icon name="pinterest square" style={{ color: '#242424', fontSize: '18px' }} />
                    </a>
                  </div>
                </div>

                <div className="footer-right">
                  <p className="copyRight" style={{ color: '#242424' }}>All rights reserved. © Finely Fed 2020</p>
                </div>
              </div>
            </section>
          </section>
        </Aux>
      </ScrollToTop>
    );
  }
}

export default Layout;
