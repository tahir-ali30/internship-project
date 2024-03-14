import { useEffect, useState } from "react";
import { getData, postData } from "../../../lib/useAxios";
import { url } from "../../../api/routes";

export default function useVehicleMakeandModel(makeId) {
    const [make, setMake] = useState([]);
    const [model, setModel] = useState([]);

    useEffect(() => {
        getData(url + 'make').then(data => setMake(data.make));
    }, []);

    useEffect(() => {
        if (makeId)
            postData(url + 'model', { make_id: makeId }).then(data => setModel(data.model))
    }, [makeId]);

    return { make, model };
}