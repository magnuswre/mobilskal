import React, { Children, useEffect, useState } from "react";
import axios from "axios";

const getAll = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8085/api/v1/phonecases/get/all"
        );
        console.log(result.data);
        setData([result.data]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);

    // Get the models for the selected brand
    const brandData = data.find((item) =>
      Object.keys(item).includes(e.target.value)
    );
    const models = brandData
      ? Object.keys(brandData[e.target.value].models)
      : [];

    setSelectedModel(models[0] || null); // Set the first model as the selected model
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <>
      <div className="brands">
        <h2>Available brands:</h2>
        <select onChange={handleBrandChange}>
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
          <select onChange={handleModelChange}>
            {Object.keys(
              data.find((item) => Object.keys(item).includes(selectedBrand))[
                selectedBrand
              ].models
            ).map((model, i) => (
              <option key={i} value={model}>
                {model}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default getAll;

