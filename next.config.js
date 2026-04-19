/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! PERINGATAN !!
    // Ini akan membiarkan build sukses meskipun ada type error
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ini juga biar dia nggak cerewet soal aturan penulisan
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig