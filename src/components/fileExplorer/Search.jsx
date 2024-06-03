import { useEffect, useState } from 'react';
import ReactSearchBox from 'react-search-box';

const Search = ({ currentDirectory, fileList, fileSelector }) => {
    const [unMappedFileList, setUnMappedFileList] = useState([]);

    useEffect(() => {
        console.log(fileList)
        if (fileList === null || fileList === undefined || fileList.length === 0) {
            setUnMappedFileList([]);
        } else {
        let unMapFileList = [];

        const unnestData = (data) => {
            data.forEach((file) => {
                unMapFileList.push({
                    key: file.directory,
                    value: file.name,
                    name: file.name,
                    extensionType: 3,
                    directory: file.directory,
                    children: !!file.children,
                    parentDir: file.parentDir
                });
    
                if (file.children && file.children.length > 0) {
                    unnestData(file.children);
                }
            });
        };

        unnestData(fileList.children);
        setUnMappedFileList(unMapFileList)
        }

    }, [fileList]);

    return (
        <div className='container'>
            <ReactSearchBox
                placeholder={currentDirectory === '' ? "root/" : currentDirectory}
                value={currentDirectory}
                data={unMappedFileList}
                callback={(key) => console.log(key)}
                onSelect={(record) => {
                    fileSelector(record.item.key, 0, record.item.extensionType, record.item.parentDir, record.item.children);
                }}
            />
        </div>
    );
}

export default Search;