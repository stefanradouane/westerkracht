import React from 'react';

export const Image = (props) => {
    const imageUrl = props.files.filter(file => file.fileUrl == props.instance.image).map(file => {
        return file.fileUrl == props.instance.image ? file.fileUrl : null;
    })

    if(imageUrl.length == 0) {
        return <p>Geen foto geselecteerd</p>
    } else {
        return (<img className="cm-block__image" src={imageUrl.toString()}/>)
    }
}
