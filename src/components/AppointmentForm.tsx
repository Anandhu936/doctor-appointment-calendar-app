import React, { useEffect, useState } from 'react';

const patients = ['Anjali', 'Anagha', 'Anna'];
const doctors = ['Dr. Raj', 'Dr. Maya', 'Dr. Thomas'];
const appointmentTimes = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '13:00 PM', '13:30 PM', '14:00 PM', '14:30 PM', '15:00 PM', '15:30 PM',
    '16:00 PM'
];
interface AppointmentFormProps {
    date: string;
    onSave: (date: string, data: { patient: string; doctor: string; time: string }) => void;
    initialData?: { patient: string; doctor: string; time: string } | null;
}

const AppointmentForm = ({ date, onSave, initialData }: AppointmentFormProps) => {
    const [patient, setPatient] = useState(patients[0]);
    const [doctor, setDoctor] = useState(doctors[0]);
    const [time, setTime] = useState('');

    useEffect(() => {
        if (initialData) {
            setPatient(initialData.patient);
            setDoctor(initialData.doctor);
            setTime(initialData.time);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!time) return alert('Please select a time');
        onSave(date, { patient, doctor, time });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">{initialData ? 'Edit' : 'Add'} Appointment for {date}</h3>
            <div className="mb-2">
                <label className="block">Patient:</label>
                <select value={patient} onChange={(e) => setPatient(e.target.value)} className="w-full border p-1">
                    {patients.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="block">Doctor:</label>
                <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full border p-1">
                    {doctors.map((d) => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="block">Time:</label>
                <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border p-1">
                    <option value="">Select a time</option>
                    {appointmentTimes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded mt-2">
                {initialData ? 'Update' : 'Save'}
            </button>
        </form>
    );
};

export default AppointmentForm;