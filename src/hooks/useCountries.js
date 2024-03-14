import { useEffect, useState } from "react";
import { getData, postData } from '../lib/useAxios';
import { getCityRoute, getCountryRoute, getStateRoute } from "../api/routes";

export default function useCountries(countryId,stateId) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    function fetchCities(stateId) {
        postData(getCityRoute, { state_id: stateId }).then(data => setCities(data.city));
    };

    function fetchStates(countryId) {
        postData(getStateRoute, { country_id: countryId }).then(data => setStates(data.state));
    };

    useEffect(() => {
        getData(getCountryRoute).then(data => setCountries(data.country));
    }, []);

    useEffect(() => {
        if (countryId) {
            fetchStates(countryId)
        }
    }, [countryId]);
    
    useEffect(() => {
        if (stateId) {
            fetchCities(stateId);
        }
    }, [stateId]);

    return { countries, states, cities };
}