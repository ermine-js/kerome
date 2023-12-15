import { detectRuntime } from './utils'
// import isPlainObject from 'lodash-es/isPlainObject'

const runtime = detectRuntime()
console.log('runtime is: ', runtime)

// const createProxy = (paths: string[]): any => {
//   const fetchData = async (): Promise<any> => {
//   }
//   let promise: any

//   const lazy = (): any => {
//     if (!promise) {
//       promise = (async () => {
//         const { data, keys } = await fetchData()
//         if (Array.isArray(data)) {
//           return data.map((_item, index) =>
//             createProxy(paths.concat([String(index)]))
//           )
//         } else if (isPlainObject(data)) {
//           return new Proxy(data, {
//             get: (obj, prop: string) => {
//               if (!keys.includes(prop)) {
//                 return undefined
//               } else if (
//                 isPlainObject(obj) &&
//                 Object.prototype.hasOwnProperty.call(obj, prop)
//               ) {
//                 return obj[prop]
//               } else {
//                 return createProxy(paths.concat(prop))
//               }
//             },

//             ownKeys: () => keys,
//             getOwnPropertyDescriptor (target, key) {
//               return {
//                 value: this.get(target, key),
//                 enumerable: true,
//                 configurable: true
//               }
//             }
//           })
//         } else {
//           return data
//         }
//       })()
//     }
//   }

//   const result = new Proxy(
//     { __virtual__: true },
//     {
//       get: (obj, prop: string) => {
//         switch (prop) {
//           case 'then': {
//             lazy()
//             return promise.then.bind(promise)
//           }
//           case 'catch': {
//             lazy()
//             return promise.catch.bind(promise)
//           }

//           default: {
//             return createProxy(paths.concat([prop]))
//           }
//         }
//       }
//     }
//   )
//   return result
// }
