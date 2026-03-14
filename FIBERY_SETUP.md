# Fibery API Setup Guide

## Prerequisites

1. A Fibery workspace account
2. Admin access to your Fibery workspace
3. API token with write permissions

## Getting Your Fibery API Token

1. Log into your Fibery workspace
2. Go to **Settings** → **Integrations** → **API**
3. Click **Generate Token**
4. Copy the generated token (you won't be able to see it again)

## Environment Variables

Create a `.env.development` file in your project root with the following variables:

```bash
# Fibery API Configuration
FIBERY_TOKEN=your_fibery_api_token_here
FIBERY_WORKSPACE=testa
```

### Variable Descriptions:

- `FIBERY_TOKEN`: Your Fibery API token
- `FIBERY_WORKSPACE`: Your workspace name (found in the URL: `https://your-workspace.fibery.io`)

## Testing the Integration

1. Start your development server: `npm run develop`
2. Navigate to the form on your homepage
3. Fill out the form with test data
4. Submit and check the browser console for any errors
5. Verify the user was created in your Fibery workspace

## Troubleshooting

### Common Issues:

1. **"Fibery configuration missing" error**

   - Check that your `.env` file exists and has the correct variables
   - Ensure the environment variables are loaded in your deployment environment

2. **"Failed to create member in Fibery" error**

   - Verify your API token has write permissions
   - Ensure the required fields exist in your Fibery entity types (`Space/Members` and `Contacts/Contacts`)

3. **CORS errors**
   - The API endpoint is designed to work with Netlify Functions
   - Ensure you're deploying to Netlify or have proper CORS configuration

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables in your production deployment
- Consider implementing rate limiting for production use
- Validate all input data on both client and server side

## API Endpoint

- **Member signup**: `/api/create-member` → creates a `Space/Members` entity (handled by `src/api/create-member.ts`)
- **Contact form**: `/api/contact-us` → creates a `Contacts/Contacts` entity (handled by `src/api/contact-us.ts`)

## Deployment

This project uses `gatsby-plugin-netlify` which automatically converts the API functions to Netlify Functions. Make sure to set your environment variables in your Netlify dashboard.
