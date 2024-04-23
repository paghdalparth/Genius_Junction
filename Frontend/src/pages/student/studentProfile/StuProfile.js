import React from 'react'
import { useRef, useState, useEffect } from 'react';
import './StuProfile.css'
import { Link } from 'react-router-dom';
import Navbar from '../Dashboard/Sidebar/Sidebar'
import { Navigate } from 'react-router-dom';
import getToken from '../../../services/getToken';
import { getStudentProfile } from '../../../services/Apis';
import LoadingComponent from './../../Loading/Loading'

const StuProfile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);

    console.log(profile)

    const token = getToken('student');
    

    // location.reload();

    useEffect(() => {
        // window.location.reload(true);
        const fetchData = async () => {
            try {
                if (token) {
                    const [profile] = await Promise.all([
                        getStudentProfile()
                    ]);
                    setProfile(profile);
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!token) {
        return <Navigate to="/student/login" />;
    }

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const currentDate = new Date();

        let ageDiff = currentDate.getFullYear() - birthDate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() < birthDate.getDate())
        ) {
            ageDiff--;
        }

        return ageDiff;
    };

    return (

        <div className='spn-container1'>

            <Navbar />
            <div className='spn-profile'>

                <div className='spn-upper'>

                    <div className='spn-sub-upper'>

                        <div className='spn-image-container1'>
                            <div className='spn-img1'>
                                {profile?.profilePic ? <img src={`https://common-ground-9kqv.onrender.com/${profile?.profilePic?.split('/').pop()}`} alt="" />
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image' />
                                }
                            </div>
                        </div>

                        <div className='spn-user'>
                            <div className='spn-username1'>
                                <div>{profile?.username}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='spn-lover'>

                    <div className='spn-basicinfo'>

                        <div className='spn-basic-heading'>Basic Info</div>

                        <div className='spn-Sub-basicinfo'>

                            <div className='spn-info-main'>
                                <div className='spn-info-submain'>Name</div>
                                <div className='spn-info-submain'>Gender</div>
                                {/* <div className='spn-info-submain'>Country</div> */}
                                <div className='spn-info-submain'>Age</div>
                                {/* <div className='spn-info-submain'>Education Level</div> */}
                                <div className='spn-info-submain'>Email</div>
                                <div className='spn-info-submain'>Phone</div>
                            </div>

                            <div className='spn-personalinfo'>
                                <div className='spn-info-submain'>
                                    <div>{profile?.fname} {profile?.lname}</div>
                                </div>

                                <div className='spn-info-submain'>
                                    <div >{profile?.gender}</div>
                                </div>

                                {/* <div className='spn-info-submain'>
                                    <div >{profile?.location}</div>
                                </div> */}

                                <div className='spn-info-submain'>
                                    <div >{calculateAge(profile?.dob)} year</div>
                                </div>

                                {/* <div className='spn-info-submain'>
                                    
                                    {about.map( Sahil => (
                                        <div className='spn-email1'>{Sahil.Degree}</div>
                                        ))}
                                </div> */}

                                <div className='spn-info-submain'>
                                    <div className='spn-email1'>{profile?.email}</div>
                                </div>

                                <div className='spn-info-submain'>
                                    <div className='spn-mo-number1'>{profile?.phone}</div>
                                </div>

                            </div>

                        </div>

                        <Link to={'/student/update'} className='spn-edit-button'>Edit Profile</Link>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default StuProfile
