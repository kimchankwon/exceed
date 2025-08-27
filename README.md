<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Minimal TypeScript Starter
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal TypeScript starter.

    ```shell
    # create a new Gatsby site using the minimal TypeScript starter
    npm init gatsby -- -ts
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-minimal-ts)

# Exceed - Gatsby Project with Fibery Integration

This is a Gatsby project that includes a user creation form that integrates with the Fibery Users database.

## Features

- **User Creation Form**: A React component with Name and Email fields
- **Fibery API Integration**: Serverless function to create users in your Fibery workspace
- **Form Validation**: Client-side validation for required fields and email format
- **Modern UI**: Built with Tailwind CSS and daisyUI for a clean, responsive design
- **TypeScript**: Full TypeScript support for type safety
- **Zod Validation**: Runtime type validation for both client and server
- **Formik Integration**: Professional form management with validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Fibery workspace account

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see Environment Variables section below)

4. Start the development server:

   ```bash
   npm run develop
   ```

5. Open [http://localhost:8000](http://localhost:8000) in your browser

## Environment Variables

This project requires several environment variables to function properly. Copy the `env.template` file to create your environment files:

### Development

```bash
cp env.template .env.development
```

### Production

```bash
cp env.template .env.production
```

### Required Variables

| Variable                  | Description                          | Example       |
| ------------------------- | ------------------------------------ | ------------- |
| `NODE_ENV`                | Environment (development/production) | `development` |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful API access token          | `CFPAT-...`   |
| `CONTENTFUL_SPACE_ID`     | Contentful space ID                  | `abc123def`   |
| `FIBERY_TOKEN`            | Fibery API token                     | `token123...` |
| `FIBERY_WORKSPACE`        | Your Fibery workspace name           | `myworkspace` |

**Important**: Never commit your actual environment files (`.env.development`, `.env.production`) to version control. They contain sensitive information.

## User Creation Form

The form is located on the homepage and includes:

- **Name field**: Required text input for the user's full name
- **Email field**: Required email input with format validation
- **Submit button**: Creates the user in Fibery
- **Success/Error handling**: Clear feedback for form submission results
- **Real-time validation**: Instant feedback using Zod schemas

## API Integration

The project includes serverless functions for:

- **`/api/create-member`**: Creates new members in your Fibery workspace
- **`/api/hello-world`**: Example API endpoint for testing

## Technology Stack

- **Frontend**: React 18, Gatsby 5, TypeScript
- **Styling**: Tailwind CSS 4, daisyUI
- **Forms**: Formik with Zod validation
- **API**: Gatsby Functions with Zod runtime validation
- **CMS**: Contentful integration
- **External Services**: Fibery API integration

## Development

### Available Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run clean` - Clean Gatsby cache
- `npm run typecheck` - Run TypeScript type checking

### Code Quality

- **Type Safety**: Full TypeScript implementation with strict mode
- **Validation**: Zod schemas for runtime type safety
- **Error Handling**: Standardized error response formats
- **Component Architecture**: Modern React patterns with hooks

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**: Ensure your `.env.development` file exists and contains all required variables
2. **Fibery API Errors**: Verify your Fibery token and workspace name are correct
3. **Build Errors**: Run `npm run clean` to clear Gatsby cache

### Getting Help

- Check the [FIBERY_SETUP.md](./FIBERY_SETUP.md) for detailed Fibery configuration
- Review the [GATSBY_FUNCTIONS_GUIDE.md](./GATSBY_FUNCTIONS_GUIDE.md) for API development
