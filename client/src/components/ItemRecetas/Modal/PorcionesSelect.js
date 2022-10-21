import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./PorcionesSelect.css";

const PorcionesSelect = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    porciones: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div>
      <div>
        <div>
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchText"
          >{`${options.porciones} PORCIONES  `}</span>
          {!openOptions && (
            <div>
              <div className="options">
                <div className="optionCounter">
                  <button
                    disabled={options.porciones <= 1}
                    onClick={() => handleOption("porciones", "d")}
                    className="optionCounterButton"
                  >
                    -
                  </button>
                  <span className="optionCounter">{options.porciones}</span>
                  <button
                    onClick={() => handleOption("porciones", "i")}
                    className="optionCounterButton"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PorcionesSelect;
