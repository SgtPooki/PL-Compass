// import { Web3Storage } from 'web3.storage'

// function getAccessToken() {
//   // If you're just testing, you can paste in a token
//   // and uncomment the following line:
//   // return 'paste-your-token-here'

//   // In a real app, it's better to read an access token from an
//   // environement variable or other configuration that's kept outside of
//   // your code base. For this to work, you need to set the
//   // WEB3STORAGE_TOKEN environment variable before you run your code.
//   return process.env.WEB3STORAGE_TOKEN

// }

// function makeStorageClient() {
//   return new Web3Storage({ token: getAccessToken() })
// }
// function makeFileObjects() {
//   // You can create File objects from a Blob of binary data
//   // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
//   // Here we're just storing a JSON object, but you can store images,
//   // audio, or whatever you want!
//   const obj = { hello: 'world' }
//   const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'})

//   const files = [
//     new File(['contents-of-file-1'], 'plain-utf8.txt'),
//     new File([blob], 'hello.json')
//   ]
//   return files
// }
// async function storeFiles(files) {
//   const client = makeStorageClient()
//   const cid = await client.put(files)
//   console.log('stored files with cid:', cid)
//   return cid
// }
// async function storeWithProgress(files) {
//   // show the root cid as soon as it's ready
//   const onRootCidReady = cid => {
//     console.log('uploading files with cid:', cid)
//   }

//   // when each chunk is stored, update the percentage complete and display
//   const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
//   let uploaded = 0

//   const onStoredChunk = size => {
//     uploaded += size
//     const pct = uploaded / totalSize
//     console.log(`Uploading... ${Math.min(pct * 100, 100).toFixed(2)}% complete`)
//   }

//   // makeStorageClient returns an authorized Web3.Storage client instance
//   const client = makeStorageClient()

//   // client.put will invoke our callbacks during the upload
//   // and return the root cid when the upload completes
//   return client.put(files, { onRootCidReady, onStoredChunk })
// }
// async function retrieve(cid) {
//   const client = makeStorageClient()
//   const res = await client.get(cid)
//   console.log(`Got a response! [${res.status}] ${res.statusText}`)
//   if (!res.ok) {
//     throw new Error(`failed to get ${cid}`)
//   }

//   // request succeeded! do something with the response object here...
// }
// // async function retrieveFiles(cid) {
// //   const client = makeStorageClient()
// //   const res = await client.get(cid)
// //   console.log(`Got a response! [${res.status}] ${res.statusText}`)
// //   if (!res.ok) {
// //     throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
// //   }

// //   // unpack File objects from the response
// //   const files = await res.files()
// //   for (const file of files) {
// //     console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
// //   }
// // }
// async function checkStatus(cid) {
//   const client = makeStorageClient()
//   const status = await client.status(cid)
//   console.log(status)
//   if (status) {
//     // your code to do something fun with the status info here
//   }
// }
// async function listUploads() {
//   const client = makeStorageClient()
//   for await (const upload of client.list()) {
//     console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`)
//   }
// }
// async function listWithLimits() {
//   const client = makeStorageClient()

//   // get today's date and subtract 1 day
//   const d = new Date()
//   d.setDate(d.getDate() - 1)

//   // the list method's before parameter accepts an ISO formatted string
//   const before = d.toISOString()

//   // limit to ten results
//   const maxResults = 10

//   for await (const upload of client.list({ before, maxResults })) {
//     console.log(upload)
//   }
// }

export {}
