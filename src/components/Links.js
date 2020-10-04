import React, { useEffect, useState} from 'react'
import LinksForm from './LinksForm'
import {fs} from '../firebase'
import {toast} from 'react-toastify'

const Links = () => {
    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')

    const addOrEditLink = async (linkObject) => {
        if (currentId === '') {
            await fs.collection('links').doc().set(linkObject);
            toast('New link added', {type:'success'})    
        } else {
            fs.collection('links').doc(currentId).update(linkObject);
            toast('Link updated', {type: 'info'})
        }
    }

    const deleteLink = async (id) => {
        if (window.confirm("Are you sure do you want to delete this link?")) {
            await fs.collection('links').doc(id).delete();
            toast('Link deleted', {type: 'error'})
        }
    }


    const getLinks = () => {
    fs.collection('links').onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id})
        })
        setLinks(docs);
    })
}

useEffect(() => {
    getLinks();
}, [])

    return (
        <>
            <div className="col-md-4 p-2">
                <LinksForm {...{addOrEditLink, currentId, links}} />
            </div> 
            <div className="col-md-8 p-2">
                 {links.map((link) => (
                     <div className="card mb-1" key={link.id}>
                         <div className="card-body">
                             <div className="d-flex justify-content-between">
                             <h4>{link.name}</h4>
                             <div>
                             <i className="material-icons text-primary" onClick={() => setCurrentId(link.id)}>create</i>
                             <i className="material-icons text-danger" onClick={() => deleteLink(link.id)}>close</i>
                             </div>
                             </div>
                            <p> {link.description} </p>
                            <a href="{link.url}" target="_blank">Go to {link.name}</a>
                         </div>
                     </div>
                 ))}
            </div>
        </>
    )
}

export default Links