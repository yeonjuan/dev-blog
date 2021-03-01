import { graphql, useStaticQuery } from 'gatsby';
import { Link } from "gatsby"
import React from 'react';
export default function Sidebar () {
  const data = useStaticQuery(graphql`
  query SideBar {
    site {
      siteMetadata {
        sideBar {
          title
          pages {
            name
            link
          }
        }
      }
    }
  }
  `);
  return (
    <div className="side-bar">
      <h1>Dev Blog</h1>
      <nav>
        <h3 className="side-title">
        <Link to={data.site.siteMetadata.sideBar[0].pages[0].link}>
        {data.site.siteMetadata.sideBar[0].title}
        </Link></h3>
        <ul>
            <li>
                <Link to={data.site.siteMetadata.sideBar[0].pages[0].link}>
                {data.site.siteMetadata.sideBar[0].pages[0].name}
                </Link>
            </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            {data.site.siteMetadata.sideBar[0].title}
          </li>
          <li> test 1</li>
          <ul>
            <li> test 1</li>
            <ul>
              <li>test2</li>
            </ul>
          </ul>
          <li> test 1</li>
        </ul>
      </nav>
    </div>
  );
}
