import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AllDoctors } from "../../Components/doctor";
import List from "../../Components/departmentList";
import '../../Styles/client/allDoctors.css';
import "../../Styles/client/landing.css";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const initialCategory = params.get("category") || '';
        setSelectedCategory(initialCategory);
    }, [location.search]);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('https://consulto.onrender.com/doctors');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setDoctors(data);
            setFilteredDoctors(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        const filtered = doctors.filter(doctor => {
            const matchesCategory = selectedCategory ? doctor.department === selectedCategory : true;
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setFilteredDoctors(filtered);
    }, [selectedCategory, searchTerm, doctors]);

    return (
        <div className="AlldoctorsContainer">
            <input
                className="inputSearch"
                type="search"
                placeholder="Search Doctor or Category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="doctorList">
                <div className="listContainer">
                    <List onCategoryClick={setSelectedCategory} />
                </div>
                <div className="doctorsContainer">
                    <AllDoctors doctors={filteredDoctors} />
                </div>
            </div>
        </div>
    );
};

export default Doctors;
