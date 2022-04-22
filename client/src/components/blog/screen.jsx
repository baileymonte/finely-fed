import React from "react";
import { Link } from "react-router-dom";
import PostPreview from "./PostPreview";
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import featured from '../../components/images/guide.jpeg';


function Screen({ pages, category, mediaURLs }) {
  const allPages = category === "All" ? pages : pages.filter(page => (page.categories.length > 0 ? page.categories[0].name === category : false));

  let filteredPages = [];
  for (var i = 0; i < allPages.length; i++) {
    if (category === "All") {
      if (allPages[i].slug !== "best-restaurants-in-los-angeles" && allPages[i].slug !== "best-ever-tuna-salad") {
        filteredPages.push(allPages[i]);
      }
    } else {
      filteredPages.push(allPages[i]);
    }
  }

  return (
    <div>
      <div className="blog-page">
        {category === "All" ?
          <>
            <div className="container">
              {filteredPages.length > 0 ?
                <div className="wrapper just">
                  <div className="col-2">
                    <PostPreview
                      key={`blogpost-${filteredPages[0].title}-${filteredPages[0].created}`}
                      title={filteredPages[0].title}
                      summary={filteredPages[0].summary}
                      categories={filteredPages[0].categories}
                      created={filteredPages[0].created}
                      featured_image={filteredPages[0].featured_image}
                      url={filteredPages[0].url}
                      slug={filteredPages[0].slug}
                    />
                  </div>
                  <div className="col-1">
                    {filteredPages.length > 1 ?
                      <PostPreview
                        key={`blogpost-${filteredPages[1].title}-${filteredPages[1].created}`}
                        title={filteredPages[1].title}
                        summary={filteredPages[1].summary}
                        categories={filteredPages[1].categories}
                        created={filteredPages[1].created}
                        featured_image={filteredPages[1].featured_image}
                        url={filteredPages[1].url}
                        slug={filteredPages[1].slug}
                      />
                      : null}
                    {filteredPages.length > 2 ?
                      <PostPreview
                        key={`blogpost-${filteredPages[2].title}-${filteredPages[2].created}`}
                        title={filteredPages[2].title}
                        summary={filteredPages[2].summary}
                        categories={filteredPages[2].categories}
                        created={filteredPages[2].created}
                        featured_image={filteredPages[2].featured_image}
                        url={filteredPages[2].url}
                        slug={filteredPages[2].slug}
                      />
                      : null}
                  </div>
                </div>
                : null}
            </div>

            <div className="container featured">
              <div className="wrapper just">
                <span className="featuredSpan" style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={featured} className="featured-img" />
                  <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="featured-title" >
                      <p>  los angeles restaurant guide  </p>
                    </div>
                    <div className="featured-summary" >
                      {allPages.map((filteredPage, index) => {
                        if (filteredPage.slug === 'best-restaurants-in-los-angeles') {
                          return (
                            // <p key={index}>This guide is my unofficial love letter to Los Angeles. I've been in this city for over seven years, and the food has captivated me since the start. The sheer number of restaurants can be overwhelming, and I am definitely a bit neurotic in my quest to discover the best spots in LA.</p>
                            <p key={index}>This guide is my unofficial love letter to Los Angeles. I've been in this city for eight years, and the food has captivated me from the start. The sheer number of restaurants can be overwhelming, and I am definitely a bit neurotic in my quest to discover the best spots in LA.</p>                            
                          )
                        }
                      })}
                      <div className="category">
                        <Link to="/travel/best-restaurants-in-los-angeles">
                          <span style={{ paddingLeft: '45px' }}> Read More >> </span>
                        </Link>
                      </div>
                    </div>
                  </span>
                </span>
              </div>
            </div>

            <div className="container watch">
              <div className="blog-title" style={{ textAlign: 'center', paddingBottom: '30px' }}>
                <a href="https://www.instagram.com/finelyfed/" target="_blank">
                  <p style={{ color: 'black', fontFamily: 'Marcellus' }}> @finelyfed </p>
                </a>
              </div>

              <div className="insta-row">
                {mediaURLs && mediaURLs.length > 0 ?
                  mediaURLs.map((media, index) => {
                    return (
                      <div key={index} className="insta-parent" style={{ position: 'relative' }}>
                        <a href={`${media.permalink}`} target="_blank">
                          <img className="insta-pic" src={`${media.media_url}`} style={{ display: 'block' }} />
                        </a>
                      </div>
                    )
                  })
                  : null}
              </div>
            </div>

            <div className="container main-posts">
              <div className="wrapper just">
                {filteredPages.map((page, index) => (
                  index >= 3 && index < 6 ?
                    <div key={index} className="col-3">
                      <PostPreview
                        key={`blogpost-${page.title}-${page.created}`}
                        title={page.title}
                        summary={page.summary}
                        categories={page.categories}
                        created={page.created}
                        featured_image={page.featured_image}
                        url={page.url}
                        slug={page.slug}
                      />
                    </div>
                    : null
                ))}
              </div>
            </div>

            <div className="container featured" style={{ marginTop: '0px' }}>
              {/* <div className="featured-top-effect" /> */}
              {allPages.map((filteredPage, index) => {
                if (filteredPage.slug === 'best-ever-tuna-salad') {
                  return (
                    <div className="wrapper just" key={index}>
                      <span className="featuredSpan" style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <div className="featured-title" >
                            <p> {filteredPage.title} </p>
                          </div>
                          <div className="featured-summary" >
                            <p>{filteredPage.summary.split(/\s+/).slice(0, 50).join(" ")}...</p>
                            <div className="category">
                              <Link to={`/${filteredPage.categories[0].name}/${filteredPage.slug}`}>
                                <span style={{ paddingLeft: '45px' }}> Read More >> </span>
                              </Link>
                            </div>
                          </div>
                        </span>
                        <img src={filteredPage.featured_image} className="featured-img" />
                      </span>
                    </div>
                  )
                }
              })}
              {/* <div className="featured-bottom-effect" /> */}
            </div>

            <div className="container main-posts">
              <div className="wrapper just">
                {filteredPages.map((page, index) => (
                  index >= 6 && index < filteredPages.length && page.slug !== 'best-ever-tuna-salad' ?
                    <div key={index} className="col-3">
                      <PostPreview
                        key={`blogpost-${page.title}-${page.created}`}
                        title={page.title}
                        summary={page.summary}
                        categories={page.categories}
                        created={page.created}
                        featured_image={page.featured_image}
                        url={page.url}
                        slug={page.slug}
                      />
                    </div>
                    : null
                ))}
              </div>
            </div>
          </>
          :
          <div className="container">
            <h1 className="text-center category-title">{category}</h1>
            <div className="wrapper just" style={{ marginBottom: '50px' }}>
              {filteredPages.map((page, index) => (
                <div key={index} className="col-3">
                  <PostPreview
                    key={`blogpost-${page.title}-${page.created}`}
                    title={page.title}
                    summary={page.summary}
                    categories={page.categories}
                    created={page.created}
                    featured_image={page.featured_image}
                    url={page.url}
                    slug={page.slug}
                  />
                </div>
              ))}
            </div>

            <div className="container watch" style={{ background: "#8AA899", paddingBottom: '70px' }}>
              <div className="blog-title" style={{ textAlign: 'center', paddingBottom: '30px' }}>
                <a href="https://www.instagram.com/finelyfed/" target="_blank">
                  <p style={{ color: 'white', fontFamily: 'Marcellus' }}> @finelyfed </p>
                </a>
              </div>

              <div className="insta-row">
                {mediaURLs && mediaURLs.length > 0 ?
                  mediaURLs.map((media, index) => {
                    return (
                      <div key={index} className="insta-parent" style={{ position: 'relative' }}>
                        <a href={`${media.permalink}`} target="_blank">
                          <img className="insta-pic" src={`${media.media_url}`} style={{ display: 'block' }} />
                        </a>
                      </div>
                    )
                  })
                  : null}
                {/* <div className="insta-parent" style={{ position: 'relative' }}>
                  <a href="https://www.instagram.com/p/B8u4GPIBGag/" target="_blank">
                    <img className="insta-pic" src={bailey} style={{ display: 'block' }} />
                  </a>
                </div>
                <div className="insta-parent" style={{ position: 'relative' }}>
                  <a href="https://www.instagram.com/p/CHq2k7oHEJ3/" target="_blank">
                    <img className="insta-pic" src={ospi} style={{ display: 'block' }} />
                  </a>
                </div>
                <div className="insta-parent" style={{ position: 'relative' }}>
                  <a href="https://www.instagram.com/p/CCbpxCXpudX/" target="_blank">
                    <img className="insta-pic" src={house} style={{ display: 'block' }} />
                  </a>
                </div>
                <div className="insta-parent" style={{ position: 'relative' }}>
                  <a href="https://www.instagram.com/p/B38Q-B0ge3M/" target="_blank">
                    <img className="insta-pic" src={sushi} style={{ display: 'block' }} />
                  </a>
                </div>
                <div className="insta-parent" style={{ position: 'relative' }}>
                  <a href="https://www.instagram.com/p/CFIcROQnylW/" target="_blank">
                    <img className="insta-pic" src={colorado} style={{ display: 'block' }} />
                    <Icon name='clone'
                      style={{
                        color: 'white',
                        position: 'absolute',
                        top: '9px',
                        left: 'calc(100% - 33px)',
                        fontSize: '18px',
                        fontWeight: '100',
                        transform: 'rotate(-90deg)'
                      }}
                    />
                  </a>
                </div>
                <div className="insta-parent" style={{ position: 'relative' }}>
                  <a href="https://www.instagram.com/p/CCPTAW1syOp/" target="_blank">
                    <img className="insta-pic" src={bowl} style={{ display: 'block' }} />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  );
};

export default Screen;

