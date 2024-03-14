import { useEffect, useState } from "react";
import { postData } from "../../../lib/useAxiosWithAuth";
import { url } from "../../../api/routes";

export default function useVehicleFeatures(id) {
    const [features, setFeatures] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        postData(url + 'seller/vehicle/info', { id: id }).then(data => {
            setFeatures(data.vehicle[0].features)
            setIsLoading(false);
        });
    }, []);

    function handleChange(name) {
        setFeatures({...features, [name]: !features[name]});
    }

    return { features, featureChange: handleChange, isLoading };
}