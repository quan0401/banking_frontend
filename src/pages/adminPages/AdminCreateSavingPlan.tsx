import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CircularPageLoader from "@shared/CircularPageLoader";
import { FaPencilAlt } from "react-icons/fa";
import SavingPlanCard from "@components/SavingPlanCard";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import DatePicker from "react-datepicker";
import { generateColorList } from "@utils/graph-utils.service";
import { SketchPicker } from "react-color";
import Button from "@shared/button/Button";
import isEqual from "react-fast-compare";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import { useAppDispatch } from "@redux/store";
import { addSavingPlans } from "@redux/reducers/savingPlan.reducer";
import { showSuccessToast } from "@utils/utils.service";
import { NavigateFunction, useNavigate } from "react-router-dom";

const colors = generateColorList(100);

const emptySavingPlan: ISavingPlanDocument = {
  // termPeriod: 0,
  // minimumBalance: 0,
  // maximumBalance: 0,
  // minimumEachTransaction: 0,
  // maximumEachTransaction: 1000000,
  // interestRate: 0,
  // interestRateBeforeDueDate: 0,
  // title: "Title",
  // description: "Description",
  // basicDescription: "basicDescription",
  // isActive: 1,
  // startDate: new Date(),
  // endDate: new Date(),
  // currency: "VND",
  // image: colors[0],
  termPeriod: 0,
  minimumBalance: 50000,
  maximumBalance: 50000000,
  minimumEachTransaction: 50000,
  maximumEachTransaction: 1000000,
  interestRate: 9,
  interestRateBeforeDueDate: 1,
  title: "High Interest Saving",
  description: "High Interest Saving Plan for everyone",
  basicDescription: "High Interest ",
  isActive: 1,
  startDate: new Date(),
  endDate: new Date(),
  currency: "VND",
  image: colors[0],
};

const AdminCreateSavingPlan: React.FC = () => {
  const [savingPlan, setSavingPlan] =
    useState<ISavingPlanDocument>(emptySavingPlan);
  const [edit, setEdit] = useState<boolean>(false);
  const [_, setIsLoading] = useState<boolean>(false);
  const [infoHasChanged, setInfoHasChanged] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Add your save logic here
    try {
      const res = await savingPlanService.create(savingPlan);
      const {
        data: { savingPlans },
      } = await savingPlanService.getAll();
      dispatch(addSavingPlans({ savingPlans }));
      showSuccessToast(res.data.message);
      navigate("/admin");
    } catch (error) {
      console.log("error", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    savingPlanService
      .getAll()
      .then((res) => {
        const savingPlans: ISavingPlanDocument[] = res.data.savingPlans;
        dispatch(addSavingPlans({ savingPlans }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  const handleInputChange = (event: ChangeEvent) => {
    const { name, value, type } = event.target as HTMLInputElement;

    let inputValue: Date | string | number = value;
    if (type === "date") {
      inputValue = new Date(inputValue);
    } else if (type === "number") {
    }

    setSavingPlan((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? (value === "1" ? 1 : 0) : inputValue,
    }));
    setInfoHasChanged(true);
  };

  const handleDateChange = (date: Date, key: string) => {
    setSavingPlan((prevState) => ({
      ...prevState,
      [key]: date,
    }));
  };
  const handleEditToggle = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  useEffect(() => {
    const hasChanged = !isEqual(emptySavingPlan, savingPlan);
    if (hasChanged) {
      setInfoHasChanged(true);
    }
  }, [savingPlan]);

  return (
    <div>
      {!true ? (
        <CircularPageLoader />
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Saving Plan
          </h1>

          <div className="lg:flex p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="lg:w-1/2 relative mb-4">
              <SavingPlanCard savingPlan={savingPlan} />
            </div>
            <div className="lg:w-1/2 lg:pl-6">
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(emptySavingPlan).map((key: string) => {
                    const type = typeof emptySavingPlan[key];
                    let inputType = "text";
                    let inputValue = savingPlan[key];

                    if (type === "number") {
                      inputType = "number";
                    } else if (
                      type === "object" &&
                      inputValue instanceof Date
                    ) {
                      inputType = "date";
                      inputValue = inputValue.toISOString().split("T")[0];
                    }

                    if (key === "image") {
                      return (
                        <div key={key}>
                          <Button
                            type="button"
                            label="Choose color"
                            className="btn btn--secondary my-4"
                            onClick={() => setShowColorPicker((prev) => !prev)}
                          />
                          {showColorPicker && (
                            <SketchPicker
                              color={savingPlan.image}
                              onChange={(color) => {
                                setSavingPlan((prevState) => ({
                                  ...prevState,
                                  image: color.hex,
                                }));
                              }}
                            />
                          )}
                        </div>
                      );
                    }

                    return (
                      <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="field-label">
                          {key} {key === "termPeriod" && "(month)"}
                        </label>
                        {type === "object" ? (
                          <DatePicker
                            selected={savingPlan[key] as Date}
                            className="field-input"
                            onChange={(date) =>
                              handleDateChange(date as Date, key)
                            }
                            dateFormat="dd/MM/yyyy"
                          />
                        ) : (
                          <input
                            className="field-input"
                            type={inputType}
                            name={key}
                            value={savingPlan[key]}
                            onChange={handleInputChange}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleEditToggle}
                    className={`right-2 btn btn--primary`}
                    type="submit"
                    disabled={!infoHasChanged}
                  >
                    <FaPencilAlt className="inline-block mr-2" />
                    {edit ? "Create" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreateSavingPlan;
