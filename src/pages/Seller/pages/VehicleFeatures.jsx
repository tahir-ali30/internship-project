import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useVehicleFeatures from "../hooks/useVehicleFeatures";
import { url } from "../../../api/routes";
import { postData } from "../../../lib/useAxiosWithAuth";
import { Checkbox } from "primereact/checkbox";
import Loading from "../../../components/Loading";
import { FormWrapper } from "../components/FormComponents";

export default function VehicleFeatures() {
  const { id } = useParams();
  const { features, featureChange, isLoading } = useVehicleFeatures(id);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await postData(url + "seller/vehicle/features", { id, ...features });
    navigate("/dashboard/seller/vehicle");
  }

  return (
    <FormWrapper
      link={"/dashboard/seller/vehicle"}
      back={true}
      label={"Select Features"}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={`grid grid-cols-6 gap-5 p-4`}>
            {showMoreFeatures ? (
              <FeaturesCheckboxes
                features={features}
                featureChange={featureChange}
              />
            ) : (
              <FeaturesCheckboxes
                features={Object.fromEntries(
                  Object.entries(features).slice(0, 18)
                )}
                featureChange={featureChange}
              />
            )}
          </div>
          {!showMoreFeatures && (
            <button
              onClick={() => setShowMoreFeatures(true)}
              className="text-blue-400 block p-4"
            >
              See more
            </button>
          )}
        </>
      )}
      <div className="flex justify-end px-5 py-2">
        <button
          onClick={(e) => handleSubmit(e)}
          className="py-3 px-5 m-2 bg-primary text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </FormWrapper>
  );
}

function FeaturesCheckboxes({ features, featureChange }) {
  return (
    <>
      {Object.keys(features).map((feature, index) => (
        <div key={index} className="flex items-center gap-2 truncate">
          <input
            type="checkbox"
            name={feature}
            id={feature}
            checked={features[feature]}
            onChange={() => featureChange(feature)}
          />
          <label htmlFor={feature}>
            {(feature[0].toUpperCase() + feature.slice(1)).replace(/_/g, " ")}
          </label>
        </div>
      ))}
    </>
  );
}
