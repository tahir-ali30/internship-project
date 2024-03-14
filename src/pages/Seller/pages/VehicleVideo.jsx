import { useEffect } from 'react'
import { FormWrapper } from '../components/FormComponents'
import { postData } from '../../../lib/useAxiosWithAuth';
import { url } from '../../../api/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const MediaUrl = 'https://viewnshop-stuff.s3.ap-southeast-2.amazonaws.com/uploads/vehicle/';

export default function VehicleVideo() {
    const { id } = useParams();
    const { register, handleSubmit, watch, reset } = useForm();
    const [video, thumbnail] = watch(['video', 'thumbnail']);
    const navigate = useNavigate();

    useEffect(() => {
        postData(url + 'seller/vehicle/video/get', { id }).then(data => {
            reset(data.vehicle[0]);
        })
    }, []);

    async function onSubmit(data) {
        const token = JSON.parse(localStorage.getItem('auth')).token;
        let { video, thumbnail } = data;
        video = video instanceof FileList ? video[0] : video
        thumbnail = thumbnail instanceof FileList ? thumbnail[0] : thumbnail

        try {
            const toastID = toast.loading('Uploading Video and Thumbnail...');
            const { error, message } = (await axios.post(url + 'seller/vehicle/video/insert', { id, video, thumbnail }, {
                headers: {
                    Authorization: token,
                    "Content-Type": 'multipart/form-data'
                }
            })).data;

            if (!error) {
                toast.dismiss(toastID)
                toast.success('Upload Successful!');
                navigate(`/dashboard/seller/vehicle/${id}/features`);
            } else throw new Error(message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <FormWrapper label={'Vehicle Video'} back={true} link={'/dashboard/seller/vehicle'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-5 flex flex-col items-center'>
                    <input type="file" name='video' {...register('video')} />
                    {video?.length > 0 &&
                        <div className='size-48'>
                            <video
                                autoPlay
                                muted
                                controls
                                src={video instanceof FileList ? URL?.createObjectURL(video?.[0]) : `${MediaUrl}video/${video}`}
                            />
                        </div>
                    }
                </div>
                <div className='space-y-5 flex flex-col items-center mt-10'>
                    <input type="file" name='thumbnail' {...register('thumbnail')} />
                    {thumbnail?.length > 0 &&
                        <div className='size-48'>
                            <img
                                src={thumbnail instanceof FileList ? URL?.createObjectURL(thumbnail?.[0]) : `${MediaUrl}thumbnail/${thumbnail}`}
                            />
                        </div>
                    }
                </div>
                <button type='submit' className='bg-primary py-2 px-4 text-white rounded-md'>Submit</button>
            </form>
        </FormWrapper>
    )
}