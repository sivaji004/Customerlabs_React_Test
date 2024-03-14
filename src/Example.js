import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Offcanvas } from 'react-bootstrap';
import * as Yup from 'yup';
import swal from 'sweetalert';
function Example() {

    //    .....................validation.............................

    const formik = useFormik({
        initialValues: {
            name: '',
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),

        onSubmit: (values) => {
            handleSubmit(values)
        },
    });


    // ......................Offcanvas...................................

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    // ......................select filed list.........................................

    const [availableSchemas, setAvailableSchemas] = useState([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' }
    ]);

    // ......................Add new schema list..................................


    const [selectedAges, setSelectedAges] = useState([]);


    // ..........................Add new schema event.........................................

    const handleAddAge = () => {
        const selectedAgeValue = formik.values.add;
        const selectedAge = availableSchemas.find(schema => schema.value === selectedAgeValue);
        const isAlreadySelected = selectedAgeValue && !selectedAges.some(age => age[selectedAge.value]);
        if (isAlreadySelected) {
            setSelectedAges([...selectedAges, { [selectedAge.value]: selectedAge.label }]);
            formik.setFieldValue('add', '');
        } else {
            swal({
                title: "Element is already present in the array !",
                icon: "warning",
            });
        }
    };


    // .......................handleRemoved...................................................

    const handleRemoveAge = (index) => {
        const newAges = [...selectedAges];
        newAges.splice(index, 1);
        setSelectedAges(newAges);
    };


    // .......................handleSubmit........................................

          const handleSubmit=(values)=>{
            values.selectedAges = selectedAges;
            swal({
                title: "Submitted!",
                text: JSON.stringify(values, null, 2),
                icon: "success",
                buttons: true,
            });
          }



    return (
        <>
            <div className='schemas-sec'>
                <div className='container'>
                    <div className='schemas-button mt-5'>
                        <Button variant="outline-success schemas-graen" onClick={handleShow}>Save Segment</Button>
                        <Offcanvas
                            show={showOffcanvas}
                            onHide={handleClose}
                            placement="end"
                            className="custom-offcanvas"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Save Segment</Offcanvas.Title>
                            </Offcanvas.Header>
                            <form onSubmit={formik.handleSubmit}>
                                <Offcanvas.Body>
                                    <div className='schemas-form'>
                                        <div className='row'>
                                            <div className='col-lg-12 mb-4'>
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter the Name of the Segment</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Name of the segment"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.name}
                                                />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className="text-danger">{formik.errors.name}</div>
                                                ) : null}
                                            </div>
                                            <div className='col-lg-12 mb-2'>
                                                <div className='schemas-form-pragraph'>
                                                    <p>To save your segment, you need to add the schemas to build the query</p>
                                                </div>
                                            </div>
                                            <div className='col-lg-12 mb-2'>
                                                <div className='schemas-form-pragraph'>
                                                    <div class="product-live">
                                                        <span class="user-icon">●</span>
                                                        <a href="#">-User Traits</a>
                                                    </div>
                                                    <div class="product-live">
                                                        <span class="group-icon">●</span>
                                                        <a href="#">-Group Traits</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-12 mt-3'>
                                                {selectedAges.map((age, index) => (
                                                    <div key={index} className='row'>
                                                        <div className='col-lg-10 mb-4'>
                                                            <select
                                                                name=""
                                                                className="form-select"
                                                            >
                                                                <option value={Object.keys(age)[0]}>{Object.values(age)[0]}</option>
                                                            </select>
                                                        </div>
                                                        <div className='col-lg-2'>
                                                            <button type="button" className="removed-bnt" onClick={() => handleRemoveAge(index)}>
                                                                -
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='col-lg-10 mb-4'>
                                                <select
                                                    name="add"
                                                    className="form-select"
                                                    id="exampleFormControlSelect1"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.add}
                                                >
                                                    <option value="">Add schema to segment</option>
                                                    {availableSchemas.map((schema, index) => (
                                                        <option key={index} value={schema.value}>{schema.label}</option>
                                                    ))}
                                                </select>
                                                {formik.touched.add && formik.errors.add ? (
                                                    <div className="text-danger">{formik.errors.add}</div>
                                                ) : null}
                                            </div>
                                            <div className='col-lg-12 mb-4'>
                                                <button type="button" className="add-new-bnt" onClick={handleAddAge}>
                                                    + Add new schema
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Offcanvas.Body>
                                <div className='schemas-bnt'>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div class="d-flex gap-2">
                                                <button type="submit" className="btn btn-success schemas-graen">
                                                    Save the Segment
                                                </button>
                                                <button type="button" className="btn btn-outline-danger schemas-red" onClick={handleClose}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Offcanvas>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Example;
