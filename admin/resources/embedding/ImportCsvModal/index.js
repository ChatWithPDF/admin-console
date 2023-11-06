import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
// import { client } from '../../api-clients/users-client';
import { MdPublish } from 'react-icons/md';
import UpdateProcess from './UpdateProcess';
import Papa from 'papaparse';

const ImportCsvModal = (props) => {
    const { showImportModal, state } = props;
    const [fileData, setFileData] = useState();
    const [startUpdate, setStartUpdate] = useState(false);
    const [confirmUpdate, setConfirmUpdate] = useState(false);

    const handleCsvUpload = async (event) => {
        const file = event.target.files[0];
        setFileData(file);
        // const parsePromise = new Promise((resolve, reject) => {
        // Papa.parse(file, {
        //     delimiter: ',',
        //     quoteChar: '"',
        //     header: true,
        //     skipEmptyLines: true,
        //     complete: (results) => {
        //         resolve(results.data);
        //     },
        //     error: (error) => {
        //         reject(error);
        //     },
        // });
        // });

        // try {   
        //     const data = await parsePromise;
        //     setFileData(data);
        // } catch (error) {
        //     console.error(error);
        // }
    }

    const formatCSVFile = () => {
        // const chunkSize = 100;
        // const updatedFileData = Array.from(
        //     { length: Math.ceil(fileData.length / chunkSize) },
        //     (_, index) =>
        //       Array.from(
        //         { length: chunkSize },
        //         (_, index2) => {
        //             if(fileData[index * chunkSize + index2]) {
        //                 let data = fileData[index * chunkSize + index2]
        //                 return {
        //                     "id": parseInt(data.index?.trim() || data.id?.trim()),
        //                     "content": data.context?.trim() || data.content?.trim(),
        //                     "tags": data.tags.trim()
        //                 }
        //             }
        //         }
        //       ).filter((element) => element != undefined)
        // );
        // setFileData(updatedFileData)
        setConfirmUpdate(true)
    }

    const handleUserUpdates = () => {
        setStartUpdate(true)
    }

    const getSecondOption = () => {
        if (!fileData) {
            return <>
                <p style={{ color: 'red', fontWeight: 600, textAlign: 'center' }}>An error occured while uploading file</p>
                <div>
                    <div onClick={() => setFileData(null)}>Try Again</div>
                </div>
            </>
        }
        formatCSVFile()
        // return <>  <p>Are you sure? The data will be create/updated according to the csv uploaded</p>
        //     <div>
        //         <div onClick={() => showImportModal(false)}>Cancel</div>
        //         <div onClick={() => {formatCSVFile()}}>Continue</div>
        //     </div></>
    }

    return (ReactDOM.createPortal(
        <div className={styles.modalContainer}>
            <div className={styles.modalContent + " animate__animated animate__backInUp"}>
                {/* <UpdateProcess /> */}
                {!startUpdate && !confirmUpdate && <div className={styles.fileUpload}>
                    {!fileData && <p>Please upload a file (📄) to continue.</p>}
                    {!fileData && <div>
                        <div onClick={() => showImportModal(false)}>Cancel</div>
                        <label className={styles.customFileUpload}>
                            <input type="file" accept=".csv" onChange={handleCsvUpload} />
                            Upload <MdPublish style={{ height: 20, width: 20, marginBottom: "-0.2rem" }} />
                        </label>
                    </div>}
                    {fileData &&
                        <div className={styles.confirmUpdate + " animate__animated animate__fadeInDown"}>
                            {getSecondOption()}
                        </div>
                    }
                </div>}
                {!startUpdate && confirmUpdate && <div className={styles.confirmUpdate + " animate__animated animate__fadeInDown"}>
                    <p style={{ color: 'red' }}>Uploading data cannot be stopped once it's started. Continue?</p>
                    <div>
                        <div style={{padding: "0.7rem 2rem"}} onClick={() => showImportModal(false)}>Cancel</div>
                        <div onClick={() => handleUserUpdates()}>Continue</div>
                    </div>
                </div>}
                {startUpdate && <UpdateProcess {...{ fileData, showImportModal }} />}
            </div>
        </div >, document.body)
    );
}

export default ImportCsvModal;