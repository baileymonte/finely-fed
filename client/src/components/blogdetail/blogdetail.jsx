import React, { useContext, useEffect } from 'react';
import Screen from './screen';
import { GlobalContext } from '../../store';
import { butter } from '../../store/api';
import { Segment } from 'semantic-ui-react';
import ReactGA from 'react-ga'
import '../blog.css';


const BlogDetail = ({ match }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const slug = match.path.split(/[/]/);
  const currentPage = state.pages.data.find(page => page.slug === slug[slug.length - 1]);

  const category = currentPage.categories[0].name;
  console.log("????",category);
  const filteredPages = state.pages.data.filter(page => ((page.categories[0].name === category) && (page.slug !== currentPage.slug)));
  const unfilteredPages = state.pages.data.filter(page => ((page.categories[0].name !== category)));

  useEffect(() => {
    const getPages = async () => {
      const { data } = await butter.post.list({ page: 1, page_size: 20 });
      console.log(data.data);
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].categories[0].name === 'food') {
          data.data[i].categories[0].name = "recipes";
          data.data[i].categories[0].slug = "recipes";
        } else if (data.data[i].categories[0].name === 'lifestyle') {
          data.data[i].categories[0].name = "living";
          data.data[i].categories[0].slug = "living";
        } else if (data.data[i].categories[0].name === 'wellness') {
          data.data[i].categories[0].name = "living";
          data.data[i].categories[0].slug = "living";
        }
      }

      dispatch({
        type: "update_pages",
        data
      });
    };

    getPages();
  }, []);


  useEffect(() => {
    const detail = "/" + category + "/" + slug[slug.length - 1];

    ReactGA.initialize('UA-188118979-2');
    ReactGA.pageview(detail);

  }, [slug[slug.length - 1]])
  return (
    <Segment vertical style={{ backgroundColor: '#f8faff' }}>
      {currentPage && (
        <Screen
          image={currentPage.featured_image}
          created={currentPage.created}
          categories={currentPage.categories}
          title={currentPage.title}
          summary={currentPage.summary}
          author={currentPage.author}
          body={currentPage.body}
          filteredPages={filteredPages}
          unfilteredPages={unfilteredPages}
        />
      )}
    </Segment>
  );
};

export default BlogDetail;

/*
 author
 body
 categories
 created
 featured_image
 meta_description
 published
 seo_title
 slug
 status
 summary
 tags
 title
 url
 */
