import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./createSavingPlan.css";

const CreateSaving = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/saving');
      };

  return (
    <div>
        <button onClick={handleCreate} className="btn btn-create mb-2">Add more saving plan</button>
    </div>
  );
};

export default CreateSaving;
