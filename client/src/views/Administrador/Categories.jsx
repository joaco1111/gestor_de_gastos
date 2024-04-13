import { Box } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCategoriesStore } from "../../store/categories";
import { getCategoryIncome, getCategoryExpense} from "../../redux/actions";
import Modal from "../../components/Modals/ModalHome";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from 'yup';

const Categories = () => {
    const dispatch = useDispatch();

    //Estados Locales que manejan los selects y el input
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryDos, setSelectedCategoryDos] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    //Estado Local para mostrar el Modal
    const [showModal, setShowModal] = useState(false);

    //Estado Global zustand
    const createCategory = useCategoriesStore(state => state.createCategory);
    const deleteCategory = useCategoriesStore(state => state.deleteCategory);
    //const deletedCategory = useCategoriesStore(state => state.deletedCategory);

    //Estado Global redux
    const categorieExpense = useSelector(state => state.categorieExpense);
    const categorieIncome = useSelector(state => state.categorieIncome);

    useEffect(() => {
        dispatch(getCategoryExpense());
        dispatch(getCategoryIncome());
    }, [dispatch]);

    //CREAR CATEGORIAS
    const handleCategoriesType = (event) => {
        const categoryType = event.target.value;
        setSelectedCategory(categoryType);
    };

    const handleInputChange = (event) => {
        const categoryName = event.target.value;
        console.log(categoryName);
        setCategoryName(categoryName);
    };

    const handleClickCreate = async() => {
        const category = {
            name: categoryName
        };
        if(selectedCategory && category.name) {
            await createCategory(selectedCategory, category);
        }
        await Promise.all([                                                                //Esto se ejecuta hasta que todas las propesas anteriores se resuelvan
            dispatch(getCategoryExpense()),
            dispatch(getCategoryIncome())
        ]);
        setCategoryName('');
        setSelectedCategory('');
        setShowModal(true);
    };

    //ELIMINAR CATEGORIAS
    const handleCategoriesIncomes = (event) => {
        console.log(event.target.value);
        setCategoryId(event.target.value);
    };

    const handleCategoriesExpenses = (event) => {
        console.log(event.target.value);
        setCategoryId(event.target.value);
    };

    const handleClickDelete = async() => {
        try {
            if(selectedCategoryDos && categoryId) {
                await deleteCategory(selectedCategoryDos, categoryId);
            }
            await Promise.all([                                                            //Esto se ejecuta hasta que todas las propesas anteriores se resuelvan
                dispatch(getCategoryExpense()),
                dispatch(getCategoryIncome())
            ]);
            setCategoryId('');
            setSelectedCategoryDos('');
            setShowModal(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCategoriesTypeDos = (event) => {
        console.log(event.target.value);
        setSelectedCategoryDos(event.target.value);
    };

    //VALIDACIONES
    // const validationSchemaCreate = Yup.object().shape({
    //       categoryName: Yup.string().required('El nombre de la categoría es obligatorio'),
    //       selectCategoryType: Yup.string().required('Debes seleccionar el tipo de categoría')
    // });

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="CATEGORIAS" subtitle="Agregar Categorías" />
            </Box>

            <div className='container'>
                <Form className="d-flex align-items-end" role="submit">                                       

                    <Form.Group className="me-3 mb-3">
                        <Form.Control className="form-control my-2" placeholder='Agregar categoría...' type='text' onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="me-3 mb-4">
                        <label htmlFor="selectCategoryType" className="form-label">Tipo de categoría</label>
                        <select className="form-select" id="selectCategoryType" name="selectCategoryType" onChange={handleCategoriesType}>
                            <option value="">Seleccionar</option>
                            <option value="income">Ingresos</option>
                            <option value="bill">Gastos</option>
                        </select>
                    </Form.Group>

                    <Button onClick={handleClickCreate} disabled={!selectedCategory || !categoryName}>
                        CREAR CATEGORIA
                    </Button>

                </Form>
            </div>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header subtitle="Eliminar Categorías" />
            </Box>

            <div className='container'>
                <Form className="d-flex align-items-end" role="submit">                                            

                    <Form.Group className="me-3 mb-4">
                        <label htmlFor="selectCategoryType" className="form-label">Tipo de categoría</label>
                        <select className="form-select" id="selectCategoryType" name="selectCategoryType" onChange={handleCategoriesTypeDos}>
                            <option value="">Seleccionar</option>
                            <option value="income">Ingresos</option>
                            <option value="bill">Gastos</option>
                        </select>
                    </Form.Group>

                    {selectedCategoryDos === 'income' ?                     
                    <Form.Group className="me-3 mb-4">
                        <label htmlFor="selectCategoryType" className="form-label">Categoría de ingresos</label>
                        <select className="form-select" id="selectCategoryType" name="selectCategoryType" onChange={handleCategoriesIncomes}>
                            <option key='' value=''>Seleccionar</option>
                            {categorieIncome.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </Form.Group> : selectedCategoryDos === 'bill' ?
                    <Form.Group className="me-3 mb-4">
                        <label htmlFor="selectCategoryType" className="form-label">Categoría de gastos</label>
                        <select className="form-select" id="selectCategoryType" name="selectCategoryType" onChange={handleCategoriesExpenses}>
                            <option key='' value=''>Seleccionar</option>
                            {categorieExpense.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </Form.Group> : null}

                    <Button onClick={handleClickDelete} disabled={!selectedCategoryDos || !categoryId}>
                        ELIMINAR CATEGORIA
                    </Button>

                </Form>
            </div>
            <Modal show={showModal} handleClose={() => setShowModal(false)} />
        </Box>
    )
};

export default Categories;