import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default function API(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  // Handle different HTTP methods
  if (req.method === 'GET') {
    return res.json({
      message: 'Hello World! 🌍',
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url
    });
  }

  if (req.method === 'POST') {
    const { name = 'World' } = req.body || {};
    
    return res.json({
      message: `Hello ${name}! 👋`,
      timestamp: new Date().toISOString(),
      method: req.method,
      receivedData: req.body
    });
  }

  // Method not allowed
  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: ['GET', 'POST']
  });
}
