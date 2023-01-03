import React, { useContext, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import Screen from "./screen";
import { GlobalContext } from "../../store";
import { butter } from "../../store/api";
import ReactGA from 'react-ga'

const Blog = ({ match }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const paths = match.path.split(/[/]/);
  const category = paths.length === 2 ? (paths[1] === "" ? "All" : paths[1]) : "";

  useEffect(() => {
    const getPages = async () => {
      let { data } = await butter.post.list({ page: 1, page_size: 20 });
      console.log("NEW",data);
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
    ReactGA.initialize('UA-188118979-2');
    if (paths[1] === "") {
      ReactGA.pageview('/Home');
    } else if (paths[1] === "recipes") {
      ReactGA.pageview('/Recipes');
    } else if (paths[1] === "travel") {
      ReactGA.pageview('/Travel');
    } else if (paths[1] === "wellness") {
      ReactGA.pageview('/living');
    } else if (paths[1] === "living") {
      ReactGA.pageview('/Living');
    }
  }, [paths[1]])

  return (
    <Segment vertical>
      <Screen pages={state.pages.data} category={category} mediaURLs={state.mediaURLs} />
    </Segment>
  );
};

export default Blog;
