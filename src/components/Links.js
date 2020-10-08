import React, { useEffect, useState} from 'react'
import LinksForm from './LinksForm'
import {fs} from '../firebase'
import {toast} from 'react-toastify'
import {Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Button} from 'reactstrap'



const Links = () => {
       const initialStateValues = {
            url: "",
            name: "",
            description: "",
        };
    
    const [values, setValues] = useState(initialStateValues)
    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [openModal, setopenModal] = useState(false)

    const addOrEditLink = async (linkObject) => {
        if (currentId === '') {
            await fs.collection('links').doc().set(linkObject);
            toast('New link added', {type:'success'})    
        } else {
            fs.collection('links').doc(currentId).update(linkObject);
            toast('Link updated', {type: 'info'})
        }
    }

    const modified = async (linkObject) => {
        await fs.collection('links').doc(currentId).update(linkObject)
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

const handleSubmit = (e) => {
    e.preventDefault();
}
const handleInputChange = (e) => {
    const {name, value} =e.target;
    setValues({...values, [name]: value})
};

const getLinkById = async (id) => {
    const doc = await fs.collection('links').doc(id).get();
    setValues({...doc.data()})
}
useEffect(() => {
    getLinks();
  if (currentId !== "" )  getLinkById(currentId);
}, [currentId])

const openModified = () => {
    setopenModal(!openModal)
}

    return (
        <>
            <div className="col-md-4 p-2">
                <LinksForm {...{addOrEditLink, currentId, links}} />
            </div> 
            <div className="col-md-8 p-2">
                 {links.map((link) => (
                     <div className="card mb-3" key={link.id}>
                         <div className="card-body">
                             <div className="d-flex justify-content-between">
                             <h4>{link.name}</h4>
                             <div>
                             <i className="material-icons text-primary" onClick={() => setCurrentId(link.id)}>create</i>
                             <i className="material-icons text-danger" onClick={() => deleteLink(link.id)}>close</i>
                             </div>
                             </div>
                            <p>{link.description} </p>
                            <a className="btn btn-sm btn-primary" href={link.url} target="_blank" rel="noopener noreferrer">Go to {link.name}</a>
                         </div>
                         <div>
                        <button className="btn btn-secondary" onClick={() => { openModified(); setCurrentId(link.id);}}>Modified</button>
                    </div>

                    <div>
                    
                    </div>

                     </div>
                     
                 ))}
                 

                 <Modal isOpen={openModal} onSubmit={handleSubmit}>
                        <ModalHeader>
                            <h2>What do you like to modified?</h2>                    
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <Label for="urlAdress">Url Address</Label>
                                <Input type="text" id="urlAddress" name="url" onChange={handleInputChange} value={values.url} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="websiteName">Website Name</Label>
                                <Input type="text" id="websiteName" name="name" onChange={handleInputChange} value={values.name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Url Address</Label>
                                <Input type="textarea" name="description" id="description" rows="3" placehorlder="Brief description of the page" onChange={handleInputChange} value={values.description}/>
                            </FormGroup>

                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={() => modified()} >Update</Button>
                            <Button color="secondary" onClick={() => openModified()}>Close</Button>
                         </ModalFooter>
                    </Modal>

            </div>
            
        </>
    )
}

export default Links