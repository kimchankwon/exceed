---
name: explore-graphql
description: This skill should be used when the user asks to "explore graphql", "check graphql schema", "find a graphql query", "what graphql types are available", "add a graphql query", or needs to discover Contentful content types and their fields before writing a Gatsby GraphQL query.
version: 1.0.0
---

# Explore GraphQL Schema

Use this skill to discover available types and fields from the running Gatsby GraphQL playground before writing a query.

## When This Skill Applies

- User wants to add a new GraphQL query to a page
- User asks what Contentful content types are available
- You need to know the exact field names for a content type before coding

## Steps

1. **Fetch the schema** using the running dev server's introspection endpoint:

```
WebFetch: http://localhost:8000/___graphql
Prompt: "List all available root query fields and their types"
```

2. **Query a specific type** by POSTing to the same endpoint:

```bash
curl -s http://localhost:8000/___graphql \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __type(name: \"ContentfulXxx\") { fields { name type { name kind ofType { name } } } } }"}'
```

3. **Test the query** before adding it to code:

```bash
curl -s http://localhost:8000/___graphql \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ allContentfulXxx(sort: [{order: ASC}]) { nodes { id title } } }"}'
```

## Adding the Query to a Gatsby Page

Once the shape is confirmed, add it to the exported `graphql` tag at the bottom of the page file:

```ts
export const myQuery = graphql`
  query MyPageQuery {
    allContentfulXxx(sort: [{ order: ASC }]) {
      nodes {
        id
        title
        description {
          description
        }
      }
    }
  }
`;
```

Then destructure in the component:

```ts
const IndexPage: React.FC<PageProps<Queries.MyPageQueryQuery>> = ({ data }) => {
  const { allContentfulXxx } = data;
  // allContentfulXxx.nodes is the array
};
```

## Notes

- The dev server must be running (`npm run develop`) for this endpoint to be available.
- Gatsby auto-generates TypeScript types in `src/gatsby-types.d.ts` from the query — no manual types needed.
- The GraphQL playground UI is also available at http://localhost:8000/___graphql in a browser.
