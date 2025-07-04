/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/opinions/:path*',
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: 'https://opinions.crisisyduelo.com' 
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET,POST,OPTIONS' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'Content-Type' 
          }
        ]
      }
    ];
  }
};

// Exportación ES Modules (MJS)
export default nextConfig;