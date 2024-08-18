import React, { useState, useEffect } from 'react';
import FolderTree from 'react-folder-tree';
import './FileTree.css';

const FileNavigationTree = ({ fileList, fileSelector }) => {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        fileList !== undefined ? setTreeData(fileList) : null;
    }, [fileList]);
    
    const onNameClick = async ({ defaultOnClick, nodeData}) => {
        defaultOnClick();
        await fileSelector(nodeData.name, 0, nodeData.extensionType, nodeData.directory, nodeData.parentDir);
      };

    const onTreeStateChange = (state, event) => {
        // maybe update later to save state and whatnot
    };

    return (
        <>
            <div className="fileExplorerDirectoryTreeContainer">
                <h5 style={{ color: "#e9e9f0", fontSize: "110%", marginBottom: "3%" }}><i className="squareIcon fa fa-solid fa-folder-tree"></i> Navigation Tree</h5>

                <div className="fileExplorerDirectoryTree">                    
                <FolderTree
                    data={treeData}
                    onChange={onTreeStateChange}
                    showCheckbox={false}
                    onNameClick={onNameClick}
                    readOnly={true}
                    indentPixels={ 15 }
                />
                </div>
            </div>
        </>
    );
};

export default FileNavigationTree;