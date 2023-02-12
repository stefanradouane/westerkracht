import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import arrayify from 'array-back';

console.log("heyy")

const endpointCoachAPIget = '/api/coaches'
const endpointCoachAPIpost = '/admin/coaches'
const endpointMediaAPIget = '/api/media'

export const Infoblokken = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);

    // Fetch files
    useEffect(() => {
        const fetchData = async () => {

            const responseMedia = await fetch(endpointMediaAPIget);
            if (!responseMedia.ok) {
                throw new Error("Network response was not ok");
            }
            setFiles(await responseMedia.json())
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(endpointCoachAPIget);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setData(await response.json())
        }

        fetchData()
    }, [files]);

    useEffect(() => {
        if(data != null) {
            setLoading(false);        
        }
    }, [data]);

    if(loading){
        return <div>Loading...</div>
    }

    const handleSubmitInfo = async (e) => {
        e.preventDefault()
        const formArray = arrayify(e.target.form);

        const newList = Object.fromEntries( 
            formArray.filter(input => input.value)
            .map(input => [input.name, input.value])
        )

        try{
            const response = await fetch(endpointCoachAPIpost, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newList),
            })
            
            setData(await response.json())
            
        } catch (err) {
            console.log(err)
        }
    }

    const Options = ({ instance }) => {
        const defaultValue = files.filter(file => file.fileUrl == instance.image).map(file => {
            return file.fileUrl == instance.image ? file.fileUrl : null;
        })

        const usedValue = defaultValue.length == 0 ? "Selecteer een foto" : defaultValue;

        const OptionList = () => {
            if(defaultValue.length == 0) {
                const usedFiles = []
                usedFiles.push(<option disabled key="new">Selecteer een foto</option>)

                files.map((file, i) => {
                    const item = <option key={i} value={file.fileUrl}>{file.fileName}</option>
                    usedFiles.push(item)
                })

                return usedFiles
            } else {
                return files.map((file, i) => {
                    return (<option key={i} value={file.fileUrl}>{file.fileName}</option>)
                })
            }
        } 

        return (
            <select className="control__input" name="image" defaultValue={usedValue.toString()}>
                <OptionList/>
            </select>
        )
    }

    const Image = ({instance}) => {
        const imageUrl = files.filter(file => file.fileUrl == instance.image).map(file => {
            return file.fileUrl == instance.image ? file.fileUrl : null;
        })

        if(imageUrl.length == 0) {
            return <p>Geen foto geselecteerd</p>
        } else {
            return (<img className="infoblok__image infoblok__image--admin" src={imageUrl.toString()}/>)
        }

    }

    const infoSections = data.map((instance)  => {
        return (<form className="infoblok" method="POST" key={instance._id} >
                    <input type="hidden" name="id" value={instance._id}/>
                    <Image instance={instance} />
                    <section className="infoblok__info infoblok__info--admin">
                        <label className="control">
                            Coach image
                            <span className="control__required">*</span>
                            <Options instance={instance} />
                        </label>

                        <label className="control">
                            Coach naam
                            <span className="control__required">*</span>
                            <input className="control__input" type="text" name="name" defaultValue={instance.name}/>
                        </label>

                        <label className="control">
                            Blok ondertitel
                            <span className="control__required">*</span>
                            <input className="control__input" type="text" name="igmain" defaultValue={instance.ig[0]}/>
                            <input className="control__input" type="text" name="iglift" defaultValue={instance.ig[1]}/>
                        </label>

                        <label className="control">
                            Blok content
                            <span className="control__required">*</span>
                            <textarea className="control__input" name="content" cols="30" rows="10" defaultValue={instance.content}/>
                        </label>  
                        <label className="control">
                            Link
                            <span className="control__required">*</span>
                            <input className="control__input" type="text" name="linkTitle" defaultValue={instance.linkTitle}/>
                            <input className="control__input" type="text" name="link" defaultValue={instance.link} placeholder="Link met een '#' of een '/'"/>
                        </label>                      
                    </section>

                    <button className="cta" onClick={handleSubmitInfo}>Verander gegevens</button>
                </form>
        )
    })

    return (<section className="infoblokken infoblokken--admin">{infoSections}</section>)
}

const container = document.querySelector('.coaches-container')

if(container){
    const root = createRoot(container);
    root.render(<Infoblokken />);
}
