import React from "react";
import * as Icons from "./icon";

function FileTree(props) {
    return <SubTree allFiles={props.files} {...props} />;
}

function SubTree({deleteFile2, files, allFiles, selectedFile, onSelect, ...props}) {
    return (
        <div {...props}>
            {files.sort(sortingFunction).map((child) => (
                <React.Fragment key={child.id}>
                    <File
                        selectedFile={selectedFile}
                        allFiles={files}
                        // onClick={() => onSelect(child)}
                        child={child}
                        onSelect={onSelect}
                        deleteFile2={deleteFile2}
                        {...child}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}

function FileIcon({name, extension}) {
    const Icon = Icons[extension] || Icons[name];

    const mystyle = {
        display: "flex",
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <span style={mystyle}>
      <Icon/>
    </span>
    );
}

function File(props) {
    // console.log("all files props 46 ", props);
    const isSelected = props.selectedFile && props.selectedFile.id === props.id;

    // console.log("109 ", props.selectedFile);
    // console.log("110 ", isSelected);
    // console.log("selected id ", props.id);

    const mystyle = {
        display: "flex",
        alignItems: "center",
        marginRight: 5,
        paddingLeft: 16,
        backgroundColor: isSelected ? "#242424" : "transparent",
        ":hover": {
            cursor: "pointer",
            backgroundColor: "#242424"
        },
        ...props.css
    };

    return (
        <div {...props} style={mystyle}>
            <FileIcon
                name={props.icon || "File"}
                extension={props.name.split(".").pop()}
                // extension={"js"}
            />
            <span style={{marginLeft: 1}} onClick={()=>props.onSelect(props.child)}>{props.name}</span>
            <button onClick={()=>props.deleteFile2(props.id)}>X</button>
        </div>
    );
}

function sortingFunction(a, b) {
    // directories come first, sorted alphabetically
    // then files, also sorted alphabetically
    let first;

    if (a.type === b.type) {
        if (a.name < b.name) first = a;
        else first = b;
    }

    // js be weird
    if (first === a) return -1;
    else return 1;
}

export default FileTree;
