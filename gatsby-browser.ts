import "./src/styles/global.css";
import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => React.createElement(Layout, null, element);
