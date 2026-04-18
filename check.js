const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const rx = /<script.*?>([\s\S]*?)<\/script>/gi;
let m;
while((m = rx.exec(c)) !== null){
  try {
    new Function(m[1]);
  } catch(e) {
    console.log('Error around script tag line ' + c.substring(0, m.index).split('\n').length + ': ' + e.message);
    const lines = m[1].split('\n');
    for (let i = 0; i < lines.length; i++) {
        try { new Function(lines.slice(0, i+1).join('\n')); }
        catch(e2) {
            if (e2.message !== 'Unexpected end of input' && e2.message !== 'missing ) after argument list' && e2.message !== "Unexpected token '}'" && e2.message !== "Unexpected token 'catch'" && e2.message !== "Unexpected token 'if'") continue; 
            if (e2.message === 'missing ) after argument list') {
                console.log('Fails near relative line ' + (i+1) + ': ' + lines[i]);
            }
        }
    }
  }
}
