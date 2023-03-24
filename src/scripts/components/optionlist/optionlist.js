import React from 'react';

export const Options = (props) => {
    const files = props.files
    const imageOptions = props.imageOptions;

    const image = imageOptions.image
    const setImage = imageOptions.setImage

    const OptionList = () => {
        return files.map((file, i) => {   
            return <option key={i} value={file.fileUrl}>{file.fileName}</option>
        })
    } 

    function changeValue(e){
        setImage(e.target.value)
    }

    if(image){
        return (
            <select className="control__input" name="image" value={image} onInput={changeValue}>
                <OptionList/>
            </select>
        )
    } else {
        return (
            <select className="control__input" name="image" value={"new"} onInput={changeValue}>
                <option disabled value="new">Selecteer een foto</option>
                <OptionList/>
            </select>
        )
    }
}