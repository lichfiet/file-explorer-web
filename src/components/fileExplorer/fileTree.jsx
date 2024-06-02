import React, { useState, useEffect } from 'react';
import FolderTree from 'react-folder-tree';
import axios from 'axios';

const FileNavigationTree = ({ fileList }) => {
    const [treeData, setTreeData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8443/listFiles/`, {
    //                 headers: {
    //                     'method': `S3`,
    //                     'sessionid': 'true',
    //                     'Access-Control-Allow-Credentials': 'true',
    //                 }
    //             });
    //             setTreeData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching tree data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const onTreeStateChange = (state, event) => {
        console.log(state, event);
    };

    return (
        <>
            <div className="fileExplorerDirectoryTreeContainer">
                <h5 style={{ color: "#e9e9f0", fontSize: "110%", marginBottom: "3%" }}>Navigation Tree</h5>
                <FolderTree
                    data={treeData}
                    onChange={onTreeStateChange}
                    showCheckbox={false}
                />
            </div>
        </>
    );
};

export default FileNavigationTree;