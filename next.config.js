/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_URL: 'https://catalog.tmsiti.uz',
    // NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET: 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/classifier',
        permanent: true,
        basePath:false
      },
    ]
  },
}

module.exports = nextConfig
