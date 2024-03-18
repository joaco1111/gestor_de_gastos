import React, { useState } from 'react';
import ExpenseForm from '../../components/Expense/ExpenseForm';
import IncomeForm from '../../components/Income/IncomeForm';
import PieChartsExpense from '../../components/Charts/PieChartsExpense';
import PieChartsIncome from '../../components/Charts/PieChartsIncome';
import style from './Home.module.css';
import NavBar from '../../components/NavBar/NavBar';
import { Pagination } from 'react-bootstrap';

const Home = () => {
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        // Aquí puedes implementar la lógica para cargar los datos de la página correspondiente, si es necesario
    };

    return (
        <div className={style.homeContainer}>
            <NavBar />
            <h1>Home</h1>
            <div className={style.formSection}>
                <ExpenseForm />
                <IncomeForm />
            </div>
            <div className={style.chartSection}>
                <PieChartsExpense />
                <PieChartsIncome />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item onClick={() => handlePageChange(1)} active={activePage === 1}>{1}</Pagination.Item>
                    <Pagination.Item onClick={() => handlePageChange(2)}>{2}</Pagination.Item>
                    <Pagination.Item onClick={() => handlePageChange(3)}>{3}</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
            </div>
        </div>
    );
};

export default Home;
