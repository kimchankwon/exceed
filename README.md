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
- **Modern UI**: Built with Tailwind CSS for a clean, responsive design
- **TypeScript**: Full TypeScript support for type safety

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

3. Set up your Fibery API credentials (see [FIBERY_SETUP.md](./FIBERY_SETUP.md))

4. Start the development server:
   ```bash
   npm run develop
   ```

5. Open [http://localhost:8000](http://localhost:8000) in your browser

## User Creation Form

The form is located on the homepage and includes:

- **Name field**: Required text input for the user's full name
- **Email field**: Required email input with format validation
- **Submit button**: Creates the user in Fibery
- **Success/Error handling**: Clear feedback for form submission results

## API Integration

### Serverless Function Approach (Recommended)

The form submits to `/api/create-member` which is handled by a Gatsby Function. This approach:

- Keeps your Fibery API token secure on the server
- Handles CORS automatically
- Provides better error handling and logging

### Direct API Approach (Alternative)

For development or testing, you can also use the `FiberyApi` utility class directly from the frontend. See `src/utils/fiberyApi.ts` for implementation details.

## Project Structure

```
src/
├── components/
│   └── UserForm.tsx          # User creation form component
├── pages/
│   └── index.tsx             # Homepage with the form
├── api/
│   ├── create-member.ts      # TypeScript API function for Fibery integration
│   └── hello-world.ts        # TypeScript test API function
├── utils/
│   └── fiberyApi.ts          # Fibery API utility class
└── styles/
    └── global.css            # Global styles including Tailwind
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```bash
FIBERY_TOKEN=your_fibery_api_token_here
FIBERY_WORKSPACE=your_workspace_name_here
FIBERY_ENTITY_TYPE=Users
```

### Fibery Setup

See [FIBERY_SETUP.md](./FIBERY_SETUP.md) for detailed instructions on:

- Getting your API token
- Finding your entity type name
- Troubleshooting common issues
- Security considerations

## Development

### Available Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run clean` - Clean Gatsby cache
- `npm run typecheck` - Run TypeScript type checking

### Adding New Fields

To add more fields to the user form:

1. Update the `UserFormData` interface in `UserForm.tsx`
2. Add the new input field to the form JSX
3. Update the validation logic
4. Modify the API payload in `create-member.ts`

## Deployment

This project is configured for Netlify deployment with:

- `gatsby-plugin-netlify` for automatic function deployment
- Environment variables configured in Netlify dashboard
- Automatic builds on Git push

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.
