import React from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    let navigate = useNavigate();
    return (
        <HiArrowLeft onClick={()=> navigate(-1)}></HiArrowLeft>
    );
};

export default BackButton;