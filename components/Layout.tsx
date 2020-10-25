import React from "react";
import Header from "./Header";

const Layout = (props) => (
  <div>
    <Header />
    <div className="layout">
      <div className="fakeToolbar" />
      {props.children}
    </div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
        padding-top: 8px;
      }
      .fakeToolbar {
        height: 64px;
      }
    `}</style>
  </div>
);

export default Layout;
