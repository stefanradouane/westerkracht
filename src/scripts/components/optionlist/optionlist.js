import React from 'react';


export const Options = (props) => {
    const instance = props.instance
    const files = props.files
    // const defaultValue = 
    // files.filter(file => file.fileUrl == instance.image).map(file => {
    //     return file.fileUrl == instance.image ? file.fileUrl : null;
    // })

    const usedValue = files.find((file) => (file.fileUrl == instance.image))
    console.log(usedValue.fileUrl)

    const imageUrl = props.files.filter(file => file.fileUrl == props.instance.image).map(file => {
        return file.fileUrl == props.instance.image ? file.fileUrl : null;
    })


    // const usedValue = defaultValue.length == 0 ? "Selecteer een foto" : defaultValue;

    const OptionList = () => {
        return files.map((file, i) => (<option key={i} value={file.fileUrl}>{file.fileName}</option>))
        if(defaultValue.length == 0) {
            const usedFiles = []
            usedFiles.push(<option disabled key="new">Selecteer een foto</option>)

            files.map((file, i) => {
                const item = <option key={i} value={file.fileUrl}>{file.fileName}</option>
                usedFiles.push(item)
            })

            return usedFiles
        } else {
            
        }

    } 

    return (
        <select className="control__input" name="image" defaultValue={imageUrl.toString()}>
            <OptionList/>
        </select>
    )
}


// export const Options = (props) => {
//     console.log(props)


//     let defaultValue;


//     if(props.instance){
//         defaultValue = props.files.filter(file => file.fileUrl == props.instance.image).map(file => {
//             return file.fileUrl == props.instance.image ? file.fileUrl : null;
//         })
//     } 

    
//     const usedValue = defaultValue.length == 0 ? "Selecteer een foto" : defaultValue;
    
//     const OptionList = () => {
//         if(defaultValue.length == 0) {
//             const usedFiles = []
//             usedFiles.push(<option disabled key="new">Selecteer een foto</option>)

//             props.files.map((file, i) => {
//                 const item = <option key={i} value={file.fileUrl}>{file.fileName}</option>
//                 usedFiles.push(item)
//             })

//             return usedFiles
//         } else {
//             return props.files.map((file, i) => {
//                 return (<option key={i} value={file.fileUrl}>{file.fileName}</option>)
//             })
//         }
//     } 


//     return (
//         <select className="control__input" name="image" defaultValue={usedValue.toString()} required>
//             <OptionList/>
//         </select>
//     )
// }
