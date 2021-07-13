
// Taken from https://codesandbox.io/s/magical-haslett-t6un5
import React, { useState } from "react";

import { CodeMirrorEditor } from "./CodeMirrorEditor";
import FileTree from "./fileTree";

const testDoc = `
const element = document.createElement('h1')
element.innerHTML = \`
  Hello, world!<br />
\`.repeat(10)
document.getElementById('root').appendChild(element)
`;

const doc2 = `
put in the work
or f off
`;

const dummyFiles = [
    { id: 1, name: "package.json", code: "help me" },
    { id: 2, name: "index.html", code: "please work" },
    { id: 3, name: "styles.css", code: "please work" },
    {
        id: 4,
        name: "index.js",
        code: 'function main() {\n console.log("hello face")\n}\n yes man\nbanana'
    },
    {
        id: 5,
        name: "sidebutt.js",
        code: "console.log(\"this is is it\")"
    },
    { id: 6, name: "helper.go", code: "func main() {\n fmt.Println(\"hello world\")\n}\n" }
];

const initState = {
    selectedFile: 3,
    files: dummyFiles
}
function App() {
    const [state, setState] = useState({ name: "test.js", value: testDoc });
    const [state2, setState2] = useState(initState);


    function toggle() {
        if (state.name == "test.js") {
            setState({ name: "name.go", value: doc2 });
        } else {
            setState({ name: "test.js", value: testDoc });
        }
    }
    // console.log("stuff here ", JSON.stringify(state));

    function getEditorContent() {
        var bob = document.getElementById("penisface");
        var sam = JSON.parse(bob.dataset.state);
        console.log("54 editor content ", sam);
    }

    const [files, setFiles] = React.useState(dummyFiles);
    const [selectedFile, setSelectedFile] = React.useState(null);

    if (selectedFile == null) {
        setSelectedFile(files.find((file) => file.name === "index.js"));
    }

    const onSelect = (file) => {
        console.log("71 ", file);
        var newState2 = Object.assign({}, state2)
        console.log("73 ", newState2)
        newState2.selectedFile = file.id;
        console.log("75 ", newState2)
        setState2(newState2)
        console.log("77 ", state2)
        // console.log("89 ", selectedFile);
        setSelectedFile(file);
        // console.log("91 ", selectedFile);
    };

    // const onUpdate = (id, code) => {
    //     const elementsIndex = files.findIndex((element) => element.id == id);
    //     let newArray = [...files];
    //
    //     newArray[elementsIndex] = { ...newArray[elementsIndex], code: code };
    //
    //     // console.log("76 ", files);
    //     // console.log("77 ", id, code);
    //     setFiles(newArray);
    // };

    function addFile() {
        var filename = prompt("Name the new file");
        var id = state2.files.length + 1;

        var newState2 = Object.assign({}, state2)

        newState2.files.push({id:id, name: filename, code: ""})
        newState2.selectedFile = id

        setState2(newState2)

        // newState2.selectedFile = file.id;
        // setState2(newState2)
        // // console.log("89 ", selectedFile);
        // setSelectedFile(file);
    }

    function deleteFile(id) {
        var newState2 = Object.assign({}, state2)

        if (id == state2.selectedFile) {
            // state2.files.find((file) => file.id === state2.selectedFile)
            // newState2.selectedFile = newSelectedFile;
        }

        setState2(newState2)
    }

    const mystyle = {
        display: "block",
        width: 250,
        height: "100vh",
        borderRight: "2px solid",
        borderColor: "#242424",
        paddingTop: 3
    };

    return (
        <>
            <button onClick={() => getEditorContent()}>getEditorContent</button>
            <div id="penisface" data-state={JSON.stringify(state)} />
            <button onClick={() => toggle()}>change tabs</button>

            <main style={{ display: "flex" }}>
                <aside style={mystyle}>
                    <FileTree
                        files={state2.files}
                        selectedFile={selectedFile}
                        onSelect={onSelect}
                    />
                    <button onClick={()=>addFile()}>Add</button>
                </aside>

                {/* {files.map((file) => (
        <Codemirror key={file.id} file={file} show={false} />
      ))}

      {selectedFile && (
        <Codemirror file={selectedFile} show={true} onUpdate={onUpdate} />
      )} */}
                {/* <Codemirror file={selectedFile} show={true} /> */}

                <CodeMirrorEditor
                    // docName={state.name}
                    docName={state2.files.find((file) => file.id === state2.selectedFile).name}
                    value={state2.files.find((file) => file.id === state2.selectedFile).code}
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
                        state2.files.find((file) => file.name === docName).code = value
                        console.log("updated state ", state2)
                    }}
                    // onChange={(editor, data, value) => {
                    //   console.log("editor ", editor);
                    //   console.log("data ", data);
                    //   console.log("value ", value);
                    // }}
                />
            </main>
        </>
    );
}

export default App;
