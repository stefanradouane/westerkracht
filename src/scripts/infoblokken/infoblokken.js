import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import arrayify from 'array-back';


const endpointInfoAPIget = '/api/info'
const endpointInfoAPIpost = '/admin/info'
const endpointMediaAPIget = '/api/media'

export const Infoblokken = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(endpointInfoAPIget);
            const responseMedia = await fetch(endpointMediaAPIget);
            if (!response.ok || !responseMedia.ok) {
                throw new Error("Network response was not ok");
            }
            setData(await response.json())
            setFiles(await responseMedia.json())
            setLoading(false);
        };
    
        fetchData();
    }, []);

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
            const addItems = fetch(endpointInfoAPIpost, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newList),
            })

            const fetchData = async () => {
                const response = await fetch(endpointInfoAPIget);
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                setData(await response.json());
                setLoading(false);

            };

            fetchData()
              
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
        console.log(defaultValue)

        return (
            <select name="image" defaultValue={usedValue.toString()}>
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
            return (<img width="130px" src={imageUrl.toString()}/>)
        }

        console.log(imageUrl)
        return <div>Test</div>
    }

    const infoSections = data.map((instance, i)  => {
        console.log(instance._id);

        return (<section key={instance._id}>
                    <form method="POST" key={instance._id} >
                    <div >
                        <label>
                            Info blok naam
                            <input type="text" name="title" defaultValue={instance.title}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Info blok subtitle
                            <input type="text" name="subtitle" defaultValue={instance.subtitle}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Info content
                            <textarea name="content" cols="30" rows="10" defaultValue={instance.content}/>
                        </label>
                    </div>

                    <div >
                        <em>Deze foto sectie zal veranderd worden naar een fotobibliotheek van de site o.i.d.</em>
                        <label >Info image</label>
                        <Options instance={instance} />
                        <div>
                            <Image instance={instance} />
                        </div>
                    </div>

                    <input type="hidden" name="id" value={instance._id} />
                    
                    <button onClick={handleSubmitInfo}>Verander gegevens</button>
                </form>
            </section>
        )
    })

    console.log(data)

    return (<div className="testings">{infoSections}</div>)



}



const container = document.querySelector('.infoblokken-container')

if(container){
    const root = createRoot(container);
    root.render(<Infoblokken />);
}
