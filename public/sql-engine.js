/* Browser-compatible SQLite exercise engine. Each run gets a fresh database. */
function runExercise(SQL, seed, tasks, input){
  const {query,taskId,action}=input;
  function validate(s){if(typeof s!=='string'||!s.trim()||s.length>12000)throw Error('Enter a SQL statement (up to 12,000 characters).');if(/\b(attach|detach|vacuum|pragma|load_extension|readfile|writefile)\b/i.test(s))throw Error('File access and PRAGMA are not allowed in the practice sandbox.');}
  function result(d,s){const stmt=d.prepare(s);try{const columns=stmt.getColumnNames(),rows=[];while(stmt.step()){rows.push(stmt.get().map(v=>v instanceof Uint8Array?'[BLOB '+v.length+' bytes]':v));if(rows.length>500)throw Error('Result exceeds 500 rows. Add a filter or LIMIT.');}return columns.length?{columns,rows}:{columns:[],rows:[],changes:d.getRowsModified()};}finally{stmt.free();}}
  function execute(d,s,t){validate(s);if(t?.verify){d.exec(s);if(t.probe)d.exec(t.probe);return result(d,t.verify)}if(t&&!/^\s*(SELECT|WITH)\b/i.test(s))throw Error('This exercise expects a SELECT query.');return result(d,s)}
  function compare(a,b,ordered){if(a.columns.length!==b.columns.length)return false;const norm=r=>JSON.stringify(r.map(v=>typeof v==='number'?Math.round(v*1e8)/1e8:v));const x=a.rows.map(norm),y=b.rows.map(norm);if(!ordered){x.sort();y.sort()}return JSON.stringify(x)===JSON.stringify(y)}
  const d=new SQL.Database();let expectedDB;try{d.run(seed);if(action==='tables'){return {tables:['Department','Student','Course','Enrollment','Employee','Company','Works','Manages','EmpLog'].map(name=>({name,...result(d,'SELECT * FROM '+name)}))}}const t=tasks.find(t=>t.id===Number(taskId));const actual=execute(d,query,t);if(!t)return {actual};expectedDB=new SQL.Database();expectedDB.run(seed);const expected=execute(expectedDB,t.answer,t);return {actual,expected,correct:compare(actual,expected,t.ordered)};}finally{d.close();if(expectedDB)expectedDB.close();}
}
if(typeof module!=='undefined')module.exports={runExercise};
