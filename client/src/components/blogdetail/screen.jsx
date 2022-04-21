import React, { useEffect, useState } from "react";
import { Grid, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import PostPreview from "../blog/PostPreview";
import { NavLink } from "react-router-dom";


const Screen = ({
  image,
  created,
  categories,
  title,
  summary,
  author: {
    first_name = '',
    last_name = '',
    profile_image = '',
  },
  body,
  filteredPages,
  unfilteredPages
}) => {
  const [randomfilteredPages, setFilteredPages] = useState(filteredPages);

  useEffect(() => {
    // Random Function
    var currentIndex = filteredPages.length;
    var otherIndex = unfilteredPages.length;
    var temporaryValue = 0;
    var randomIndex = 0;
    function shuffle(array) {
      var count = 0;
      var addcount = 0;
      var array1 = unfilteredPages;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        count += 1;
        if (count >= 3) {
          count = filteredPages.length - 3;
          array.splice(0, count);
          return array;
        }
      }
      currentIndex = filteredPages.length
      if (currentIndex < 3) {
        addcount = 3 - currentIndex;
      }
      while (0 !== addcount) {
        randomIndex = Math.floor(Math.random() * otherIndex);
        otherIndex -= 1;
        addcount -= 1;
        temporaryValue = array1[otherIndex];
        array[currentIndex + addcount] = temporaryValue;
        array1[otherIndex] = array1[otherIndex];
        array1[otherIndex] = temporaryValue;
      }
      return array;
    }
    setFilteredPages(shuffle(filteredPages));
  });
  window.scrollTo(0, 0);

  return (
    <section className="mobile-test">
      <Divider style={{ borderTop: '1px solid #f2f2f2', borderBottom: '0px' }} />
      <section className="desktop-screen" style={{ paddingTop: '42px' }}>
        <div className='blogdetail-page wrapper'>
          <div className="category">
            <NavLink to={`/${categories[0].name}`}>
              {categories[0].name}
            </NavLink>
          </div>
          <div className="hero-sidebar">
            <h1 className="blog-title-h1"> {title} </h1>
          </div>
          <div className="post-date">
            <span>
              {new Date(created).toLocaleDateString(
                'en-US',
                {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }
              )}
            </span>
          </div>
          <div className='article-hero'>
            <img
              src={image}
              alt=''
            />
          </div>
          <div className="article-main">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: body }}>
            </div>
          </div>
        </div>
        <div className="bg-grey" style={{ marginTop: '150px' }}>
          <div className="article-footer">
            <Grid divided="vertically" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              <Grid.Row columns={3}>
                {
                  randomfilteredPages && randomfilteredPages.map((page, index) => (
                    <Grid.Column key={index}>
                      <PostPreview
                        key={page.created}
                        title={page.title}
                        summary={page.summary}
                        categories={page.categories}
                        featured_image={page.featured_image}
                        url={page.url}
                        slug={page.slug}
                      />
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </section>

      <section className="mobile-screen">
        <div className="wrapper">
          <div className="article-hero">
            <div className="category">
              <NavLink to={`/${categories[0].name}`}>
                {categories[0].name}
              </NavLink>
            </div>
            <div className="hero-sidebar">
              <h1> {title} </h1>
              <div className="post-date mobile">
                <span>
                  {new Date(created).toLocaleDateString(
                    'en-US',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }
                  )}
                </span>
              </div>
              <img id="art-hero" src={image} />
            </div>
          </div>
          <div className="article-main">
            <div className="article-sidebar">
            </div>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: body }}></div>
          </div>
        </div>

        <div className="bg-grey" style={{ marginTop: '100px' }}>
          <div className="article-footer">
            <Grid className="two-sections" divided="vertically">
              <Grid.Row columns={2}>
                {
                  randomfilteredPages && randomfilteredPages.map((page, index) => (
                    <Grid.Column key={index}>
                      { index < 2 ?
                        <PostPreview
                          key={page.created}
                          title={page.title}
                          summary={page.summary}
                          categories={page.categories}
                          featured_image={page.featured_image}
                          url={page.url}
                          slug={page.slug}
                        />
                        : null}
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
            <Grid className="one-section" divided="vertically">
              <Grid.Row columns={1}>
                {
                  randomfilteredPages && randomfilteredPages.map((page, index) => (
                    <Grid.Column key={index}>
                      <PostPreview
                        key={page.created}
                        title={page.title}
                        summary={page.summary}
                        categories={page.categories}
                        featured_image={page.featured_image}
                        url={page.url}
                        slug={page.slug}
                      />
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Screen
