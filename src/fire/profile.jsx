import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';  
import { db } from "../config"; 
import { useState } from "react";

function Profile() {
    const auth = getAuth();
    const Navig = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");
    const [profession, setProfession] = useState("");  
    const [nation, setNation] = useState("");  

    function fn() {
        signOut(auth).then(() => {
            Navig("/signin");
            alert("Sign-Out Successfully");
        }).catch((error) => {
            console.error("Error during sign-out: ", error);
        });
    }

    // Check if a user is authenticated
    onAuthStateChanged(auth, (user) => {
        if (user) {
            getDocs(collection(db, "user"))
            .then((querySnapshot) => {
                let found = false;

                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.email === user.email) {
                        found = true;
                        setName(userData.name);
                        setEmail(userData.email);
                        setAge(userData.age);
                        setDob(userData.dob);
                        setNation(userData.nation);
                        setProfession(userData.profession);
                    }
                });

                if (!found) {
                    console.log("No matching user found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching documents: ", error);
            });
        } else {
            Navig("signin");
        }
    });

    return (
        <div className="container mt-4">

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-center ">
                            <h4 className="card-title col-4">User Profile</h4>
                            </div>
                            <h1 className="card-text"><strong>Name:</strong> {name}</h1>
                            <h5 className="card-text"><strong>Email:</strong> {email}</h5>
                            <h5 className="card-text"><strong>Age:</strong> {age}</h5>
                            <h5 className="card-text"><strong>Nationality:</strong> {nation}</h5>
                            <h5 className="card-text"><strong>Profession:</strong> {profession}</h5>
                            <h5 className="card-text"><strong>Date Of Birth:</strong> {dob}</h5>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary" onClick={fn}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
