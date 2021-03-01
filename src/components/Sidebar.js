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
        {
          data.site.siteMetadata.sideBar.map(({title, pages}) => {
            return (
              <React.Fragment key={title}>
                <h3 className="side-title">
                  {title}
                </h3>
                <ul>
                  {
                    pages.map(({name, link}) => (
                      <li key={name}>
                        <Link to={link}>
                          {name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </React.Fragment>
            )
          })
        }
      </nav>
    </div>
  );
}
