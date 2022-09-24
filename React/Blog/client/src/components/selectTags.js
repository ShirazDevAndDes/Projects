import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectTags({ getTags, setTags }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  async function getOptions() {
    const tagOptions = await axios
      .post(process.env.REACT_APP_SERVER_BASE + "showTag")
      .then((response) => {
        const res = response.data;
        let tags = [];
        res.forEach((tag) => {
          tags.push({
            value: tag.tagName,
            label: tag.tagName,
          });
          // console.log(tag.tagName);
        });
        return tags;
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
      });
    setOptions(tagOptions);
  }

  // Getting options from database
  useEffect(() => {
    getOptions();
  }, []);

  return (
    <Select value={setTags} onChange={getTags} options={options} isMulti />
  );
}
