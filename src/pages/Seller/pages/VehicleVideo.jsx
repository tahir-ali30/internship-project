import React, { useState } from 'react'
import { FormWrapper } from '../components/FormComponents'

export default function VehicleVideo() {
    const [video, setVideo] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    return (
        <FormWrapper label={'Vehicle Video'} back={true} link={'/dashboard/seller/vehicle'}>
            <div className='space-y-5 flex flex-col items-center'>
                <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
                {video &&
                    <div>
                        <video
                            className='size-48'
                            autoPlay
                            muted
                            controls
                            src={URL.createObjectURL(video)} />
                    </div>
                }
            </div>

            <div className='space-y-5 flex flex-col items-center mt-10'>
                <input type="file" onChange={(e) => setThumbnail(e.currentTarget.files[0])} />
                {thumbnail &&
                    <div className='size-48'>
                        <img src={URL.createObjectURL(thumbnail)} />
                    </div>
                }
            </div>

        </FormWrapper>
  )
}
