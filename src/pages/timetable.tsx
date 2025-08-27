import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Header from "../components/Header";

const TimetablePage: React.FC<PageProps> = () => {
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="hero min-h-[60vh] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-base-content mb-6">Class Timetable</h1>
              <p className="text-xl text-base-content/70">
                View our weekly schedule and find the perfect time for your learning journey
              </p>
            </div>
          </div>
        </section>

        {/* Timetable Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-base-content mb-4">Weekly Schedule</h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Our flexible timetable accommodates various schedules and learning preferences
              </p>
            </div>

            {/* Timetable Grid */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary text-primary-content">Time</th>
                    {days.map((day) => (
                      <th key={day} className="bg-primary text-primary-content text-center">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="font-semibold bg-base-200">{time}</td>
                      {days.map((day) => (
                        <td key={`${day}-${time}`} className="text-center">
                          {getClassForTimeSlot(day, time)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold text-base-content mb-4">Class Types</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="badge badge-primary badge-lg">Mathematics</div>
                <div className="badge badge-secondary badge-lg">English</div>
                <div className="badge badge-accent badge-lg">Science</div>
                <div className="badge badge-neutral badge-lg">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Information */}
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-base-content text-center mb-12">Booking Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl text-primary">How to Book</h3>
                    <ul className="space-y-2 text-base-content/70">
                      <li>• Contact us to discuss your learning goals</li>
                      <li>• Choose your preferred time slots</li>
                      <li>• Confirm your schedule with our team</li>
                      <li>• Start your personalized learning journey</li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl text-primary">Flexibility</h3>
                    <ul className="space-y-2 text-base-content/70">
                      <li>• One-on-one or small group sessions</li>
                      <li>• Online or in-person options</li>
                      <li>• Customizable session lengths</li>
                      <li>• Rescheduling available with notice</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button className="btn btn-primary btn-lg">
                  Book Your Session
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-base-content mb-8">Need a Custom Schedule?</h2>
              <p className="text-lg text-base-content/70 leading-relaxed mb-8">
                Can't find a suitable time in our regular schedule? We understand that every student has unique 
                needs and constraints. Contact us to discuss custom scheduling options that work for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-outline btn-primary">Contact Us</button>
                <button className="btn btn-primary">Request Custom Time</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Helper function to get class information for time slots
const getClassForTimeSlot = (day: string, time: string): string => {
  // This is placeholder logic - in a real app, this would come from a database
  if (day === "Monday" && time === "9:00 AM") return "Mathematics";
  if (day === "Tuesday" && time === "10:00 AM") return "English";
  if (day === "Wednesday" && time === "2:00 PM") return "Science";
  if (day === "Thursday" && time === "3:00 PM") return "Mathematics";
  if (day === "Friday" && time === "4:00 PM") return "English";
  if (day === "Saturday" && time === "10:00 AM") return "Mathematics";
  
  // Randomly assign some classes for demonstration
  const classes = ["Mathematics", "English", "Science", "Available"];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
};

export default TimetablePage;

export const Head: HeadFC = () => <title>Timetable - Exceed Education</title>;
