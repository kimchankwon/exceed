# Gatsby Functions + Fibery Members Database Guide

## 🚀 **What We've Built**

Your project now uses **Gatsby Functions** (the modern approach) instead of Netlify Functions to create members in your Fibery Members database at [https://testa.fibery.io/fibery/space/Space/database/Members](https://testa.fibery.io/fibery/space/Space/database/Members).

## 📁 **New File Structure**

```
src/
├── functions/
│   └── create-member.ts      # ✅ Gatsby Function for creating members
├── components/
│   └── UserForm.tsx          # Form that submits to /api/create-member
├── pages/
│   └── index.tsx             # Homepage with the form
└── utils/
    └── fiberyApi.ts          # Alternative direct API approach
```

## 🔧 **Environment Configuration**

Create a `.env.development` file in your project root:

```bash
# Fibery API Configuration
# Your workspace: testa
# Your database: Members
FIBERY_TOKEN=your_fibery_api_token_here
FIBERY_WORKSPACE=testa
FIBERY_ENTITY_TYPE=Members
```

## 🌐 **API Endpoint**

- **Local Development**: http://localhost:8000/api/create-member
- **Production**: https://yoursite.com/api/create-member

## 📝 **How to Create a Member**

### 1. **Get Your Fibery API Token**

1. Go to [https://testa.fibery.io](https://testa.fibery.io)
2. Navigate to **Settings** → **Integrations** → **API**
3. Click **Generate Token**
4. Copy the token

### 2. **Set Environment Variables**

```bash
# In your .env.development file
FIBERY_TOKEN=your_actual_token_here
FIBERY_WORKSPACE=testa
FIBERY_ENTITY_TYPE=Members
```

### 3. **Test the Form**

1. Start development: `npm run develop`
2. Go to http://localhost:8000
3. Fill out the form with Name and Email
4. Submit - this creates a member in your Fibery database

## 🔍 **Understanding Your Members Entity**

Based on your URL `https://testa.fibery.io/fibery/space/Space/database/Members`, your entity structure likely includes:

- **Name** (required) - Member's full name
- **Email** (required) - Member's email address
- **Status** (optional) - Member status (Active, Inactive, etc.)
- **Role** (optional) - Member role (Admin, Member, etc.)
- **Created Date** (auto-generated)

## ⚙️ **Customizing the Function**

### **Adding More Fields**

To add additional fields to your member creation, edit `src/functions/create-member.ts`:

```typescript
body: JSON.stringify({
  type: FIBERY_ENTITY_TYPE,
  data: {
    Name: name,
    Email: email,
    // Add your custom fields here:
    Status: "Active",
    Role: "Member",
    Department: "Engineering",
    // etc.
  }
}),
```

### **Field Name Mapping**

**Important**: Fibery field names are case-sensitive and must match exactly what's in your database schema.

Common field mappings:

- `Name` → Member's name
- `Email` → Member's email
- `Status` → Member status
- `Role` → Member role
- `Created` → Creation timestamp

## 🧪 **Testing the API**

### **Using the Form**

1. Fill out the form on your homepage
2. Submit and check browser console
3. Verify member appears in your Fibery Members database

### **Using cURL**

```bash
curl -X POST http://localhost:8000/api/create-member \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### **Using Postman**

- **URL**: `http://localhost:8000/api/create-member`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"Fibery configuration missing"**

   - Check your `.env.development` file exists
   - Verify `FIBERY_TOKEN` is set correctly

2. **"Failed to create member in Fibery"**

   - Verify your API token has write permissions
   - Check that `FIBERY_ENTITY_TYPE=Members` matches exactly
   - Ensure required fields exist in your Members entity

3. **Field mapping errors**
   - Verify field names match exactly (case-sensitive)
   - Check your Members entity schema in Fibery

### **Debug Mode**

Add logging to see what's happening:

```typescript
console.log("Creating member:", { name, email });
console.log("Fibery response:", fiberyData);
```

## 🔒 **Security Notes**

- ✅ API token is kept secure in environment variables
- ✅ Input validation on both client and server
- ✅ CORS handled automatically by Gatsby Functions
- ⚠️ Never commit `.env.development` to version control

## 🚀 **Deployment**

When you deploy to production:

1. **Set environment variables** in your hosting platform
2. **Gatsby Functions** automatically work in production
3. **No additional configuration** needed

## 📚 **Next Steps**

1. **Get your Fibery API token**
2. **Create the `.env.development` file**
3. **Test the form locally**
4. **Customize fields** as needed for your Members entity
5. **Deploy to production**

Your Gatsby Function is now ready to create members in your Fibery database! 🎉
