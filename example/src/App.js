import React, {useState} from 'react';

import { CodeMirrorEditor } from './CodeMirrorEditor'

const testDoc = `
const element = document.createElement('h1')
element.innerHTML = \`
  Hello, world!<br />
\`.repeat(10)
document.getElementById('root').appendChild(element)
`

const doc2 = `
put in the work
or f off
`

function App() {
    const [state, setState] = useState({name: "test.js", value: testDoc})

    function toggle() {
        if (state.name == "test.js"){
            setState({name: "name.go", value: doc2})
        } else {
            setState({name: "test.js", value: testDoc})
        }
    }
    console.log("stuff here ", JSON.stringify(state))

    return (
        <>
            <div id="penisface" data-state={JSON.stringify(state)}/>
            <button onClick={()=>toggle()}>change tabs</button>
            <CodeMirrorEditor
                docName={state.name}
                value={state.value}
                // onBeforeChange={(editor, data, value) => {
                //     // setState(value);
                //     console.log("57 ", editor, data, value);
                //   }}
                onChange={(value, docName, changes, doc) => {
                    console.log("value ", value);
                    console.log("docName ", docName);
                    console.log("changes ", changes);
                    console.log("doc ", doc);
                    console.log("doc mode ", doc.getMode());
                }}
            />
        </>
    );
}

export default App;
