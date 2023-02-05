import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import arrayify from 'array-back';

const container = document.querySelector('.hero-container')

const endpointHeroAPIget = '/api/hero'
const endpointMediaAPIget = '/api/media'
const endpointHeroAPIpost = '/admin/hero'

const Hero = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState([])

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(endpointHeroAPIget);
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
    const currentHero = data[0]


    const handleSubmitInfo = async (e) => {
        e.preventDefault()
        const formArray = arrayify(e.target.form);

        const newList = Object.fromEntries( 
            formArray.filter(input => input.value)
            .map(input => [input.name, input.value])
        )

        try{
            const addItems = fetch(endpointHeroAPIpost, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newList),
            })

            const fetchData = async () => {
                const response = await fetch(endpointHeroAPIget);
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



    const Image = ({instance}) => {
        const imageUrl = files.filter(file => file.fileUrl == instance.fileUrl).map(file => {
            return file.fileUrl == instance.fileUrl ? file.fileUrl : null;
        })

        if(imageUrl.length == 0) {
            return <p>Geen foto geselecteerd</p>
        } else {
            return (<img width="100%" src={instance.fileUrl}/>)
        }

    }


    const Options = ({ instance }) => {
        const defaultValue = files.filter(file => file.fileUrl == instance.fileUrl).map(file => {
            return file.fileUrl == instance.fileUrl ? file.fileUrl : null;
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
            <select className="control__input" name="fileUrl" defaultValue={usedValue.toString()}>
                <OptionList/>
            </select>
        )
    }

    return (
        <form method="POST">
            <label className="control">
                Info image
                <span className="control__required">*</span>
                <Options instance={currentHero} />
            </label>
            <Image instance={currentHero} />
            <input name="id" type="hidden" value={currentHero._id} />
            <button onClick={handleSubmitInfo} className="cta">Verander hero</button>
        </form>)
}


if(container){
    const root = createRoot(container);
    root.render(<Hero />);
}