import React from 'react';

import {Image} from '../../components/image/image'
import {Options} from '../../components/optionlist/optionlist'

import {popUp} from '../../popup/popup'


export const CM_Block = (props) => {
    const dataValue = props.instance.name ? props.instance.name : "New";
    const dataId = props.instance._id ? props.instance._id : "New";
    const dataName = props.instance.name ? props.instance.name : "new";
    
    const method = props.instance._id ? "id" : "new";

    const defaultVal = (value) => {
        return value ? value : null
    }

    // console.log(props.instance)

    return (
        <form className="cm-block" method="POST" data-value={dataValue} aria-disabled={props.disabled} key={dataId}>
            <input type="hidden" name={method} value={dataId} required/>
                <section className="cm-block__grid">
                        <section className="cm-block__grid-img">
                        {props?.instance?.image
                            ? <Image files={props.files} instance={props?.instance} />
                            : <h1 className="title title--h1">NEW</h1>
                        }
                        </section>
                        <section className="cm-block__grid-info">
                            <label className="control" htmlFor="name">
                                <span>
                                    Coach naam
                                    <span className="control__required">*</span>
                                </span>
                                <input className="control__input" type="text" name="name" defaultValue={defaultVal(props.instance.name)} placeholder="Alleen voornaam" required/>
                            </label>
                            <label className="control" htmlFor="image">
                                <span>
                                    Coach image
                                    <span className="control__required">*</span>
                                </span>
                                {props?.instance?.image
                                    ? <Options files={props.files} instance={props.instance} />
                                    : <p>options</p>
                                }
                            </label>

                            <label className="control control--insta" htmlFor="igmain">
                                <span>
                                    Coach instagram
                                    <span className="control__required">*</span>
                                </span>
                                <input className="control__input" type="text" name="igmain" defaultValue={defaultVal(props?.instance?.ig ? props?.instance?.ig[0] : null)} placeholder="igmain" required/>
                                <input className="control__input" type="text" name="iglift" defaultValue={defaultVal(props?.instance?.ig ? props?.instance?.ig[1] : null)} placeholder="iglift" required/>
                            </label>
                        </section>
                        <section className="cm-block__grid-content">
                            <label className="control" htmlFor="content">
                                <span>
                                    Blok content
                                    <span className="control__required">*</span>
                                </span>
                                <textarea className="control__input" name="content" rows="5" defaultValue={defaultVal(props.instance?.content)} placeholder="Wat informatie over de coach" required/>
                            </label>
                        </section>
                        <section className="cm-block__grid-link">
                            <label className="control" htmlFor="link">
                                <span>
                                    Link
                                    <span className="control__required">*</span>
                                </span>
                                <input className="control__input" type="text" name="linkTitle" defaultValue={defaultVal(props.instance?.linkTitle)} placeholder="Tekst op de button" required/>
                                <input className="control__input" type="text" name="link" defaultValue={defaultVal(props.instance?.link)} placeholder="Link met een '#' of een '/'" required/>
                            </label> 
                        </section>
                        <section className="cm-block__grid-controls">
                            <p className={`cm-block__notification${dataName ? "--" + dataName :"--new"}`}>Changed ✅</p>
                            <button className="cta" onClick={props.submit} value="change" data-name={props.instance?.name}>Verander gegevens</button>
                            <button className="cta" onClick={props.next ? props.next : popUp} value="open" role="button" data-name={props.instance?.name}>Verwijder coach😧</button>
                        </section>
                        <section className="cm-block__grid-popup" data-name={props.instance?.name}>
                            <p>Weet je zeker dat je <span>{props.instance?.name}</span> wilt verwijderen</p>
                            <button onClick={popUp} value="close" data-name={props.instance?.name}>Annuleer</button>
                            <button onClick={popUp} value="remove" data-name={props.instance?.name}>Ja ik wil {props.instance?.name} verwijderen</button>
                        </section>
                    </section>
        </form>
    )
}