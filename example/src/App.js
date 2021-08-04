// Taken from https://codesandbox.io/s/magical-haslett-t6un5
import React, {useState} from "react";

import {CodeMirrorEditor} from "./CodeMirrorEditor";
import FileTree from "./fileTree";


const dummyFiles = [
    {id: 1, name: "package.json", code: "help me"},
    {id: 2, name: "index.html", code: "please work"},
    {id: 3, name: "styles.css", code: "please work"},
    {id: 7, name: "main.c", code: "please work"},
    {
        id: 4,
        name: "index.js",
        code: 'function main() {\n console.log("hello face")\n}\n yes man\nbanana'
    },
    {
        id: 5,
        name: "james.py",
        code: "print(\"penis\")"
    },
    {id: 6, name: "helper.go", code: "func main() {\n fmt.Println(\"hello world\")\n}\n"}
];

const initState = {
    selectedFile: 3,
    files: dummyFiles
}

function App() {
    const [state2, setState2] = useState(initState);


    const [files, setFiles] = React.useState(dummyFiles);
    const [selectedFile, setSelectedFile] = React.useState(1);

    if (selectedFile == null) {
        setSelectedFile(files.find((file) => file.name === "index.js").id);
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
        setSelectedFile(file.id);
        // console.log("91 ", selectedFile);
    };


    // function addFile() {
    //     var filename = prompt("Name the new file");
    //     var id = state2.files.length + 1;
    //
    //     var newState2 = Object.assign({}, state2)
    //
    //     newState2.files.push({id: id, name: filename, code: ""})
    //     newState2.selectedFile = id
    //
    //     setState2(newState2)
    //
    //
    // }

    function addFile() {
        var filename = prompt("Name the new file");
        var id = files.length + 1;

        // var newState2 = Object.assign({}, files)
        var clonedArray = JSON.parse(JSON.stringify(files))
        clonedArray.push({id: id, name: filename, code: ""})
        setFiles(clonedArray)

        setSelectedFile(id)

    }


    // const deleteFile2 = (id) => {
    //
    //     console.log("125 deleting ", id)
    //     console.log("126 state2 ", state2)
    //
    //     var newState2 = Object.assign({}, state2)
    //
    //     if (state2.selectedFile == id) {
    //         newState2.selectedFile = 2
    //     }
    //     newState2.files = state2.files.filter((file) => {
    //         return file.id != id
    //     })
    //
    //     console.log("139 newState2 ", newState2)
    //     setState2(prevState => ({
    //         ...prevState,
    //         selectedFile: newState2.selectedFile,
    //         files: [...newState2.files]
    //     }))
    //     console.log("120 state2 ", state2)
    //
    // };

    const deleteFile2 = (id) => {

        console.log("109 Files ", files)
        console.log("110 selectedFile ", selectedFile)

        var clonedArray = JSON.parse(JSON.stringify(files))

        clonedArray = files.filter((file) => {
            return file.id != id
        })

        if (selectedFile == id) {
            setSelectedFile(1)
        }

        console.log("107 clonedArray ", clonedArray)
        setFiles(clonedArray)

        console.log("109 Files ", files)
        console.log("110 selectedFile ", selectedFile)


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
            <main style={{display: "flex"}}>
                <div>{files.map(file=> <p key={file.id}>{file.name}</p>)}</div>
                <aside style={mystyle}>
                    <FileTree
                        // files={state2.files}
                        files={files}
                        selectedFile={selectedFile}
                        onSelect={onSelect}
                        deleteFile2={deleteFile2}
                    />
                    <button onClick={() => addFile()}>Add</button>
                </aside>


                <CodeMirrorEditor
                    // docName={state2.files.find((file) => file.id === state2.selectedFile).name}
                    docName={files.find((file) => file.id === selectedFile).name}
                    // value={state2.files.find((file) => file.id === state2.selectedFile).code}
                    value={files.find((file) => file.id === selectedFile).code}
                    onChange={(value, docName, changes, doc) => {
                        console.log("value ", value);
                        console.log("docName ", docName);
                        console.log("changes ", changes);
                        console.log("doc ", doc);
                        console.log("doc mode ", doc.getMode());
                        // state2.files.find((file) => file.name === docName).code = value
                        files.find((file) => file.name === docName).code = value
                        console.log("updated state ", state2)
                    }}
                />
            </main>
        </>
    );
}

export default App;
