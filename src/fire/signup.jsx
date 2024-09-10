import { auth, storage } from '../config';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions

import { useState } from "react";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");

    const [profession, setProfession] = useState("");  
    const [nation, setNation] = useState("");  
    const [image, setImage] = useState(null);  
    const [imageUrl, setImageUrl] = useState(""); 

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]); 
        }
    };
    const db = getFirestore();

    const uploadImage = async () => {
        if (image) {
            const storageRef = ref(storage, `images/${image.name}`); 
            try {
                const snapshot = await uploadBytes(storageRef, image); 
                const downloadUrl = await getDownloadURL(snapshot.ref); 
                setImageUrl(downloadUrl);
                console.log('Image uploaded successfully:', downloadUrl);

                ((url) => {
                setImageUrl(url)
                // console.log(url);
                
                    
                })

                return downloadUrl;
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Upload the image first
            await uploadImage();

            // Add user info to Firestore after the image is uploaded
            await addDoc(collection(db, "user"), {
                name,
                age,
                dob,
                email,
       
                profession,
                nation,
               imageUrl
            });

            // Create user in Firebase Auth
            await createUserWithEmailAndPassword(auth, email, pass);

            alert("Your Account is Created");

            // Reset form fields
            setName("");
            setEmail("");
            setPass("");
            setAge("");
            setDob("");
            setNationality("");
            setProfession("");  
            setImage(null);
            setImageUrl("");

        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-6 gap-6">
                            {/* Name */}
                            <div className="col-span-6">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            {/* Email */}
                            <div className="col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            {/* Password */}
                            <div className="col-span-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <input id="password" name="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            {/* Age */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                                <input id="age" name="age" type="text" value={age} onChange={(e) => setAge(e.target.value)} autoComplete="age" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            {/* Date of Birth */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
                                <input id="dob" name="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} autoComplete="dob" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            {/* Profession */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="profession" className="block text-sm font-medium leading-6 text-gray-900">Profession</label>
                                <select id="profession" name="profession" value={profession} onChange={(e) => setProfession(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Select Profession</option>
                                    <option value="Student">Student</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Professor">Professor</option>
                                </select>
                            </div>

                            {/* Nationality */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="nation" className="block text-sm font-medium leading-6 text-gray-900">Nationality</label>
                                <select id="nation" name="nation" value={nation} onChange={(e) => setNation(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Select Nationality</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="India">India</option>
                                    <option value="UK">UK</option>
                                    <option value="US">US</option>
                                </select>
                            </div>

                            {/* Image */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Upload Image</label>
                                <input type="file" onChange={handleImageChange} />
                            </div>

                            {/* Image Preview */}
                            {image && (
                                <div className="col-span-6 sm:col-span-3">
                                    <img src={URL.createObjectURL(image)} alt="Preview" className="mt-4 h-20 w-20 object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">Already a member? Sign in</p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
