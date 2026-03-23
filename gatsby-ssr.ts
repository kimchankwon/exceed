import "@fontsource/inter/500.css";
import "@fontsource/inter/800.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import * as React from "react";
import type { GatsbySSR } from "gatsby";
import Layout from "./src/components/Layout";

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element }) =>
  React.createElement(Layout, null, element);
