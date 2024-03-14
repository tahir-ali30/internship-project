import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useVehicleFeatures from '../hooks/useVehicleFeatures';
import { url } from '../../../api/routes';
import { postData } from '../../../lib/useAxiosWithAuth';

export default function VehicleFeatures() {
    const { id } = useParams();
    const { features, featureChange } = useVehicleFeatures(id);
    const [showMoreFeatures, setShowMoreFeatures] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(features);
        await postData(url + 'seller/vehicle/features', { id, ...features });
        navigate('/dashboard/seller/vehicle');
    }

    return (
        <main className='bg-white rounded-md'>
            <div className='flex justify-between items-center border-b pb-5 p-4'>
                <h1>Select Features</h1>
                <Link to={'/dashboard/seller/vehicle'} className='py-2 px-3 bg-primary text-white rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--lucide" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 19l-7-7l7-7m7 7H5"></path></svg>
                </Link>
            </div>
            {
                features &&
                <>
                    <div className={`grid grid-cols-6 gap-5 p-4`}>
                        {showMoreFeatures ? 
                            <FeaturesCheckboxes features={features} featureChange={featureChange} /> :
                            <FeaturesCheckboxes features={Object.fromEntries(
                                Object.entries(features).slice(0, 18)
                                )} featureChange={featureChange} />
                        }
                    </div>
                    {
                        !showMoreFeatures &&
                        <button
                                onClick={() => setShowMoreFeatures(true)}
                                className='text-blue-400 block p-4'>
                                See more
                            </button>
                    }
                </>
            }
            <div className='flex justify-end px-5 py-2'>
                <button
                    onClick={(e) => handleSubmit(e)}
                    className='py-3 px-5 m-2 bg-primary text-white rounded-md'>Submit</button>
            </div>
        </main>
    )
}

function FeaturesCheckboxes({features, featureChange}) {
    return <>
    {Object.keys(features).map((feature, index) => (
        <div key={index} className='flex items-center gap-2 truncate'>
            <input
                type="checkbox"
                name={feature}
                id={feature}
                checked={features[feature]}
                onChange={() => featureChange(feature)}
            />
            <label htmlFor={feature}>{(feature[0].toUpperCase() + feature.slice(1)).replace(/_/g, ' ')}</label>
        </div>
    ))}
    </>
}