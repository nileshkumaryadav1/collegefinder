/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',  // allow all HTTPS domains
        },
        {
          protocol: 'http',
          hostname: '**',  // if you also want to allow HTTP (not recommended, but possible)
        },
      ],
    },
  };
  
  export default nextConfig;
  