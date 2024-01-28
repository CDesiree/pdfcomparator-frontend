import React, { useState } from "react";
import "./Home.css"
import { Button, Tooltip } from "antd";
import { comparePdf, downloadPdf } from '../apis/api';

function Home() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [downloadDisabled, setDownloadDisabled] = useState(true);
    const [compareDisabled, setCompareDisabled] = useState(true);

    const handleFile1 = (event, fileKey) => {
        setFile1(event.target.files[0]);
        updateCompareButton(event.target.files[0], file2);
    }

    const handleFile2 = (event, fileKey) => {
        setFile2(event.target.files[0]);
        updateCompareButton(file1, event.target.files[0]);
    }

    const updateCompareButton = (file1, file2) => {
        const areFilesSelected = file1 !== null && file2 !== null;

        setCompareDisabled(!areFilesSelected);
    }

    const handleCompare = () => {
        comparePdf(file1, file2)
          .then(response => {
            console.log(response.data);
            setDownloadDisabled(false);
          })
          .catch(error => {
            console.error('Error: ', error);
          });
    }

    const handleDownload = () => {
        downloadPdf();
    }

    return (
        <>
            <div className="home-page">
                <div className="table-container">
                    <input type="file" onChange={handleFile1} />
                    <input type="file" onChange={handleFile2} />
                    <Tooltip title={downloadDisabled ? 'Files are not yet compared' : ''}>
                        <Button onClick={handleDownload} disabled={downloadDisabled}>Compared File</Button>
                    </Tooltip>
                    <div className="button-container">
                        <Tooltip title={compareDisabled ? 'Files are not yet selected': ''}>
                            <Button onClick={handleCompare} disabled={compareDisabled}>Compare</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;