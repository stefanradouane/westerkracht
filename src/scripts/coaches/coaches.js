import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import arrayify from 'array-back';



import {popUp} from '../popup/popup'
import {api} from '../api/api'
import {endpoint} from '../api/endpoints'


import {Options} from '../components/optionlist/optionlist'
import {Image} from '../components/image/image'
import { CM_Block } from '../components/cm-block/cm-block';
import { form } from '../form/form';

const endpointCoachAPIget = '/api/coaches'
const endpointCoachAPIpost = '/admin/coaches'
const endpointMediaAPIget = '/api/media'

export const Infoblokken = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);

    // Fetch media and coaches
    useEffect(() => {
        api.get(endpoint.media.get)
          .then(data => { setFiles(data) })
          .catch(err => { throw new Error(err) })

        api.get(endpoint.coach.get)
          .then(data => { setData(data) })
          .catch(err => { throw new Error(err) })
    }, [])

    useEffect(() => {
        if(data != null) {
            setLoading(false);        
        }
    }, [data]);

    if(loading){
        return <div>Zoeken naar coaches...</div>
    }

    const handleSubmitInfo = async (e) => {
        e.preventDefault()

        const formArray = arrayify(e.target.form);

        const newList = Object.fromEntries( 
            formArray.filter(input => input.value)
            .map(input => [input.name, input.value])
        )

        api.post(endpoint.coach.post, newList)
          .then(data => { setData(data) })
          .catch(err => { throw new Error(err) })
    }

    const addCoach = async (e) => {
        e.preventDefault()
        const body = form.parseToBody(e.target.form);
        console.log(body)
        const notifcation = document.querySelector(".cm-block__notification--new")
        
        if(body.invalid) {
            notifcation.textContent = body.reason
            return
        }

        api.post(endpoint.coach.post, body)
          .then(data => { 
              setData(data)
              notifcation.textContent = "Coach toegevoegd ✅"
              form.reset(e.target.form) 
          })
          .catch(err => { throw new Error(err) })
    }

    const changeTab = (e) => {
        console.log(e.target.value)
        const forms = document.querySelectorAll(`.cm-block`);
        forms.forEach(form => form.ariaDisabled = "true")
        const selectedForm = document.querySelector(`.cm-block[data-value=${e.target.value}]`);
        selectedForm.ariaDisabled = "false"
    }

    const cmBlocks = data.map((instance, index) => {
        const disabled = index == 0 ? false : true
        return <CM_Block instance={instance} submit={handleSubmitInfo} files={files} disabled={disabled} key={index} />
    })

    const cmNav = data.map((instance, index) => {
        return (<button className="cm-blocks__nav-option cta" value={instance.name} onClick={changeTab} key={index}>
                {instance.name}
            </button>
        )
    })

    return (<section className="cm-blocks">
        <nav className="cm-blocks__nav">
            {cmNav}
            {/* <button className="cm-blocks__nav-option cta">Naam</button> */}
            <button className="cm-blocks__nav-option cm-blocks__nav-option--add cta" value="New" onClick={changeTab} key="new">
                <svg className="icon icon--plus" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50.0419 0C51.7009 0 53.2919 0.659033 54.465 1.83212C55.6381 3.0052 56.2971 4.59624 56.2971 6.25524V43.7867H93.8286C95.4875 43.7867 97.0786 44.4457 98.2517 45.6188C99.4248 46.7919 100.084 48.3829 100.084 50.0419C100.084 51.7009 99.4248 53.2919 98.2517 54.465C97.0786 55.6381 95.4875 56.2971 93.8286 56.2971H56.2971V93.8286C56.2971 95.4875 55.6381 97.0786 54.465 98.2517C53.2919 99.4248 51.7009 100.084 50.0419 100.084C48.3829 100.084 46.7919 99.4248 45.6188 98.2517C44.4457 97.0786 43.7867 95.4875 43.7867 93.8286V56.2971H6.25524C4.59624 56.2971 3.0052 55.6381 1.83212 54.465C0.659033 53.2919 0 51.7009 0 50.0419C0 48.3829 0.659033 46.7919 1.83212 45.6188C3.0052 44.4457 4.59624 43.7867 6.25524 43.7867H43.7867V6.25524C43.7867 4.59624 44.4457 3.0052 45.6188 1.83212C46.7919 0.659033 48.3829 0 50.0419 0Z"/>
                </svg>
            </button>
        </nav>
        <section className="cm-blocks__display">
            {cmBlocks}
            <CM_Block instance={{}} submit={addCoach} next={e => form.reset(e.target.form)} files={files} disabled={true} key={"New"} />
            {/* <form className="cm-block" method="POST" key="new" data-value="New" aria-disabled="true">
                <input type="hidden" value="new" name="new" />
                <section className="cm-block__grid">
                    <section className="cm-block__grid-img">
                    </section>

                    <section className="cm-block__grid-info">
                        <label className="control" htmlFor="name">
                            <span>
                                Coach naam
                                <span className="control__required">*</span>
                            </span>
                            <input className="control__input" type="text" name="name"  required/>
                        </label>
                        <label className="control" htmlFor="image">
                            <span>
                                Coach image
                                <span className="control__required">*</span>
                            </span>
                            <Options files={files} instance={[]} />
                        </label>

                        <label className="control control--insta" htmlFor="igmain">
                            <span>
                                Coach instagram
                                <span className="control__required">*</span>
                            </span>
                            <input className="control__input" type="text" name="igmain" placeholder="Main gram" required/>
                            <input className="control__input" type="text" name="iglift" placeholder="Lift gram" required/>
                        </label>
                    </section>
                    <section className="cm-block__grid-content">
                        <label className="control" htmlFor="content">
                            <span>
                                Blok content
                                <span className="control__required">*</span>
                            </span>
                            <textarea className="control__input" name="content" rows="5" placeholder="Wat informatie over de coach" required/>
                        </label>
                    </section>
                    <section className="cm-block__grid-link">
                        <label className="control" htmlFor="link">
                            <span>
                                Link
                                <span className="control__required">*</span>
                            </span>
                            <input className="control__input" type="text" name="linkTitle" placeholder="Tekst op de button" required/>
                            <input className="control__input" type="text" name="link" placeholder="Link met een '#' of een '/'" required/>
                        </label> 
                    </section>
                    <section className="cm-block__grid-controls">
                        <p className="cm-block__notification cm-block__notification--new"></p>
                        <button className="cta" onClick={addCoach}>Coach toevoegen</button>
                        <button className="cta" onClick={e => form.reset(e.target.form)}>Reset formuliet</button>
                    </section>
                </section>
            </form> */}
        </section>

    </section>)

// return (<section className="infoblokken infoblokken--admin">
// {/* <svg className="icon icon--bin" viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg">
//     <path d="M25.0209 10.0084C25.0209 7.35399 26.0754 4.80832 27.9523 2.93139C29.8293 1.05445 32.3749 0 35.0293 0H65.0545C67.7088 0 70.2545 1.05445 72.1315 2.93139C74.0084 4.80832 75.0628 7.35399 75.0628 10.0084V20.0168H95.0796C96.4068 20.0168 97.6796 20.544 98.6181 21.4825C99.5566 22.4209 100.084 23.6938 100.084 25.0209C100.084 26.3481 99.5566 27.621 98.6181 28.5594C97.6796 29.4979 96.4068 30.0251 95.0796 30.0251H89.7301L85.3915 90.786C85.2118 93.311 84.0819 95.6742 82.2294 97.3994C80.377 99.1247 77.9396 100.084 75.4081 100.084H24.6707C22.1392 100.084 19.7018 99.1247 17.8494 97.3994C15.9969 95.6742 14.867 93.311 14.6873 90.786L10.3587 30.0251H5.00419C3.677 30.0251 2.40416 29.4979 1.46569 28.5594C0.527225 27.621 0 26.3481 0 25.0209C0 23.6938 0.527225 22.4209 1.46569 21.4825C2.40416 20.544 3.677 20.0168 5.00419 20.0168H25.0209V10.0084ZM35.0293 20.0168H65.0545V10.0084H35.0293V20.0168ZM20.3871 30.0251L24.6757 90.0754H75.4131L79.7017 30.0251H20.3871ZM40.0335 40.0335C41.3607 40.0335 42.6335 40.5607 43.572 41.4992C44.5105 42.4377 45.0377 43.7105 45.0377 45.0377V75.0628C45.0377 76.39 44.5105 77.6629 43.572 78.6013C42.6335 79.5398 41.3607 80.067 40.0335 80.067C38.7063 80.067 37.4335 79.5398 36.495 78.6013C35.5566 77.6629 35.0293 76.39 35.0293 75.0628V45.0377C35.0293 43.7105 35.5566 42.4377 36.495 41.4992C37.4335 40.5607 38.7063 40.0335 40.0335 40.0335ZM60.0503 40.0335C61.3775 40.0335 62.6503 40.5607 63.5888 41.4992C64.5272 42.4377 65.0545 43.7105 65.0545 45.0377V75.0628C65.0545 76.39 64.5272 77.6629 63.5888 78.6013C62.6503 79.5398 61.3775 80.067 60.0503 80.067C58.7231 80.067 57.4502 79.5398 56.5118 78.6013C55.5733 77.6629 55.0461 76.39 55.0461 75.0628V45.0377C55.0461 43.7105 55.5733 42.4377 56.5118 41.4992C57.4502 40.5607 58.7231 40.0335 60.0503 40.0335Z" />
// </svg> */}
    //     {infoSections} 
    //     <section>
    //         {/* <h3 className="title title--h3">Coach toevoegen</h3> */}
    //         <button className="cta" onClick={toggleModal}>Coach toevoegen</button>
    //         <button className="cta">Coach verwijderen</button>
    //     </section>
    //     <dialog className="infoblokken__modal infoblokken__modal--coach">
    //         <h3 className="title title--h3">Coach toevoegen</h3>
    //         
    //     </dialog>
    // </section>)
}

const container = document.querySelector('.coaches-container')

if(container){
    const root = createRoot(container);
    root.render(<Infoblokken />);
}

