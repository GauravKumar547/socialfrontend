import React, { useContext, useState } from 'react';
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel
} from '@mui/icons-material';
import { AuthContext } from '@/context/AuthContext';
import clientApi from '@/network/network';
import storage from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import type { IApiResponse, IPost } from '@/types';
import userProfilePlaceholder from '@/assets/userprofile.svg';

const Share: React.FC = () => {
    const { user } = useContext(AuthContext) || {};
    const [file, setFile] = useState<File | null>(null);
    const [desc, setDesc] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!user?._id) return;

        setIsSubmitting(true);
        const newPost = {
            user_id: user._id,
            description: desc,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);

            try {
                const storageRef = ref(storage, `/images/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.error('Upload failed:', error);
                        setIsSubmitting(false);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            const postWithImage = { ...newPost, img: downloadURL };
                            await clientApi.post<IApiResponse<IPost>>('/posts', postWithImage);
                            setDesc('');
                            setFile(null);
                        } catch (error) {
                            console.error('Error uploading post:', error);
                        } finally {
                            setIsSubmitting(false);
                        }
                    }
                );
            } catch (error) {
                console.error('Error uploading file:', error);
                setIsSubmitting(false);
            }
        } else {
            try {
                await clientApi.post<IApiResponse<IPost>>('/posts', newPost);
                setDesc('');
            } catch (error) {
                console.error('Error creating post:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="w-full rounded-[10px] shadow-card">
            <div className="p-[10px]">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center">
                        <img
                            className="w-[50px] h-[50px] bg-gray-light rounded-full object-cover mr-[10px]"
                            src={user?.profilePicture || userProfilePlaceholder}
                            alt="Profile"
                        />
                        <input
                            placeholder={`What's on your mind, ${user?.username}?`}
                            className="border-none w-4/5 focus:outline-none"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <hr className="mx-5 my-5" />

                    {file && (
                        <div className="px-5 pb-[10px] pr-5 relative">
                            <img
                                className="w-full object-cover max-h-[300px]"
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                            />
                            <Cancel
                                className="absolute top-0 right-5 cursor-pointer opacity-70"
                                onClick={() => setFile(null)}
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex ml-5">
                            <label htmlFor="file" className="flex items-center mr-4 cursor-pointer">
                                <PermMedia className="text-lg mr-1" style={{ color: 'tomato' }} />
                                <span className="text-sm font-medium">Photo or Video</span>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </label>
                            <div className="flex items-center mr-4 cursor-pointer">
                                <Label className="text-lg mr-1" style={{ color: 'blue' }} />
                                <span className="text-sm font-medium">Tag</span>
                            </div>
                            <div className="flex items-center mr-4 cursor-pointer">
                                <Room className="text-lg mr-1" style={{ color: 'green' }} />
                                <span className="text-sm font-medium">Location</span>
                            </div>
                            <div className="flex items-center mr-4 cursor-pointer">
                                <EmojiEmotions className="text-lg mr-1" style={{ color: 'goldenrod' }} />
                                <span className="text-sm font-medium">Feelings</span>
                            </div>
                        </div>

                        <button
                            className="border-none py-2 px-2 text-center rounded-[5px] text-[13px] min-w-[35px] bg-green-600 font-medium mr-5 cursor-pointer text-white disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isSubmitting || (!desc.trim() && !file)}
                        >
                            {isSubmitting ? 'Sharing...' : 'Share'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Share; 