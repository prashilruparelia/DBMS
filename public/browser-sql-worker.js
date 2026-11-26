importScripts('vendor/sql-wasm.js','content.js','sql-engine.js');
const engine=initSqlJs({locateFile:file=>new URL('vendor/'+file,self.location.href).href});
self.onmessage=async ({data})=>{try{const SQL=await engine;self.postMessage(runExercise(SQL,seed,sqlTasks,data))}catch(e){self.postMessage({error:e.message||String(e)})}};
