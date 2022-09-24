import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectCategories({ getCategories, setCategories }) {
  const [options, setOptions] = useState([]);

  async function getOptions() {
    const categoryOptions = await axios
      .post(process.env.REACT_APP_SERVER_BASE + "showCategory")
      .then((response) => {
        const res = response.data;
        let categories = [];
        res.forEach((category) => {
          categories.push({
            value: category.categoryName,
            label: category.categoryName,
          });
          // console.log(category.categoryName);
        });
        return categories;
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
      });
    setOptions(categoryOptions);
  }

  // Getting options from database
  useEffect(() => {
    getOptions();
  }, []);

  return (
    <Select
      value={setCategories}
      onChange={getCategories}
      options={options}
      isMulti
    />
  );
}
