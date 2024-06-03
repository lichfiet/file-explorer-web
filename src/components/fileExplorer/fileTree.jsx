import React, { useState, useEffect } from 'react';
import FolderTree from 'react-folder-tree';
import axios from 'axios';

const FileNavigationTree = ({ fileList, fileSelector }) => {
    const [treeData, setTreeData] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8443/listFiles/`, {
                    headers: {
                        'method': `S3`,
                        'sessionid': 'true',
                        'Access-Control-Allow-Credentials': 'true',
                    }
                });
                setTreeData(response.data);
            } catch (error) {
                console.error('Error fetching tree data:', error);
            }
        };
        
        fetchData();
    }, [fileList]);
    
    const onNameClick = async ({ defaultOnClick, nodeData}) => {
        defaultOnClick();

        await fileSelector(nodeData.name, 0, nodeData.extensionType, nodeData.directory);

      };

    const onTreeStateChange = (state, event) => {
        // maybe update later to save state and whatnot
    };

    return (
        <>
            <div className="fileExplorerDirectoryTreeContainer">
                <h5 style={{ color: "#e9e9f0", fontSize: "110%", marginBottom: "3%" }}>Navigation Tree</h5>
                <FolderTree
                    data={treeData}
                    onChange={onTreeStateChange}
                    showCheckbox={false}
                    onNameClick={onNameClick}
                    readOnly={true}
                    indentPixels={ 15 }
                />
            </div>
        </>
    );
};

export default FileNavigationTree;