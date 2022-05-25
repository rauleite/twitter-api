// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  preset: "jest-puppeteer"
};

module.exports = config;

// // Or async function
// module.exports = async () => {
//   return {
//     verbose: true,
//   };
// };


// import type { Config } from '@jest/types';

// // Sync object
// const config: Config.InitialOptions = {
//   verbose: true,
// };
// export default config;

// // // Or async function
// // export default async (): Promise<Config.InitialOptions> => {
// //   return {
// //     verbose: true,
// //   };
// // };
