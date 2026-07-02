/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Si el usuario entra a migraduacion.pro o www.migraduacion.pro
        source: '/',
        has: [
          {
            type: 'host',
            value: '(?<host>.*migraduacion\\.pro)',
          },
        ],
        // Muestra silenciosamente la carpeta graduacion sin cambiar la URL
        destination: '/graduacion',
      },
    ];
  },
};

export default nextConfig;