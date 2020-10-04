import React, {useState, useEffect} from 'react';
import { fs } from '../firebase';

const LinksForm = (props) => {

    const initialStateValues = {
        url: "",
        name: "",
        description: "",
    };

const [values, setValues] = useState(initialStateValues)

const handleInputChange = (e) => {
    const {name, value} =e.target;
    setValues({...values, [name]: value})
};

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({...initialStateValues})
    }

    const getLinkById = async (id) => {
        const doc = await fs.collection('links').doc(id).get();
        setValues({...doc.data()})
    }

useEffect(() => {
    if (props.currentId === '') {
        setValues({...initialStateValues})
    } else {
        getLinkById(props.currentId)
    }
}, [props.currentId])


    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                type="text"
                className="form-control"
                placeholder="https://someurl.com"
                name="url"
                onChange={handleInputChange}
                value={values.url}
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input 
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Website name"
                    onChange={handleInputChange}
                    value={values.name}
                    />
            </div>
            <div className="form-group">
                <textarea 
                className="form-control" 
                name="description" 
                rows="3"
                placeholder="Brief description of the webpage"
                onChange={handleInputChange}
                value={values.description}
                ></textarea>
            </div>

            <div>
                <button className="btn btn-primary btn-block">
                    {props.currentId === '' ? 'Save' : ('Update')}
                </button>
            </div>
        </form>

    )

}

export default LinksForm