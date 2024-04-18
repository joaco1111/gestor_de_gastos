import { Box, Paper } from "@mui/material";
import { Form, Button, Container } from "react-bootstrap";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCategoriesStore } from "../../store/categories";
import { getCategoryIncome, getCategoryExpense} from "../../redux/actions";
import Modal from "../../components/Modals/ModalHome";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from 'yup';

const Categories = () => {
    const dispatch = useDispatch();

    //Estado Local para mostrar el Modal
    const [showModal, setShowModal] = useState(false);

    //Estado Global zustand
    const createCategory = useCategoriesStore(state => state.createCategory);
    const deleteCategory = useCategoriesStore(state => state.deleteCategory);
    const incomeError = useCategoriesStore(state => state.incomeError);
    const billError = useCategoriesStore(state => state.billError);
    const updateIncomeError = useCategoriesStore(state => state.updateIncomeError);
    const updateBillError = useCategoriesStore(state => state.updateBillError);

    //Estado Global redux
    const categorieExpense = useSelector(state => state.categorieExpense);
    const categorieIncome = useSelector(state => state.categorieIncome);

    useEffect(() => {
        dispatch(getCategoryExpense());
        dispatch(getCategoryIncome());
    }, [dispatch]);

    //CREAR CATEGORIAS
    const handleClickCreate = async(values) => {
        updateBillError();
        updateIncomeError();
        const category = {
            name: values.categoryName
        };
        if(values.selectCategoryType && category.name) {
            await createCategory(values.selectCategoryType, category);
            values.selectCategoryType = '';
            values.categoryName = '';
        }
        await Promise.all([                                                   //Se ejecuta hasta que todas las propesas anteriores se resuelvan
            dispatch(getCategoryExpense()),
            dispatch(getCategoryIncome())
        ]);
        setShowModal(true);
    };

    //ELIMINAR CATEGORIAS
    //Incomes 
    const handleClickDeleteIncome = async(values) => {
        try {
            updateBillError();
            updateIncomeError();
            if(values.selectCategoryIncome) {
                await deleteCategory('income', values.selectCategoryIncome);
                values.selectCategoryIncome = '';
            }
            await Promise.all([                                                            
                dispatch(getCategoryIncome())
            ]);
            setShowModal(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    //Bills
    const handleClickDeleteBill = async(values) => {
        try {
            updateBillError();
            updateIncomeError();
            if(values.selectCategoryBill) {
                await deleteCategory('bill', values.selectCategoryBill);
                values.selectCategoryBill = '';
            }
            await Promise.all([                                                            
                dispatch(getCategoryExpense()),
            ]);
            setShowModal(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    //VALIDACIONES
    const validationSchemaCreate = Yup.object().shape({
        categoryName: Yup.string().required('El nombre de la categoría es requerido'),
        selectCategoryType: Yup.string().required('El tipo de categoría es requerido')
    });
    const validationSchemaDeleteIncome = Yup.object().shape({
        selectCategoryIncome: Yup.string().required('La categoría de ingresos es requerida'),
    });
    const validationSchemaDeleteBill = Yup.object().shape({
        selectCategoryBill: Yup.string().required('La categoría de gastos es requerida'),
    });

    return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="CATEGORIES" subtitle="Edit categories"/>
        </Box>

        <Container style={{ marginBottom: '30px', paddingLeft: '15vh'}}>
            <Paper elevation={8} sx={{ p:5, borderRadius: 6}}>
            <Formik
                initialValues={{ categoryName: '', selectCategoryType: '' }}                // Define valores iniciales
                validationSchema={validationSchemaCreate}                                   // Aplica el esquema de validación Yup
                onSubmit={(values, { setSubmitting }) => {
                    handleClickCreate(values);
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit, isSubmitting, values, touched, errors }) => (
                    <Form onSubmit={handleSubmit} className="income-form" role="submit">                                       
                        <div><h2>Agregar Categorías</h2></div>
                        <Form.Group className="me-3 mb-3">
                            <Field name="categoryName">
                                    {({ field, form }) => (
                                        <div>
                                            <Form.Control {...field} className={`form-control  ${touched.categoryName && errors.categoryName && 'is-invalid'}`} placeholder='Agregar categoría...' type='text' />
                                            <ErrorMessage name="categoryName" component="div" className="text-danger" />
                                            {billError && <p className="text-danger">{billError}</p>}
                                            {incomeError && <p className="text-danger">{incomeError}</p>}
                                        </div>
                                    )}
                            </Field>
                        </Form.Group>
                
                        <Form.Group className="me-3 mb-4">
                            <label htmlFor="selectCategoryType" className="form-label">Tipo de categoría</label>
                            <Field as="select" className={`form-control  ${touched.selectCategoryType && errors.selectCategoryType && 'is-invalid'}`} id="selectCategoryType" name="selectCategoryType">
                                <option value="">Seleccionar</option>
                                <option value="income">Ingresos</option>
                                <option value="bill">Gastos</option>
                            </Field>
                            <ErrorMessage name="selectCategoryType" component="div" className="text-danger" />
                        </Form.Group>
                
                        <Button type="submit" disabled={isSubmitting}>
                            AGREGAR
                        </Button>
                    </Form>
                )}
            </Formik>
            </Paper>
        </Container>

        <Container style={{ marginBottom: '30px', paddingLeft: '15vh'}}>
            <Paper elevation={8} sx={{ p:5, borderRadius: 6}}>
            <Formik
                initialValues={{ selectCategoryIncome: '' }} 
                validationSchema={validationSchemaDeleteIncome} 
                onSubmit={(values, { setSubmitting }) => {
                    handleClickDeleteIncome(values);
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit, isSubmitting, values, touched, errors }) => (
                    <Form onSubmit={handleSubmit} className="income-form" role="submit">                                            
                        <div><h2>Eliminar Categorías (Ingresos)</h2></div>
                        <Form.Group className="me-3 mb-4">
                            <label htmlFor="selectCategoryIncome" className="form-label">Categoría de ingresos</label>
                            <Field as="select" className={`form-control  ${touched.selectCategoryIncome && errors.selectCategoryIncome && 'is-invalid'}`} id="selectCategoryIncome" name="selectCategoryIncome">
                                <option key='' value=''>Seleccionar</option>
                                {categorieIncome.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="selectCategoryIncome" component="div" className="text-danger" />
                        </Form.Group>
                    
                        <Button type="submit" disabled={isSubmitting}>
                            ELIMINAR
                        </Button>        
                    </Form>
                )}
            </Formik>
            </Paper>
        </Container>

        <Container style={{ marginBottom: '30px', paddingLeft: '15vh'}}>
            <Paper elevation={8} sx={{ p:5, borderRadius: 6}}>
            <Formik
                initialValues={{ selectCategoryBill: '' }} 
                validationSchema={validationSchemaDeleteBill}
                onSubmit={(values, { setSubmitting }) => {
                    handleClickDeleteBill(values);
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit, isSubmitting, values, touched, errors }) => (
                    <Form onSubmit={handleSubmit} className="income-form" role="submit">                                          
                        <div><h2>Eliminar Categorías (Gastos)</h2></div>
                        <Form.Group className="me-3 mb-4">
                            <label htmlFor="selectCategoryBill" className="form-label">Categoría de gastos</label>
                            <Field as="select" className={`form-control  ${touched.selectCategoryBill && errors.selectCategoryBill && 'is-invalid'}`} id="selectCategoryBill" name="selectCategoryBill">
                                <option key='' value=''>Seleccionar</option>
                                {categorieExpense.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="selectCategoryBill" component="div" className="text-danger" />
                        </Form.Group>
                    
                        <Button type="submit" disabled={isSubmitting}>
                            ELIMINAR
                        </Button>        
                    </Form>
                )}
            </Formik>
            </Paper>
        </Container>
        {!incomeError && !billError && (<Modal show={showModal} handleClose={() => setShowModal(false)} />)}
    </Box>
    )
};

export default Categories;