/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'migraduacion.pro' }],
        destination: '/graduacion',
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'www.migraduacion.pro' }],
        destination: '/graduacion',
      }
    ];
  },
};
export default nextConfig;