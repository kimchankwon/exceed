import "@fontsource/inter/500.css";
import "@fontsource/inter/800.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "./src/styles/global.css";
import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => React.createElement(Layout, null, element);
