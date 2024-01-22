import React, { useEffect, useState } from "react";
import axios from "axios";

const getIsActive = () => {
  const [data, setData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelsForSelectedBrand, setModelsForSelectedBrand] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8085/api/v1/phonecases/get/"
        );

        // Ensure that result.data is an array, if not convert it to an array
        const dataArray = Array.isArray(result.data) ? result.data : [result.data];

        setData(dataArray);
        console.log(dataArray)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
    
  }, []);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    console.log(brand)

    // Set models for the selected brand
    const models = data
    .flatMap(item => Object.entries(item))
    .find(([key]) => key === brand)?.[1] || {};
  const modelsArray = Object.keys(models).filter(key => key !== 'isActive');
    setModelsForSelectedBrand(modelsArray);
    console.log(modelsArray)
    setSelectedModel(null); // Reset selected model when brand changes
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <div>
      <h2>All brands and models (Active/Inactive brands)</h2>
      <div className="brands">
        <select onChange={handleBrandChange}>
          <option value="">Select Brand</option>
          {data &&
            data.map((item, index) =>
              Object.keys(item).map((brand, i) => (
                <option key={i} value={brand}>
                  {brand}
                </option>
              ))
            )}
        </select>
        {selectedBrand && (
          <div>
            {modelsForSelectedBrand.map((model, i) => (
              <p key={i}>{model}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default getIsActive;










