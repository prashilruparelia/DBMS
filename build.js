const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=__dirname;const vendor=path.join(root,'public','vendor');fs.mkdirSync(vendor,{recursive:true});
for(const f of ['sql-wasm.js','sql-wasm.wasm'])fs.copyFileSync(path.join(root,'node_modules','sql.js','dist',f),path.join(vendor,f));
for(const f of ['LICENSE','LICENSE.txt']){let p=path.join(root,'node_modules','sql.js',f);if(fs.existsSync(p))fs.copyFileSync(p,path.join(vendor,'LICENSE.txt'));}
execFileSync(process.execPath,['test-browser-sql.js'],{cwd:root,stdio:'inherit'});
console.log('Static site ready: public/');
