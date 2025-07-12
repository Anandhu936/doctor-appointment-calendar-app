import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointmentForm from './AppointmentForm';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useNavigate } from 'react-router-dom';
dayjs.extend(isToday);

interface Appointment {
    patient: string;
    doctor: string;
    time: string;
}

interface AppointmentsByDate {
    [date: string]: Appointment[];
}

const CalendarPage = ({ onLogout }: { onLogout: () => void }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<AppointmentsByDate>(() => {
        const data = localStorage.getItem('appointments');
        return data ? JSON.parse(data) : {};
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    const handleAddAppointment = (date: string, data: Appointment) => {
        setAppointments((prev) => {
            const dayAppointments = [...(prev[date] || [])];
            if (editingIndex !== null) {
                dayAppointments[editingIndex] = data;
            } else {
                dayAppointments.push(data);
            }
            return { ...prev, [date]: dayAppointments };
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleDeleteAppointment = (date: string, index: number) => {
        setAppointments((prev) => {
            const updated = [...(prev[date] || [])];
            updated.splice(index, 1);
            return { ...prev, [date]: updated };
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        onLogout();
        navigate('/');
    };

    const dateStr = dayjs(selectedDate).format('YYYY-MM-DD');
    const selectedAppointments = appointments[dateStr] || [];
    const appointmentToEdit = editingIndex !== null ? selectedAppointments[editingIndex] : null;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-center w-full">Appointment Calendar</h2>

            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex justify-center">

                    <Calendar
                        className="!w-full !max-w-[600px]"
                        value={selectedDate}
                        onClickDay={(date) => {
                            setSelectedDate(date);
                            setShowForm(true);
                            setEditingIndex(null);
                        }}
                        tileContent={({ date }) => {
                            const dStr = dayjs(date).format('YYYY-MM-DD');
                            const dayAppointments = appointments[dStr] || [];
                            return (
                                <div className="text-xs text-green-400 space-y-1">
                                    {dayAppointments.map((appt, i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedDate(date);
                                                    setEditingIndex(i);
                                                    setShowForm(true);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {`${appt.patient} (${appt.time})`}
                                            </span>
                                            <button
                                                className="text-red-500 text-md ml-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteAppointment(dStr, i);
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    />

                </div>
                <div className="w-full md:w-1/2">
                    {showForm && (
                        <AppointmentForm
                            date={dateStr}
                            onSave={handleAddAppointment}
                            initialData={appointmentToEdit}
                        />
                    )}
                </div>
            </div>
            <div className='flex justify-center mt-[60px]'>
                <div >
                    <button onClick={handleLogout} className="text-sm bg-red-500 cursor-pointer text-white px-3 py-1 rounded ml-auto">
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CalendarPage;