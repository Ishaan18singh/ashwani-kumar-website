/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/whatsapp',
        destination: 'https://whatsapp.com/channel/0029VbDOAeI30LKQtRNd6L20',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
