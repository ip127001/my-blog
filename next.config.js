module.exports = {
  swcMinify: true,
  images: {
    domains: ["ik.imagekit.io"],
  },
  env: {
    NEXT_PUBLIC_USER_NAME: process.env.NEXT_PUBLIC_USER_NAME,
    NEXT_PUBLIC_PASSWORD: process.env.NEXT_PUBLIC_PASSWORD,
    NEXT_PUBLIC_CLUSTER_NAME: process.env.NEXT_PUBLIC_CLUSTER_NAME,
    NEXT_PUBLIC_DB_NAME: process.env.NEXT_PUBLIC_DB_NAME,
    NEXT_PUBLIC_NEXT_PUBLIC_NEXT_PUBLIC_GOOGLE_ANALYTICS:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
};
