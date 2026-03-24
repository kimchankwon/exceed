import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, stage }) => {
  if (stage === "develop") {
    actions.setWebpackConfig({
      watchOptions: {
        ignored: ["**/gatsby-types.d.ts", "**/node_modules/**"],
      },
    });
  }
};
