import React, { useEffect, useState } from 'react'
import "./CourseHeader.css"
import Star from "./../../../Educator/EduOfferedCourses/stars"
import { FaCalendarDay, FaChalkboardTeacher, FaRupeeSign, FaUserFriends } from "react-icons/fa";
import RateCourseDialog from '../RateCourse';
import getToken from '../../../../services/getToken';
import { UnenrollInCourse, DeleteCourse, enrollInCourse } from '../../../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify';
import CertificateDownloadButton from '../../Certificate';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { edueditcoursefunction } from '../../../../services/Apis';
// fetch data from backend and display it here

const CourseHeader = ({ courseCode, courseTitle, courseDescriptionLong, createdBy, enrolledStudents, coursePrice, rating, dateCreated, isEnrolled, usertype, createdby }) => {
    const formattedDate = new Date(dateCreated).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });


    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(courseTitle);
    const [editedDescription, setEditedDescription] = useState(courseDescriptionLong);

    const {courseId} = useParams();

    const handleEditDialogOpen = () => {
        setIsEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditDialogOpen(false);
    };

    const handleSaveChanges = async () => {
        const editedData = {
            courseTitle: editedTitle,
            courseDescriptionLong: editedDescription,
        };

        try {
            const response = await edueditcoursefunction(editedData, courseId);
            console.log(response)
            if (response?.status === 200) {
                toast.success('Course details updated successfully');
                window.location.reload();
            } else {
                toast.error('Error updating course details');
            }
        } catch (error) {

            toast.error('Error updating course details');
        } finally {
            handleEditDialogClose();
        }
    };

    const navigate = useNavigate();

    const handleEnroll = async () => {
        const res = await enrollInCourse(courseId);

        if (res?.status === 200) {
            toast.success("You are Successfully enrolled.")
            window.location.reload();
        }
        else {
            toast.error("Error Enrolling in course.")
        }
    }


    const handleUnenroll = async () => {
        const res = await UnenrollInCourse(courseId);

        if (res?.status === 200) {
            toast.success("You are Successfully Unenrolled.")
            window.location.reload();
        }
        else {
            toast.error("Error Enrolling in course.")
        }
    }

    const hanleDeleteCourse = async () => {
        const res = await DeleteCourse(courseId);
        console.log(res)
        if (res?.status === 200) {
            toast.success("Course Deleted Successfully.")
            navigate('/educator/offered-courses')
        }
        else {
            toast.error("Error deleting the course. Pleasr try again!!")
        }
    }

    return (
        <div className="course-header">
            <div className="course-title">
                <h2>
                    {courseTitle}
                    {usertype === 'educator' && (
                        <Button variant="outlined" color="primary" onClick={handleEditDialogOpen}>
                            Edit
                        </Button>
                    )}
                </h2>
            </div>
            <div className="course-description">
                <h5>
                    {courseDescriptionLong}{''}
                </h5>

                <div className="student-button">
                    {
                        usertype === 'student' && !isEnrolled &&
                        <Button variant="contained" color="success" onClick={handleEnroll}>Enroll in the Course.</Button>
                    }
                    {
                        usertype === 'student' && isEnrolled &&
                        <Button variant="contained" color="error" onClick={handleUnenroll}>UnEnroll from this  the Course.</Button>
                    }
                    {
                        usertype === 'student' && isEnrolled &&
                        <RateCourseDialog />
                    }
                    {
                        usertype === 'student' && isEnrolled &&
                        <CertificateDownloadButton />
                    }
                    {
                        usertype === 'educator' && getToken('educator')?.userId === createdby &&
                        <Button variant="contained" color="error" onClick={hanleDeleteCourse}>Delete Course</Button>
                    }


                </div>



            </div>
            <div className="course-rating">
                <Star stars={rating} />
            </div>
            <div className="course-header-botttom ">
                <div className="course-instructor">
                    <FaChalkboardTeacher />
                    By {createdBy}
                </div>
                <div className="course-date">
                    <FaCalendarDay />
                    {/* have to change */}
                    {formattedDate}
                </div>
                <div className="course-enrolled-students">
                    <FaUserFriends />
                    {enrolledStudents} Students
                </div>
                <div className="course-enrolled-students">
                    <FaRupeeSign />
                    {/* have to change */}
                    {coursePrice}
                </div>

            </div>
            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Course Details</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Course Title"
                        fullWidth
                        variant="outlined"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Course Description"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CourseHeader
